module.exports = {
  test: async function () {
    const { By, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const textBox = require("../../testCases/elements/textBox.json");
    const checkStep = require("../../functions/checkStep");
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(textBox.scenario1.title);
    for (let i = 0; i < textBox.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(
              By.xpath("/html/body/div[2]/div/div/div[2]/div/div[1]/div")
            )
            .click();
        if (i === 2) await driver.findElement(By.id("item-0")).click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/text-box") {
            error = true;
            checkStep.error(textBox.scenario1.steps[step]);
          }
        }
        if (error === false) checkStep.checked(textBox.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(textBox.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(textBox.scenario2.title);
    step = 0;
    for (let i = 0; i < textBox.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/text-box");
        if (i < 5 && i != 0) {
          if (i === 1) {
            id = "userName";
            text = "User name";
          }
          if (i === 2) {
            id = "userEmail";
            text = "test@example.com";
          }
          if (i === 3) {
            id = "currentAddress";
            text = "Current address";
          }
          if (i === 4) {
            id = "permanentAddress";
            text = "Permanent address";
          }
          await driver.findElement(By.id(id)).sendKeys(text);
        }
        if (i === 5) await driver.findElement(By.id("submit")).click();
        if (i === 6) await driver.findElement(By.id("output"));
        checkStep.checked(textBox.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(textBox.scenario2.steps[step]);
      }
    }

    //Scenario 3
    checkStep.starScenario(textBox.scenario3.title);
    step = 0;
    for (let i = 0; i < textBox.scenario3.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/text-box");
        if (i === 1) await driver.findElement(By.id("submit")).click();
        checkStep.checked(textBox.scenario3.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(textBox.scenario3.steps[step]);
      }
    }

    //Scenario 4
    checkStep.starScenario(textBox.scenario4.title);
    step = 0;
    for (let i = 0; i < textBox.scenario4.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/text-box");
        if (i === 1)
          await driver.findElement(By.id("userEmail")).sendKeys("abc");
        if (i === 2) await driver.findElement(By.id("submit")).click();
        if (i === 3)
          await driver.findElement(
            By.className("mr-sm-2 field-error form-control")
          );
        checkStep.checked(textBox.scenario4.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(textBox.scenario4.steps[step]);
      }
    }

    await driver.close();
  },
};
