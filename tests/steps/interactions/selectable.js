module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const selectable = require("../../testCases/interactions/selectable.json");
    const checkStep = require("../../functions/checkStep");

    let step = 0;

    //Scenario 1
    checkStep.starScenario(selectable.scenario1.title);
    for (let i = 0; i < selectable.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[5]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[5]/div/ul/li[2]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/selectable")
            checkStep.error(selectable.scenario1.steps[step]);
        }
        checkStep.checked(selectable.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(selectable.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(selectable.scenario2.title);
    step = 0;
    for (let i = 0; i < selectable.scenario2.steps.length; i++) {
      try {
        element1 = '//*[@id="verticalListContainer"]/li[1]';
        element2 = '//*[@id="verticalListContainer"]/li[2]';
        element3 = '//*[@id="verticalListContainer"]/li[3]';
        element4 = '//*[@id="verticalListContainer"]/li[4]';
        if (i === 0) await driver.get("https://demoqa.com/selectable");
        if (i === 1 || i === 2 || i === 9 || i === 10) element = element1;
        if (i === 3 || i === 4 || i === 11 || i === 12) element = element2;
        if (i === 5 || i === 6 || i === 13 || i === 14) element = element3;
        if (i === 7 || i === 8 || i === 15 || i === 16) element = element4;
        if (i % 2 === 1) await driver.findElement(By.xpath(element)).click();
        if (i % 2 === 0 && i > 0) {
          if (i < 9) expectedColor = "rgba(255, 255, 255, 1)";
          if (i > 8) expectedColor = "rgba(73, 80, 87, 1)";
          elementStatus = await driver
            .findElement(By.xpath(element))
            .getCssValue("color");
          if (elementStatus !== expectedColor)
            checkStep.error(selectable.scenario2.steps[step]);
        }
        checkStep.checked(selectable.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(selectable.scenario2.steps[step]);
      }
    }

    //Scenario 3
    checkStep.starScenario(selectable.scenario3.title);
    step = 0;
    for (let i = 0; i < selectable.scenario3.steps.length; i++) {
      try {
        element1 = '//*[@id="row1"]/li[1]';
        element2 = '//*[@id="row1"]/li[2]';
        element3 = '//*[@id="row1"]/li[3]';
        element4 = '//*[@id="row2"]/li[1]';
        element5 = '//*[@id="row2"]/li[2]';
        element6 = '//*[@id="row2"]/li[3]';
        element7 = '//*[@id="row3"]/li[1]';
        element8 = '//*[@id="row3"]/li[2]';
        element9 = '//*[@id="row3"]/li[3]';

        if (i === 0) await driver.get("https://demoqa.com/selectable");
        if (i === 1) await driver.findElement(By.id('demo-tab-grid')).click();
        if (i === 2 || i === 3 || i === 20 || i === 21) element = element1;
        if (i === 4 || i === 5 || i === 22 || i === 23) element = element2;
        if (i === 6 || i === 7 || i === 24 || i === 25) element = element3;
        if (i === 8 || i === 9 || i === 26 || i === 27) element = element4;
        if (i === 10 || i === 11 || i === 28 || i === 29) element = element5;
        if (i === 12 || i === 13 || i === 30 || i === 31) element = element6;
        if (i === 14 || i === 15 || i === 32 || i === 33) element = element7;
        if (i === 16 || i === 17 || i === 34 || i === 35) element = element8;
        if (i === 18 || i === 19 || i === 36 || i === 37) element = element9;
        if (i % 2 === 0 && i > 0) await driver.findElement(By.xpath(element)).click();
        if (i % 2 === 1 && i > 1) {
          if (i < 20) expectedColor = "rgba(255, 255, 255, 1)";
          if (i > 19) expectedColor = "rgba(73, 80, 87, 1)";
          elementStatus = await driver
            .findElement(By.xpath(element))
            .getCssValue("color");
          if (elementStatus !== expectedColor)
            checkStep.error(selectable.scenario2.steps[step]);
        }
        checkStep.checked(selectable.scenario3.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(selectable.scenario3.steps[step]);
      }
    }

    await driver.close();
  },
};
