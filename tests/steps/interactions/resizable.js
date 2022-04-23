module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const resizable = require("../../testCases/interactions/resizable.json");
    const checkStep = require("../../functions/checkStep");

    let step = 0;

    //Scenario 1
    checkStep.starScenario(resizable.scenario1.title);
    for (let i = 0; i < resizable.scenario1.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/");
          await driver.manage().window().fullscreen();
        }
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[5]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[5]/div/ul/li[3]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/resizable")
            checkStep.error(resizable.scenario1.steps[step]);
        }
        checkStep.checked(resizable.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(resizable.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(resizable.scenario2.title);
    step = 0;
    for (let i = 0; i < resizable.scenario2.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/resizable");
          await driver.manage().window().fullscreen();
        }
        if (i % 2 === 1) {
          if (i === 1)
            (xValue = -50),
              (yValue = -50),
              (elementXpath = '//*[@id="resizableBoxWithRestriction"]/span');
          if (i === 3)
            (xValue = 350),
              (yValue = 150),
              (elementXpath = '//*[@id="resizableBoxWithRestriction"]/span');
          if (i === 5)
            (xValue = -180),
              (yValue = -180),
              (elementXpath = '//*[@id="resizable"]/span');
          if (i === 7)
            (xValue = 480),
              (yValue = 280),
              (elementXpath = '//*[@id="resizable"]/span');
          let sourceEle = await driver.findElement(By.xpath(elementXpath));
          const actions = driver.actions({ async: true });
          await actions
            .dragAndDrop(sourceEle, {
              x: parseInt(xValue),
              y: parseInt(yValue),
            })
            .perform();
        }
        if (i % 2 === 0 && i > 1) {
          if (i > 1 && i < 5) elementId = "resizableBoxWithRestriction";
          if (i > 4 && i < 9) elementId = "resizable";
          if (i === 2) expectedPosition = "width: 150px; height: 150px;";
          if (i === 4 || i === 8)
            expectedPosition = "width: 500px; height: 300px;";
          if (i === 6) expectedPosition = "width: 20px; height: 20px;";
          const checkPostion = await driver
            .findElement(By.id(elementId))
            .getAttribute("style");
          if (checkPostion !== expectedPosition)
            checkStep.error(resizable.scenario2.steps[step]);
        }
        checkStep.checked(resizable.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(resizable.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
