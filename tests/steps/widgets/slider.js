const general = require("../../functions/general");

module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const slider = require("../../testCases/widgets/slider.json");
    const checkStep = require("../../functions/checkStep");

    let step = 0;

    //Scenario 1
    checkStep.starScenario(slider.scenario1.title);
    for (let i = 0; i < slider.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[4]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[4]/div/ul/li[4]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/slider")
            checkStep.error(slider.scenario1.steps[step]);
        }
        checkStep.checked(slider.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(slider.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(slider.scenario2.title);
    step = 0;
    for (let i = 0; i < slider.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/slider");
        if (i === 1 || i === 3) {
          if (i === 1) xValue = -190;
          if (i === 3) xValue = 85;
          let sourceEle = driver.findElement(By.id("sliderContainer"));
          const actions = driver.actions({ async: true });
          await actions
            .dragAndDrop(sourceEle, { x: parseInt(xValue), y: parseInt(38) })
            .perform();
        }
        if (i === 2 || i === 4) {
          if (i === 2) expectedValue = "0";
          if (i === 4) expectedValue = "100";
          slideValue = await driver
            .findElement(By.id("sliderValue"))
            .getAttribute("value");
          if (slideValue !== expectedValue)
            checkStep.error(datePicker.scenario2.steps[step]);
        }
        checkStep.checked(slider.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(slider.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
