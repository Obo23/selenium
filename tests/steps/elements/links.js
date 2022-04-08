module.exports = {
  test: async function () {
    const { By, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const links = require("../../testCases/elements/links.json");
    const checkStep = require("../../functions/checkStep");
    const { delay } = require("../../functions/general");
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(links.scenario1.title);
    for (let i = 0; i < links.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(
              By.xpath("/html/body/div[2]/div/div/div[2]/div/div[1]/div")
            )
            .click();
        if (i === 2) await driver.findElement(By.id("item-5")).click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/links") {
            error = true;
            checkStep.error(links.scenario1.steps[step]);
          }
        }
        if (error === false) checkStep.checked(links.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(links.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(links.scenario2.title);
    step = 0;
    for (let i = 0; i < links.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/links");
        if (i % 2 === 1) {
          if (i === 1) link = "simpleLink";
          if (i === 3) link = "dynamicLink";
          if (i === 5) link = "created";
          if (i === 7) link = "no-content";
          if (i === 9) link = "moved";
          if (i === 11) link = "bad-request";
          if (i === 13) link = "unauthorized";
          if (i === 15) link = "forbidden";
          if (i === 17) link = "invalid-url";
          await driver.findElement(By.id(link)).click();
        }
        if (i === 2 || i === 4) {
          const window = await driver.getAllWindowHandles();
          await driver.switchTo().window(window[1]);
          currentUrl = await driver.getCurrentUrl();
          if (currentUrl !== "https://demoqa.com/") {
            error = true;
            checkStep.error(browserWindows.scenario2.steps[step]);
          }
          await driver.close();
          await driver.switchTo().window(window[0]);
        }
        //Search in the source code
        if (i % 2 === 0 && i > 5) {
          if (i === 6) linkStatus = 201;
          if (i === 8) linkStatus = 204;
          if (i === 10) linkStatus = 301;
          if (i === 12) linkStatus = 400;
          if (i === 14) linkStatus = 401;
          if (i === 16) linkStatus = 403;
          if (i === 18) linkStatus = 404;
          await delay(500);
          test = await (
            await driver.getPageSource()
          ).search("<b>" + linkStatus + "</b>");
          if (test === -1) checkStep.error(links.scenario2.steps[step]);
        }
        if (error === false) checkStep.checked(links.scenario2.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(links.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
