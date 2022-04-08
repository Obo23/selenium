module.exports = {
  test: async function () {
    const { By, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const browserWindows = require("../../testCases/alertsFrameWindows/browserWindows.json");
    const checkStep = require("../../functions/checkStep");
    const newURL = "https://demoqa.com/sample";
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(browserWindows.scenario1.title);
    for (let i = 0; i < browserWindows.scenario1.steps.length; i++) {
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
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[3]/div/ul/li[1]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/browser-windows") {
            error = true;
            checkStep.error(browserWindows.scenario1.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(browserWindows.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(browserWindows.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(browserWindows.scenario2.title);
    step = 0;
    for (let i = 0; i < browserWindows.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/browser-windows");
        if (i % 2 === 1) {
          if (i === 1) id = "tabButton";
          if (i === 3) id = "windowButton";
          if (i === 5) id = "messageWindowButton";
          await driver.findElement(By.id(id)).click();
        }
        //The New window message it is not possible to test because is blocked
        if (i === 2 || i === 4 || i === 6) {
          const window = await driver.getAllWindowHandles();
          await driver.switchTo().window(window[1]);
          if (i === 2 || i === 4) {
            currentUrl = await driver.getCurrentUrl();
            if (currentUrl !== newURL) {
              error = true;
              checkStep.error(browserWindows.scenario2.steps[step]);
            }
          }
          await driver.close();
          await driver.switchTo().window(window[0]);
        }
        if (error === false)
          checkStep.checked(browserWindows.scenario2.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(browserWindows.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
