module.exports = {
  test: async function () {
    const { By, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const dynamicProperties = require("../../testCases/elements/dynamicProperties.json");
    const checkStep = require("../../functions/checkStep");
    const { delay } = require("../../functions/general");
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(dynamicProperties.scenario1.title);
    for (let i = 0; i < dynamicProperties.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(
              By.xpath("/html/body/div[2]/div/div/div[2]/div/div[1]/div")
            )
            .click();
        if (i === 2) await driver.findElement(By.id("item-8")).click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/dynamic-properties") {
            error = true;
            checkStep.error(dynamicProperties.scenario1.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(dynamicProperties.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(dynamicProperties.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(dynamicProperties.scenario2.title);
    step = 0;
    for (let i = 0; i < dynamicProperties.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/dynamic-properties");
        if (i === 1) {
          const statusButton = await driver
            .findElement(By.id("enableAfter"))
            .click();
          if (statusButton != null) {
            error = true;
            checkStep.error(dynamicProperties.scenario2.steps[step]);
          }
        }
        if (i === 2 || i === 5) {
          if (i === 2) colorExpected = "rgba(255, 255, 255, 1)";
          if (i === 5) colorExpected = "rgba(220, 53, 69, 1)";
          const color = await driver
            .findElement(By.id("colorChange"))
            .getCssValue("color");
          if (color != colorExpected) {
            error = true;
            checkStep.error(dynamicProperties.scenario2.steps[step]);
          }
        }
        if (i === 3) await delay(5000);
        if (i === 4 || i === 6) {
          if (i === 4) buttonId = "enableAfter";
          if (i === 6) buttonId = "visibleAfter";
          await driver.findElement(By.id(buttonId)).click();
        }
        if (error === false)
          checkStep.checked(dynamicProperties.scenario2.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(dynamicProperties.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
