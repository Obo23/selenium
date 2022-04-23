module.exports = {
  test: async function () {
    const { By, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const radioButton = require("../../testCases/elements/radioButton.json");
    const checkStep = require("../../functions/checkStep");
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(radioButton.scenario1.title);
    for (let i = 0; i < radioButton.scenario1.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/");
          await driver.manage().window().fullscreen();
        }
        if (i === 1)
          await driver
            .findElement(
              By.xpath("/html/body/div[2]/div/div/div[2]/div/div[1]/div")
            )
            .click();
        if (i === 2) await driver.findElement(By.id("item-2")).click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/radio-button") {
            error = true;
            checkStep.error(radioButton.scenario1.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(radioButton.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(radioButton.scenario1.steps[step]);
      }
    }

    //Scenario 2
    step = 0;
    checkStep.starScenario(radioButton.scenario2.title);
    for (let i = 0; i < radioButton.scenario2.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/radio-button");
          await driver.manage().window().fullscreen();
        }
        if (i % 2 === 1) {
          if (i === 1)
            path = '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[2]';
          if (i === 3)
            path = '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]';
          await driver.findElement(By.xpath(path)).click();
        }
        if (i % 2 === 0 && i != 0) {
          if (i === 2) textExpected = "Yes";
          if (i === 4) textExpected = "Impressive";
          const text = await driver
            .findElement(By.className("text-success"))
            .getText();
          if (text.localeCompare(textExpected) === -1) {
            error = true;
            checkStep.error(radioButton.scenario2.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(radioButton.scenario2.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(radioButton.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
