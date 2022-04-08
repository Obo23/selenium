module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const selectMenu = require("../../testCases/widgets/selectMenu.json");
    const checkStep = require("../../functions/checkStep");
    const { delay } = require("../../functions/general");
    let fs = require('fs');

    let step = 0;

    //Scenario 1
    checkStep.starScenario(selectMenu.scenario1.title);
    for (let i = 0; i < selectMenu.scenario1.steps.length; i++) {
      try {
        if (i === 0) {
          await driver
            .manage()
            .window()
            .setRect({ height: 2560, width: 1500, x: 1930, y: 1450 });
          await driver.get("https://demoqa.com/");
        }
        if (i === 1) {
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[4]'))
            .click();
        }
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[4]/div/ul/li[9]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/select-menu")
            checkStep.error(selectMenu.scenario1.steps[step]);
        }
        checkStep.checked(selectMenu.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(selectMenu.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(selectMenu.scenario2.title);
    step = 0;
    let elementId,
      inputXpath,
      checkInput,
      expectedInput,
      elementXpath,
      inputKeys,
      checkMultiselect,
      colorExpected,
      iterations;
    for (let i = 0; i < selectMenu.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/select-menu");
        if (i === 1 || i === 4 || i === 7) {
          if (i === 1) elementId = "withOptGroup";
          if (i === 4) elementId = "selectOne";
          if (i === 7) elementId = "oldSelectMenu";
          await driver.findElement(By.id(elementId)).click();
        }
        if (i === 2 || i === 5) {
          if (i === 2) {
            (inputXpath =
              "/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[2]/div/div/div/div[1]/div[2]/div/input"),
              await driver
                .findElement(By.xpath(inputXpath))
                .sendKeys("an", Key.ENTER);
          }
          if (i === 5) {
            (inputXpath =
              "/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[4]/div/div/div/div[1]/div[2]/div/input"),
              await driver
                .findElement(By.xpath(inputXpath))
                .sendKeys("m", Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ENTER);
          }
        }
        if (i === 3 || i === 6) {
          if (i === 3)
            (checkInput = '//*[@id="withOptGroup"]/div/div[1]/div[1]'),
              (expectedInput = "Another root option");
          if (i === 6)
            (checkInput = '//*[@id="selectOne"]/div/div[1]/div[1]'),
              (expectedInput = "Ms.");
          const value = await driver
            .findElement(By.xpath(checkInput))
            .getText();
          if (value !== expectedInput)
            checkStep.error(selectMenu.scenario2.steps[step]);
        }
        if (i === 8 || i === 9 || i === 17 || i === 19 || i === 21) {
          if (i === 8) elementXpath = '//*[@id="oldSelectMenu"]/option[7]';
          if (i === 9)
            elementXpath = '//*[@id="selectMenuContainer"]/div[7]/div/div/div';
          if (i === 17)
            elementXpath =
              '//*[@id="selectMenuContainer"]/div[7]/div/div/div/div[1]/div[2]/div/div[2]';
          if (i === 19)
            elementXpath =
              '//*[@id="selectMenuContainer"]/div[7]/div/div/div/div[2]/div[1]';
          if (i === 21) elementXpath = '//*[@id="cars"]/option[1]';
          await driver.findElement(By.xpath(elementXpath)).click();
        }

        if (i === 10) {
          for (let j = 0; j < 2; j++) {
            await driver
              .findElement(
                By.xpath(
                  `/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[7]/div/div/div/div[1]/div[2]/div/input`
                )
              )
              .sendKeys(Key.ENTER);
            await delay(500);
          }
        }
        if (i === 11 || i === 14) {
          const colorExpected1 = "Green";
          const colorExpected2 = "Blue";
          const colorExpected3 = "Red";
          if (i === 11) iterations = 3;
          if (i === 14) iterations = 4;
          for (let j = 1; j < iterations; j++) {
            const checkStatus = await driver
              .findElement(
                By.xpath(
                  `//*[@id="selectMenuContainer"]/div[7]/div/div/div/div[1]/div[${j}]/div/div[1]`
                )
              )
              .getText();
            if (j === 1) colorExpected = colorExpected1;
            if (j === 2) colorExpected = colorExpected2;
            if (j === 3) colorExpected = colorExpected3;
            if (checkStatus !== colorExpected)
              checkStep.error(selectMenu.scenario2.steps[step]);
          }
        }
        if (i === 12 || i === 13) {
          if (i === 12) inputKeys = "d";
          if (i === 13) inputKeys = Key.ENTER;
          await delay(500);
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[7]/div/div/div/div[1]/div[3]/div/input"
              )
            )
            .sendKeys(inputKeys);
        }
        if (i === 15) {
          await delay(500);
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div[7]/div/div/div/div[1]/div[4]/div/input"
              )
            )
            .sendKeys(Key.BACK_SPACE);
          await delay(500);
        }
        if (i === 16 || i === 18) {
          if (i === 16) (itemDeleted = "Red"), (elementNum = 3);
          if (i === 18) (itemDeleted = "Blue"), (elementNum = 2);
          await delay(500);
          const checkStatus = await driver
            .findElement(
              By.xpath(
                `//*[@id="selectMenuContainer"]/div[7]/div/div/div/div[1]/div[${elementNum}]/div/div[1]`
              )
            )
            .getText();
          if (checkStatus === itemDeleted)
            checkStep.error(selectMenu.scenario2.steps[step]);
        }
        if (i === 20) {
          await delay(500);
          try {
            inputElement = await driver.findElement(
              By.xpath(
                '//*[@id="selectMenuContainer"]/div[7]/div/div/div/div[1]/div[1]/div/div[1]'
              )
            );
            checkStep.error(selectMenu.scenario2.steps[step]);
          } catch {
          }
        }
        if (i === 22) {
          await delay(500);
          let encodedString = await driver.takeScreenshot();
          await fs.writeFileSync(`./public/widgets/selectMenu/Menu.png`, encodedString, "base64");
        }
        checkStep.checked(selectMenu.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(selectMenu.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
