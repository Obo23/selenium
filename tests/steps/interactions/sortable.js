module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const sortable = require("../../testCases/interactions/sortable.json");
    const checkStep = require("../../functions/checkStep");

    let step = 0;

    //Scenario 1
    checkStep.starScenario(sortable.scenario1.title);
    for (let i = 0; i < sortable.scenario1.steps.length; i++) {
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
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[5]/div/ul/li[1]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/sortable")
            checkStep.error(sortable.scenario1.steps[step]);
        }
        checkStep.checked(sortable.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(sortable.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(sortable.scenario2.title);
    step = 0;
    for (let i = 0; i < sortable.scenario2.steps.length; i++) {
      try {
        position1 = driver.findElement(
          By.xpath('//*[@id="demo-tabpane-list"]/div/div[1]')
        );
        position2 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-list"]/div/div[2]')
        );
        position3 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-list"]/div/div[3]')
        );
        position4 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-list"]/div/div[4]')
        );
        position5 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-list"]/div/div[5]')
        );
        position6 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-list"]/div/div[6]')
        );
        if (i === 0) {
          await driver.get("https://demoqa.com/sortable");
          await driver.manage().window().fullscreen();
        }
        if (i % 2 === 1) {
          const actions = driver.actions({ async: true });
          if (i === 1)
            await actions.dragAndDrop(position1, position6).perform();
          if (i === 3)
            await actions.dragAndDrop(position2, position5).perform();
          if (i === 5)
            await actions.dragAndDrop(position3, position4).perform();
          if (i === 7)
            await actions.dragAndDrop(position4, position3).perform();
          if (i === 9)
            await actions.dragAndDrop(position5, position2).perform();
          if (i === 11)
            await actions.dragAndDrop(position6, position1).perform();
        }
        if (i % 2 === 0 && i > 0) {
          if (i === 2) (checkPosition = position6), (expectedValue = "One");
          if (i === 4) (checkPosition = position5), (expectedValue = "Three");
          if (i === 6) (checkPosition = position4), (expectedValue = "Five");
          if (i === 8) (checkPosition = position3), (expectedValue = "Five");
          if (i === 10) (checkPosition = position2), (expectedValue = "Three");
          if (i === 12) (checkPosition = position1), (expectedValue = "One");
          actualValue = await checkPosition.getText();
          if (actualValue !== expectedValue)
            checkStep.error(sortable.scenario2.steps[step]);
        }

        checkStep.checked(sortable.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(sortable.scenario2.steps[step]);
      }
    }

    //Scenario 3
    checkStep.starScenario(sortable.scenario3.title);
    step = 0;
    for (let i = 0; i < sortable.scenario3.steps.length; i++) {
      try {
        position1 = driver.findElement(
          By.xpath('//*[@id="demo-tabpane-grid"]/div/div/div[1]')
        );
        position2 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-grid"]/div/div/div[2]')
        );
        position3 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-grid"]/div/div/div[3]')
        );
        position4 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-grid"]/div/div/div[4]')
        );
        position5 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-grid"]/div/div/div[5]')
        );
        position6 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-grid"]/div/div/div[6]')
        );
        position7 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-grid"]/div/div/div[7]')
        );
        position8 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-grid"]/div/div/div[8]')
        );
        position9 = await driver.findElement(
          By.xpath('//*[@id="demo-tabpane-grid"]/div/div/div[9]')
        );
        if (i === 0) {
          await driver.get("https://demoqa.com/sortable");
          await driver.manage().window().fullscreen();
        }
        if (i === 1) await driver.findElement(By.id("demo-tab-grid")).click();
        if (i % 2 === 0 && i > 0) {
          const actions = driver.actions({ async: true });
          if (i === 2)
            await actions.dragAndDrop(position1, position9).perform();
          if (i === 4)
            await actions.dragAndDrop(position2, position8).perform();
          if (i === 6)
            await actions.dragAndDrop(position3, position7).perform();
          if (i === 8)
            await actions.dragAndDrop(position4, position6).perform();
          if (i === 10)
            await actions.dragAndDrop(position5, position5).perform();
          if (i === 12)
            await actions.dragAndDrop(position6, position4).perform();
          if (i === 14)
            await actions.dragAndDrop(position7, position3).perform();
          if (i === 16)
            await actions.dragAndDrop(position8, position2).perform();
          if (i === 18)
            await actions.dragAndDrop(position9, position1).perform();
        }
        if (i % 2 === 1 && i > 1) {
          if (i === 3) (checkPosition = position9), (expectedValue = "One");
          if (i === 5) (checkPosition = position8), (expectedValue = "Three");
          if (i === 7) (checkPosition = position7), (expectedValue = "Five");
          if (i === 9) (checkPosition = position6), (expectedValue = "Seven");
          if (i === 11) (checkPosition = position5), (expectedValue = "Nine");
          if (i === 13) (checkPosition = position4), (expectedValue = "Seven");
          if (i === 15) (checkPosition = position3), (expectedValue = "Five");
          if (i === 17) (checkPosition = position2), (expectedValue = "Three");
          if (i === 19) (checkPosition = position1), (expectedValue = "One");
          actualValue = await checkPosition.getText();
          if (actualValue !== expectedValue)
            checkStep.error(sortable.scenario2.steps[step]);
        }

        checkStep.checked(sortable.scenario3.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(sortable.scenario3.steps[step]);
      }
    }

    await driver.close();
  },
};
