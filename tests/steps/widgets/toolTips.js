const general = require("../../functions/general");

module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const toolTips = require("../../testCases/widgets/toolTips.json");
    const checkStep = require("../../functions/checkStep");

    let step = 0;

    //Scenario 1
    checkStep.starScenario(toolTips.scenario1.title);
    for (let i = 0; i < toolTips.scenario1.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/");
          await driver
            .manage()
            .window()
            .setRect({ height: 2560, width: 1500, x: 1930, y: 1450 });
        }
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[4]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[4]/div/ul/li[7]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/tool-tips")
            checkStep.error(toolTips.scenario1.steps[step]);
        }
        checkStep.checked(toolTips.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(toolTips.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(toolTips.scenario2.title);
    step = 0;
    for (let i = 0; i < toolTips.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/tool-tips");
        if (i === 1 || i === 2)
          (toolTipId = "toolTipButton"), (hoverId = "buttonToolTip");
        if (i === 3 || i === 4)
          (toolTipId = "toolTipTextField"), (hoverId = "textFieldToolTip");
        if (i === 5 || i === 6)
          (toolTipXpath = '//*[@id="texToolTopContainer"]/a[1]'),
            (hoverId = "contraryTexToolTip");
        if (i === 7 || i === 8)
          (toolTipXpath = '//*[@id="texToolTopContainer"]/a[2]'),
            (hoverId = "sectionToolTip");
        if (i % 2 === 1) {
          if (i === 1 || i === 3)
            var hoverElement = driver.findElement(By.id(toolTipId));
          if (i === 5 || i === 7)
            var hoverElement = driver.findElement(By.xpath(toolTipXpath));
          const actions = driver.actions({ async: true });
          await actions.move({ origin: hoverElement }).perform();
          await general.delay(500);
        }
        if (i % 2 === 0 && i != 0) {
          if (i === 2 || i === 4)
            hover = await driver
              .findElement(By.id(toolTipId))
              .getAttribute("aria-describedby");
          if (i === 6 || i === 8)
            hover = await driver
              .findElement(By.xpath(toolTipXpath))
              .getAttribute("aria-describedby");
          if (hover !== hoverId)
            checkStep.error(toolTips.scenario2.steps[step]);
        }
        checkStep.checked(toolTips.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(toolTips.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
