const { delay } = require("../../functions/general");

module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const webTables = require("../../testCases/elements/webTables.json");
    const checkStep = require("../../functions/checkStep");
    const general = require("../../functions/general");
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(webTables.scenario1.title);
    for (let i = 0; i < webTables.scenario1.steps.length; i++) {
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
        if (i === 2) await driver.findElement(By.id("item-3")).click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/webtables") {
            error = true;
            checkStep.error(webTables.scenario1.steps[step]);
          }
        }
        if (error === false) checkStep.checked(webTables.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(webTables.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(webTables.scenario2.title);
    step = 0;
    formIds = [
      "firstName",
      "lastName",
      "age",
      "userEmail",
      "salary",
      "department",
    ];
    user1 = ["Cierra", "Vega", 39, "cierra@example.com", 10000, "Insurance"];
    user2 = ["Alden", "Cantrell", 45, "alden@example.com", 12000, "Compliance"];
    user3 = ["Kierra", "Gentry", 29, "kierra@example.com", 2000, "Legal"];
    newUser = ["First", "Last", 99, "email@email.com", 0, "Department"];
    for (let i = 0; i < webTables.scenario2.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/webtables");
          await driver.manage().window().fullscreen();
        }
        if (i % 2 === 1) {
          if (i === 1) id = "addNewRecordButton";
          if (i === 3) id = "submit";
          await driver.findElement(By.id(id)).click();
        }
        if (i === 2) {
          for (let j = 0; j < formIds.length; j++) {
            await driver.findElement(By.id(formIds[j])).sendKeys(newUser[j]);
          }
        }
        if (i === 4) {
          for (let j = 0; j < formIds.length; j++) {
            const text = await driver
              .findElement(
                By.xpath(
                  `//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[4]/div/div[${
                    j + 1
                  }]`
                )
              )
              .getText();
            if (text.localeCompare(newUser[j]) === -1) {
              error = true;
              checkStep.error(webTables.scenario2.steps[step]);
            }
          }
        }
        if (error === false) checkStep.checked(webTables.scenario2.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(webTables.scenario2.steps[step]);
      }
    }

    //Scenario 3
    checkStep.starScenario(webTables.scenario3.title);
    step = 0;
    for (let i = 0; i < webTables.scenario3.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/webtables");
          await driver.manage().window().fullscreen();
        }
        if (i < 3 && i != 0) {
          if (i === 1) id = "addNewRecordButton";
          if (i === 2) id = "submit";
          await driver.findElement(By.id(id)).click();
        }
        if (i === 2) {
          await delay(500);
          for (let j = 0; j < formIds.length; j++) {
            const color = await driver
              .findElement(By.id(formIds[j]))
              .getCssValue("border-color");
            this.checkColor(color, "Red");
          }
        }
        if (error === false) checkStep.checked(webTables.scenario3.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(webTables.scenario3.steps[step]);
      }
    }

    //Scenario 4
    checkStep.starScenario(webTables.scenario4.title);
    step = 0;
    for (let i = 0; i < webTables.scenario4.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/webtables");
          await driver.manage().window().fullscreen();
        }
        if (i === 1 || i === 3) {
          if (i === 1) id = "addNewRecordButton";
          if (i === 3) id = "submit";
          await driver.findElement(By.id(id)).click();
        }
        if (i === 2) {
          for (let j = 2; j < 5; j++) {
            if (j === 3) {
              parameter = "email";
            } else {
              parameter = "A";
            }
            await driver.findElement(By.id(formIds[j])).sendKeys(parameter);
          }
        }
        if (i === 4 || i === 6) {
          await general.delay(500);
          if (i === 4) colorExpected = "Red";
          if (i === 6) colorExpected = "Green";
          for (let j = 2; j < 5; j++) {
            const color = await driver
              .findElement(By.id(formIds[j]))
              .getCssValue("border-color");
            this.checkColor(color, colorExpected);
          }
        }
        if (i === 5) {
          for (let j = 2; j < 5; j++) {
            if (j === 3) {
              await driver
                .findElement(By.id(formIds[j]))
                .sendKeys("email@email.com");
            } else {
              if (j === 2) parameter = 99;
              if (j === 4) parameter = 0;
              await driver
                .findElement(By.id(formIds[j]))
                .sendKeys(Key.BACK_SPACE, parameter);
            }
          }
        }
        checkStep.checked(webTables.scenario4.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(webTables.scenario4.steps[step]);
      }
    }

    //Scenario 5
    checkStep.starScenario(webTables.scenario5.title);
    step = 0;
    for (let i = 0; i < webTables.scenario5.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/webtables");
          await driver.manage().window().fullscreen();
        }
        if (i % 2 === 1) {
          if (i === 1) id = "Z";
          if (i === 3) id = Key.BACK_SPACE + "Kierra";
          await driver.findElement(By.id("searchBox")).sendKeys(id);
        }
        if (i === 2) {
          const text = await driver
            .findElement(
              By.xpath(
                '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[3]'
              )
            )
            .getText();
          if (text != "No rows found")
            checkStep.error(webTables.scenario5.steps[step]);
        }
        if (i === 4) {
          for (let j = 0; j < formIds.length; j++) {
            const text = await driver
              .findElement(
                By.xpath(
                  `//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[1]/div/div[${
                    j + 1
                  }]`
                )
              )
              .getText();
            if (text.localeCompare(user3[j]) === -1) {
              error = true;
              checkStep.error(webTables.scenario5.steps[step]);
            }
          }
        }
        if (error === false) checkStep.checked(webTables.scenario5.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(webTables.scenario5.steps[step]);
      }
    }

    //Scenario 6
    checkStep.starScenario(webTables.scenario6.title);
    step = 0;
    for (let i = 0; i < webTables.scenario6.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/webtables");
          await driver.manage().window().fullscreen();
        }
        if (i % 2 === 1) {
          if (i === 1 || i === 3)
            path =
              '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[1]/div/div[1]';
          if (i === 5 || i === 7)
            path =
              '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[1]/div/div[2]';
          if (i === 9 || i === 11)
            path =
              '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[1]/div/div[3]';
          if (i === 13 || i === 15)
            path =
              '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[1]/div/div[4]';
          if (i === 17 || i === 19)
            path =
              '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[1]/div/div[5]';
          if (i === 21 || i === 23)
            path =
              '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[1]/div/div[6]';
          await driver.findElement(By.xpath(path)).click();
        }
        if (i % 2 === 0 && i != 0) {
          if (i === 8) user = user1;
          if (
            i === 2 ||
            i === 6 ||
            i === 12 ||
            i === 14 ||
            i === 20 ||
            i === 22
          )
            user = user2;
          if (i === 4 || i === 10 || i === 16 || i === 18 || i === 24)
            user = user3;
          for (let j = 0; j < formIds.length; j++) {
            const text = await driver
              .findElement(
                By.xpath(
                  `//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[1]/div/div[${
                    j + 1
                  }]`
                )
              )
              .getText();
            if (text.localeCompare(user[j]) === -1) {
              error = true;
              checkStep.error(webTables.scenario6.steps[step]);
            }
          }
        }
        if (error === false) checkStep.checked(webTables.scenario6.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(webTables.scenario6.steps[step]);
      }
    }

    //Scenario 7
    checkStep.starScenario(webTables.scenario7.title);
    step = 0;
    for (let i = 0; i < webTables.scenario7.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/webtables");
          await driver.manage().window().fullscreen();
        }
        if (i === 1 || i === 3 || i === 5 || (i > 8 && i % 2 === 1)) {
          if (i === 1 || (i > 8 && i % 2 === 1)) {
            if (i === 1) option = 1;
            if (i === 9) option = 1;
            if (i === 11) option = 2;
            if (i === 13) option = 3;
            if (i === 15) option = 4;
            if (i === 17) option = 5;
            if (i === 19) option = 6;
            path = `//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[2]/div/div[2]/span[2]/select/option[${option}]`;
          }
          if (i === 3)
            path =
              '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[2]/div/div[3]/button';
          if (i === 5)
            path =
              '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[2]/div/div[1]/button';
          await driver.findElement(By.xpath(path)).click();
        }
        if (i === 2) {
          for (let j = 0; j < 3; j++) {
            await driver.findElement(By.id("addNewRecordButton")).click();
            for (let k = 0; k < formIds.length; k++) {
              await driver.findElement(By.id(formIds[k])).sendKeys(newUser[k]);
            }
            await driver.findElement(By.id("submit")).click();
          }
        }
        if (i === 4 || i === 6 || i === 8) {
          const value = await driver
            .findElement(
              By.xpath(
                '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[2]/div/div[2]/span[1]/div/input'
              )
            )
            .getAttribute("value");
          if (i === 4 || i === 8) {
            if (value != 2) {
              error = true;
              checkStep.error(webTables.scenario7.steps[step]);
            }
          }
          if (i === 6) {
            if (value != 1) {
              error = true;
              checkStep.error(webTables.scenario7.steps[step]);
            }
          }
        }
        if (i === 7)
          await driver
            .findElement(
              By.xpath(
                '//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[2]/div/div[2]/span[1]/div/input'
              )
            )
            .sendKeys("2");
        if (i > 9 && i % 2 === 0) {
          if (i === 10) rows = 5;
          if (i === 12) rows = 10;
          if (i === 14) rows = 20;
          if (i === 16) rows = 25;
          if (i === 18) rows = 50;
          if (i === 20) rows = 100;
          await driver.findElement(
            By.xpath(
              `//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/div[1]/div[2]/div[${rows}]`
            )
          );
        }
        if (error === false) checkStep.checked(webTables.scenario7.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(webTables.scenario7.steps[step]);
      }
    }

    await driver.close();
  },

  checkColor: function (backColor, color) {
    if (color === "Red") {
      if (backColor != "rgb(220, 53, 69)") Promise.reject();
    }
    if (color === "Green") {
      if (backColor != "rgb(40, 167, 69)") Promise.reject();
    }
  },
};
