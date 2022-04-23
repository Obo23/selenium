module.exports = {
  test: async function () {
    const { By, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const alerts = require("../../testCases/alertsFrameWindows/alerts.json");
    const checkStep = require("../../functions/checkStep");
    const general = require("../../functions/general");
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(alerts.scenario1.title);
    for (let i = 0; i < alerts.scenario1.steps.length; i++) {
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
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[3]/div/ul/li[2]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/alerts") {
            error = true;
            checkStep.error(alerts.scenario1.steps[step]);
          }
        }
        if (error === false) checkStep.checked(alerts.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(alerts.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(alerts.scenario2.title);
    step = 0;
    const okText = "You selected Ok";
    const cancelText = "You selected Cancel";
    const enteredText = "You entered Test";
    for (let i = 0; i < alerts.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/alerts");
        if (i % 2 === 1) {
          if (i === 1) id = "alertButton";
          if (i === 3) id = "timerAlertButton";
          if (i === 5 || i === 7) id = "confirmButton";
          if (i === 9 || i === 11) id = "promtButton";
          await driver.findElement(By.id(id)).click();
        }
        if (i % 2 === 0 && i != 0) {
          if (i === 4) await general.delay(5000);
          let alert = await driver.switchTo().alert();
          if (i === 8) await alert.dismiss();
          if (i === 10) await alert.sendKeys("Test");
          if (i === 12) await alert.dismiss();
          if (i != 8 && i != 12) await alert.accept();
          if (i === 6 || i === 8 || i === 10) {
            if (i === 6 || i === 8) id = "confirmResult";
            if (i === 10) id = "promptResult";
            if (i === 6) checkText = okText;
            if (i === 8) checkText = cancelText;
            if (i === 10) checkText = enteredText;
            text = await driver.findElement(By.id(id)).getText();
            if (text != checkText) {
              error = true;
              checkStep.error(alerts.scenario2.steps[step]);
            }
          }
          await driver.switchTo().defaultContent();
        }
        if (error === false) checkStep.checked(alerts.scenario2.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(alerts.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
