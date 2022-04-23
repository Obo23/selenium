const general = require("../../functions/general");

module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const tabs = require("../../testCases/widgets/tabs.json");
    const checkStep = require("../../functions/checkStep");

    let step = 0;

    //Scenario 1
    checkStep.starScenario(tabs.scenario1.title);
    for (let i = 0; i < tabs.scenario1.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/");
          await driver
            .manage()
            .window()
            .setRect({ height: 1280, width: 1920, x: 1930, y: 1450 });
        }
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[4]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[4]/div/ul/li[6]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/tabs")
            checkStep.error(tabs.scenario1.steps[step]);
        }
        checkStep.checked(tabs.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(tabs.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(tabs.scenario2.title);
    step = 0;
    for (let i = 0; i < tabs.scenario2.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/tabs");
          await driver
            .manage()
            .window()
            .setRect({ height: 1280, width: 1920, x: 1930, y: 1450 });
        }
        if (i === 1 || i === 2) tabId = "demo-tab-use";
        if (i === 3 || i === 4) tabId = "demo-tab-origin";
        if (i === 5 || i === 6) tabId = "demo-tab-what";
        if (i % 2 === 1) await driver.findElement(By.id(tabId)).click();
        if (i % 2 === 0 && i != 0) {
          selected = await driver
            .findElement(By.id(tabId))
            .getAttribute("aria-selected");
          if (selected !== "true") checkStep.error(tabs.scenario2.steps[step]);
        }
        if (i === 7) {
          disabled = await driver
            .findElement(By.id("demo-tab-more"))
            .getAttribute("aria-disabled");
          if (disabled !== "true") checkStep.error(tabs.scenario2.steps[step]);
        }
        checkStep.checked(tabs.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(tabs.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
