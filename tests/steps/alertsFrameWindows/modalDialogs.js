module.exports = {
  test: async function () {
    const { By, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const modalDialogs = require("../../testCases/alertsFrameWindows/modalDialogs.json");
    const checkStep = require("../../functions/checkStep");
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(modalDialogs.scenario1.title);
    for (let i = 0; i < modalDialogs.scenario1.steps.length; i++) {
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
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[3]/div/ul/li[5]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/modal-dialogs") {
            error = true;
            checkStep.error(modalDialogs.scenario1.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(modalDialogs.scenario1.steps[step]);
          error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(modalDialogs.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(modalDialogs.scenario2.title);
    step = 0;
    for (let i = 0; i < modalDialogs.scenario2.steps.length; i++) {
      try {
        if (i === 0) {
        await driver.get("https://demoqa.com/modal-dialogs");
        await driver.manage().window().fullscreen();
      }
        if (i === 1) id = "showSmallModal";
        if (i === 2) id = "closeSmallModal";
        if (i === 3) id = "showLargeModal";
        if (i === 4) id = "closeLargeModal";
        if (i != 0) await driver.findElement(By.id(id)).click();
        checkStep.checked(modalDialogs.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(modalDialogs.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
