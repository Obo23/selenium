module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const buttons = require("../../testCases/elements/buttons.json");
    const checkStep = require("../../functions/checkStep");
    let step = 0;

    //Scenario 1
    checkStep.starScenario(buttons.scenario1.title);
    for (let i = 0; i < buttons.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(
              By.xpath("/html/body/div[2]/div/div/div[2]/div/div[1]/div")
            )
            .click();
        if (i === 2) await driver.findElement(By.id("item-4")).click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/buttons")
            checkStep.error(buttons.scenario1.steps[step]);
        }
        checkStep.checked(buttons.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(buttons.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(buttons.scenario2.title);
    step = 0;
    for (let i = 0; i < buttons.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/buttons");
        if (i % 2 === 1) {
          if (i === 1) buttonId = "doubleClickBtn";
          if (i === 3) buttonId = "rightClickBtn";
          if (i === 1 || i === 3)
            buttonElement = await driver.findElement(By.id(buttonId));
          if (i === 5)
            buttonElement = await driver.findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[3]/button"
              )
            );
          const actions = driver.actions({ async: true });
          if (i === 1) await actions.doubleClick(buttonElement).perform();
          if (i === 3) await actions.contextClick(buttonElement).perform();
          if (i === 5) await actions.click(buttonElement).perform();
        }
        if (i % 2 === 0 && i != 0) {
          if (i === 2)
            (messageId = "doubleClickMessage"),
              (messageExpected = "You have done a double click");
          if (i === 4)
            (messageId = "rightClickMessage"),
              (messageExpected = "You have done a right click");
          if (i === 6)
            (messageId = "dynamicClickMessage"),
              (messageExpected = "You have done a dynamic click");
          messageElement = await driver.findElement(By.id(messageId));
          messageText = await messageElement.getText();
          if (messageText !== messageExpected) {
            checkStep.error(buttons.scenario2.steps[step]);
            console.log(messageText);
          }
        }
        checkStep.checked(buttons.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(buttons.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
