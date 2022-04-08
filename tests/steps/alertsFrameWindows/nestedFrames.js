module.exports = {
  test: async function () {
    const { By, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const nestedFrames = require("../../testCases/alertsFrameWindows/nestedFrames.json");
    const checkStep = require("../../functions/checkStep");
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(nestedFrames.scenario1.title);
    for (let i = 0; i < nestedFrames.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[3]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[3]/div/ul/li[4]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/nestedframes") {
            error = true;
            checkStep.error(nestedFrames.scenario1.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(nestedFrames.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(nestedFrames.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(nestedFrames.scenario2.title);
    step = 0;
    for (let i = 0; i < nestedFrames.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/nestedframes");
        if (i === 1 || i === 3) {
          if (i === 1)
            iframe = driver.findElement(By.css("#frame1Wrapper > iframe"));
          if (i === 3)
            iframe = driver.findElement(By.xpath("/html/body/iframe"));
          await driver.switchTo().frame(iframe);
        }
        if (i === 2 || i === 4) {
          if (i === 2)
            (xpathFrame = "/html/body"), (expectedText = "Parent frame");
          if (i === 4)
            (xpathFrame = "/html/body/p"), (expectedText = "Child Iframe");
          textFrame = await driver.findElement(By.xpath(xpathFrame)).getText();
          if (textFrame !== expectedText) {
            error = true;
            checkStep.error(frames.scenario2.steps[step]);
          }
          if (i === 4) await driver.switchTo().defaultContent();
        }
        if (error === false)
          checkStep.checked(nestedFrames.scenario2.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(nestedFrames.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
