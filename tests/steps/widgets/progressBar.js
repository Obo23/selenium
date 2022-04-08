const general = require("../../functions/general");

module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const progressBar = require("../../testCases/widgets/progressBar.json");
    const checkStep = require("../../functions/checkStep");

    let step = 0;

    //Scenario 1
    checkStep.starScenario(progressBar.scenario1.title);
    for (let i = 0; i < progressBar.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[4]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[4]/div/ul/li[5]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/progress-bar")
            checkStep.error(progressBar.scenario1.steps[step]);
        }
        checkStep.checked(progressBar.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(progressBar.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(progressBar.scenario2.title);
    step = 0;
    for (let i = 0; i < progressBar.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/progress-bar");
        if (i === 1 || i === 4 || i === 6 || i === 10) {
          if (i === 1 || i === 4 || i === 6) buttonId = "startStopButton";
          if (i === 10) buttonId = "resetButton";
          await driver.findElement(By.id(buttonId)).click();
        }
        if (i === 2 || i === 5 || i === 8 || i === 11) {
          if (i === 2)
            (expectedbuttonStatus = "Stop"), (idButton = "startStopButton");
          if (i === 5 || i === 11)
            (expectedbuttonStatus = "Start"), (idButton = "startStopButton");
          if (i === 8)
            (expectedbuttonStatus = "Reset"), (idButton = "resetButton");
          buttonStatus = await driver.findElement(By.id(idButton)).getText();
          if (buttonStatus !== expectedbuttonStatus)
            checkStep.error(progressBar.scenario2.steps[step]);
        }
        if (i === 3 || i === 7) await general.delay(5000);
        if (i === 9) {
          valueNow = await driver
            .findElement(By.xpath('//*[@id="progressBar"]/div'))
            .getAttribute("aria-valuenow");
          if (valueNow !== "100")
            checkStep.error(progressBar.scenario2.steps[step]);
        }
        checkStep.checked(progressBar.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(progressBar.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
