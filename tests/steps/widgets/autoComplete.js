const general = require("../../functions/general");

module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const autoComplete = require("../../testCases/widgets/autoComplete.json");
    const checkStep = require("../../functions/checkStep");

    let step = 0;

    //Scenario 1
    checkStep.starScenario(autoComplete.scenario1.title);
    for (let i = 0; i < autoComplete.scenario1.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/");
          await driver.manage().window().fullscreen();
        }
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[4]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[4]/div/ul/li[2]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/auto-complete")
            checkStep.error(autoComplete.scenario1.steps[step]);
        }
        checkStep.checked(autoComplete.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(autoComplete.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(autoComplete.scenario2.title);
    step = 0;
    for (let i = 0; i < autoComplete.scenario2.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/auto-complete");
          await driver.manage().window().fullscreen();
        }
        if (i === 1 || i === 4 || i === 7) {
          if (i === 1) typeText = "a";
          if (i === 4) typeText = "b";
          if (i === 7) typeText = "d";
          await driver
            .findElement(By.id("autoCompleteMultipleContainer"))
            .click();
          await driver
            .findElement(By.id("autoCompleteMultipleInput"))
            .sendKeys(typeText);
        }
        if (i === 2 || i === 5 || i === 8) {
          await driver
            .findElement(By.id("autoCompleteMultipleInput"))
            .sendKeys(Key.ENTER);
        }
        if (i === 3 || i === 6 || i === 9 || i === 11 || i === 13 || i === 15) {
          if (i === 3 || i === 15) colorChecked = "Black";
          if (i === 6 || i === 13) colorChecked = "Blue";
          if (i === 9 || i === 11) colorChecked = "Red";
          if (i === 3 || i === 6 || i === 9) colorStatus = "selected";
          if (i === 11 || i === 13 || i === 15) colorStatus = "deselected";
          const checkStatus = await driver
            .findElement(By.id("autoCompleteMultipleContainer"))
            .getText();
          if (i < 15) {
            if (checkStatus.indexOf(colorChecked + ", " + colorStatus) === -1)
              checkStep.error(autoComplete.scenario2.steps[step]);
          } else {
            if (checkStatus.indexOf(colorChecked) != -1)
              checkStep.error(autoComplete.scenario2.steps[step]);
          }
        }
        if (i === 10) {
          await driver
            .findElement(By.id("autoCompleteMultipleInput"))
            .sendKeys(Key.BACK_SPACE);
        }
        if (i === 12) {
          await driver
            .findElement(
              By.xpath(
                '//*[@id="autoCompleteMultipleContainer"]/div/div[1]/div[2]/div[2]'
              )
            )
            .click();
        }
        if (i === 14) {
          await driver
            .findElement(
              By.xpath('//*[@id="autoCompleteMultipleContainer"]/div/div[2]')
            )
            .click();
        }
        checkStep.checked(autoComplete.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(autoComplete.scenario2.steps[step]);
      }
    }

    //Scenario 3
    checkStep.starScenario(autoComplete.scenario3.title);
    step = 0;
    for (let i = 0; i < autoComplete.scenario3.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/auto-complete");
          await driver.manage().window().fullscreen();
        }
        if (i === 1 || i === 4) {
          if (i === 1) typeText = "e";
          if (i === 4) typeText = "g";
          await driver.findElement(By.id("autoCompleteSingle")).click();
          await driver
            .findElement(By.id("autoCompleteSingleInput"))
            .sendKeys(typeText);
        }
        if (i === 2 || i === 5) {
          await driver
            .findElement(By.id("autoCompleteSingleInput"))
            .sendKeys(Key.ENTER);
        }
        if (i === 3 || i === 6) {
          if (i === 3) colorChecked = "Red";
          if (i === 6) colorChecked = "Green";
          const checkStatus = await driver
            .findElement(By.id("autoCompleteSingleContainer"))
            .getText();
          if (checkStatus.indexOf(colorChecked) === -1)
            checkStep.error(autoComplete.scenario2.steps[step]);
        }
        checkStep.checked(autoComplete.scenario3.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(autoComplete.scenario3.steps[step]);
      }
    }

    await driver.close();
  },
};
