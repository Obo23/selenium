module.exports = {
  test: async function () {
    const { By, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const brokenLinks = require("../../testCases/elements/brokenLinks.json");
    const checkStep = require("../../functions/checkStep");
    const general = require("../../functions/general");
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(brokenLinks.scenario1.title);
    for (let i = 0; i < brokenLinks.scenario1.steps.length; i++) {
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
        if (i === 2) await driver.findElement(By.id("item-6")).click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/broken") {
            error = true;
            checkStep.error(brokenLinks.scenario1.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(brokenLinks.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(brokenLinks.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(brokenLinks.scenario2.title);
    step = 0;
    for (let i = 0; i < brokenLinks.scenario2.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/broken");
          await driver.manage().window().fullscreen();
        }
        if (i > 0) {
          if (i === 1)
            path = '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/img[1]';
          if (i === 2)
            path = '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/img[2]';
          widthSize = await driver
            .findElement(By.xpath(path))
            .getAttribute("naturalWidth");
          heightSize = await driver
            .findElement(By.xpath(path))
            .getAttribute("naturalHeight");
          if (
            (i === 1 && widthSize === "0" && heightSize === "0") ||
            (i === 2 && widthSize !== "0" && heightSize !== "0")
          ) {
            error = true;
            checkStep.error(brokenLinks.scenario2.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(brokenLinks.scenario2.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(brokenLinks.scenario2.steps[step]);
      }
    }

    //Scenario 3
    checkStep.starScenario(brokenLinks.scenario3.title);
    step = 0;
    for (let i = 0; i < brokenLinks.scenario3.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/broken");
          await driver.manage().window().fullscreen();
        }
        if (i === 1) {
          await general.delay(500);
          path = '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/a[1]';
        }
        if (i === 4) path = '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/a[2]';
        if (i === 1 || i === 4)
          await driver.findElement(By.xpath(path)).click();
        await driver.manage().window().fullscreen();
        if (i === 2 || i === 5) {
          test = await (await driver.getPageSource()).search(500);
          if (i === 2 && test !== -1)
            checkStep.error(brokenLinks.scenario3.steps[step]);
          if (i === 5 && test === -1)
            checkStep.error(brokenLinks.scenario3.steps[step]);
        }
        if (i === 3 || i === 6) {
          await driver.navigate().back();
        }
        checkStep.checked(brokenLinks.scenario3.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(brokenLinks.scenario3.steps[step]);
      }
    }

    await driver.close();
  },
};
