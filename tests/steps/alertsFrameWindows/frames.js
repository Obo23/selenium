module.exports = {
  test: async function () {
    const { By, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const frames = require("../../testCases/alertsFrameWindows/frames.json");
    const checkStep = require("../../functions/checkStep");
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(frames.scenario1.title);
    for (let i = 0; i < frames.scenario1.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/");
          await driver.manage().window().fullscreen();
        }
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[3]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[3]/div/ul/li[3]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/frames") {
            error = true;
            checkStep.error(frames.scenario1.steps[step]);
          }
        }
        if (error === false) checkStep.checked(frames.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(frames.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(frames.scenario2.title);
    step = 0;
    for (let i = 0; i < frames.scenario2.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/frames");
          await driver.manage().window().fullscreen();
        }
        if (i === 1 || i === 3) {
          if (i === 1) frameId = "frame1Wrapper";
          if (i === 3) frameId = "frame2Wrapper";
          const iframe = driver.findElement(By.css(`#${frameId} > iframe`));
          await driver.switchTo().frame(iframe);
        }
        if (i === 2 || i === 4) {
          h1Text = await driver
            .findElement(By.xpath("/html/body/h1"))
            .getText();
          if (h1Text !== "This is a sample page") {
            error = true;
            checkStep.error(frames.scenario2.steps[step]);
          }
          await driver.switchTo().defaultContent();
        }
        if (error === false) checkStep.checked(frames.scenario2.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(frames.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
