module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const practiceForm = require("../../testCases/forms/practiceForm.json");
    const checkStep = require("../../functions/checkStep");
    const { delay } = require("../../functions/general");
    require("dotenv").config({ path: ".env" });

    user = [
      "Name Last",
      "email@email.com",
      "Other",
      "1234567890",
      "31 December,2000",
      "Maths",
      "Sports",
      "sampleFile.jpeg",
      "Address",
      "NCR Delhi",
    ];

    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(practiceForm.scenario1.title);
    for (let i = 0; i < practiceForm.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[2]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                '//*[@id="app"]/div/div/div[2]/div[1]/div/div/div[2]/div'
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/automation-practice-form") {
            error = true;
            checkStep.error(practiceForm.scenario1.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(practiceForm.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(practiceForm.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(practiceForm.scenario2.title);
    step = 0;
    for (let i = 0; i < practiceForm.scenario2.steps.length; i++) {
      try {
        if (i === 0) {
          await driver
            .manage()
            .window()
            .setRect({ height: 1270, width: 945, x: 1930, y: 1450 });
          await driver.get("https://demoqa.com/automation-practice-form");
        }
        if ((i > 0 && i < 4) || i === 5 || i === 9 || i === 10) {
          if (i === 1) (fieldId = "firstName"), (text = "Name");
          if (i === 2) (fieldId = "lastName"), (text = "Last");
          if (i === 3) (fieldId = "userEmail"), (text = user[1]);
          if (i === 5) (fieldId = "userNumber"), (text = user[3]);
          if (i === 9)
            (fieldId = "uploadPicture"), (text = process.env.IMG_PATH);
          if (i === 10) (fieldId = "currentAddress"), (text = user[8]);
          await driver.findElement(By.id(fieldId)).sendKeys(text);
        }
        if (i === 4 || i === 8 || i === 13 || i === 15) {
          if (i === 4)
            clickXpath = '//*[@id="genterWrapper"]/div[2]/div[3]/label';
          if (i === 8)
            clickXpath = '//*[@id="hobbiesWrapper"]/div[2]/div[1]/label';
          if (i === 13) clickXpath = '//*[@id="submit"]';
          if (i === 15) clickXpath = '//*[@id="closeLargeModal"]';
          await driver.findElement(By.xpath(clickXpath)).click();
        }
        if (i === 6) {
          await driver.findElement(By.id("dateOfBirthInput")).click();
          //Year 2000
          await driver
            .findElement(
              By.xpath(
                '//*[@id="dateOfBirth"]/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[2]/select/option[101]'
              )
            )
            .click();
          //Month 12
          await driver
            .findElement(
              By.xpath(
                '//*[@id="dateOfBirth"]/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[1]/select/option[12]'
              )
            )
            .click();
          //Day 31
          await driver
            .findElement(
              By.xpath(
                '//*[@id="dateOfBirth"]/div[2]/div[2]/div/div/div[2]/div[2]/div[6]/div[1]'
              )
            )
            .click();
        }
        if (i === 7) {
          await driver.findElement(By.id("subjectsInput")).sendKeys("m");
          await driver.findElement(By.id("subjectsInput")).sendKeys(Key.ENTER);
        }
        if (i === 11 || i === 12) {
          if (i === 11)
            (elementId = "state"),
              (elementXpath =
                "/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[10]/div[2]/div/div/div[1]/div[2]/div/input");
          if (i === 12)
            (elementId = "city"),
              (elementXpath =
                "/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[10]/div[3]/div/div/div[1]/div[2]/div/input");
          await driver.findElement(By.id(elementId)).click();
          await driver.findElement(By.xpath(elementXpath)).sendKeys(Key.ENTER);
        }
        if (i === 14) {
          for (let j = 0; j < 10; j++) {
            textValue = await driver
              .findElement(
                By.xpath(
                  `/html/body/div[4]/div/div/div[2]/div/table/tbody/tr[${
                    j + 1
                  }]/td[2]`
                )
              )
              .getText();
            checkText = user[j];
            if (textValue !== checkText) {
              error = true;
              checkStep.error(practiceForm.scenario2.steps[step]);
            }
          }
        }
        if (error === false)
          checkStep.checked(practiceForm.scenario2.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(practiceForm.scenario2.steps[step]);
      }
    }

    //Scenario 3
    checkStep.starScenario(practiceForm.scenario3.title);
    step = 0;
    for (let i = 0; i < practiceForm.scenario3.steps.length; i++) {
      try {
        if (i === 0) {
          await driver
            .manage()
            .window()
            .setRect({ height: 1270, width: 945, x: 1930, y: 1450 });
          await driver.get("https://demoqa.com/automation-practice-form");
        }
        if (i === 1 || i === 7)
          await driver.findElement(By.id("submit")).click();
        if (i === 2) {
          xpathArray = [
            '//*[@id="firstName"]',
            '//*[@id="lastName"]',
            '//*[@id="userNumber"]',
            '//*[@id="genterWrapper"]/div[2]/div[1]/label',
            '//*[@id="genterWrapper"]/div[2]/div[2]/label',
            '//*[@id="genterWrapper"]/div[2]/div[3]/label',
          ];
          await delay(500);
          for (j = 0; j < xpathArray.length; j++) {
            if (j < 3)
              borderColor = await driver
                .findElement(By.xpath(xpathArray[j]))
                .getCssValue("border-color");
            if (j > 2)
              wrapperColor = await driver
                .findElement(By.xpath(xpathArray[j]))
                .getCssValue("color");
            if (
              (j < 3 && borderColor !== "rgb(220, 53, 69)") ||
              (j > 2 && wrapperColor !== "rgba(220, 53, 69, 1)")
            ) {
              error = true;
              checkStep.error(practiceForm.scenario3.steps[step]);
            }
          }
        }
        if (i === 3 || i === 4 || i === 6) {
          if (i === 3) (fieldId = "firstName"), (text = "Name");
          if (i === 4) (fieldId = "lastName"), (text = "Last");
          if (i === 6) (fieldId = "userNumber"), (text = "123456789");
          await driver.findElement(By.id(fieldId)).sendKeys(text);
        }
        if (i === 5) {
          await driver
            .findElement(
              By.xpath('//*[@id="genterWrapper"]/div[2]/div[2]/label')
            )
            .click();
        }
        if (i === 8) {
          wrapperColor = await driver
            .findElement(By.id("userNumber"))
            .getCssValue("border-color");
          if (borderColor !== "rgb(220, 53, 69)") {
            error = true;
            checkStep.error(practiceForm.scenario3.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(practiceForm.scenario3.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(practiceForm.scenario3.steps[step]);
      }
    }

    //Scenario 4
    checkStep.starScenario(practiceForm.scenario4.title);
    step = 0;
    for (let i = 0; i < practiceForm.scenario4.steps.length; i++) {
      try {
        if (i === 0) {
          await driver
            .manage()
            .window()
            .setRect({ height: 1270, width: 945, x: 1930, y: 1450 });
          await driver.get("https://demoqa.com/automation-practice-form");
        }
        if ((i > 0 && i < 4) || (i > 7 && i < 11) || (i > 14 && i < 18)) {
          if (i === 8 || i === 15) await delay(500);
          if (i === 1 || i === 8 || i === 15)
            (fieldId = "firstName"), (text = "Name");
          if (i === 2 || i === 9 || i === 16)
            (fieldId = "lastName"), (text = "Last");
          if (i === 3 || i === 10 || i === 17)
            (fieldId = "userNumber"), (text = "1234567890");
          await driver.findElement(By.id(fieldId)).sendKeys(text);
        }
        if (
          i === 4 ||
          i === 5 ||
          i === 7 ||
          i === 11 ||
          i === 12 ||
          i === 14 ||
          i === 18 ||
          i === 19 ||
          i === 21
        ) {
          if (i === 4)
            xpathElement = '//*[@id="genterWrapper"]/div[2]/div[1]/label';
          if (i === 5 || i === 12 || i === 19)
            xpathElement = '//*[@id="submit"]';
          if (i === 7 || i === 14 || i === 21)
            xpathElement = '//*[@id="closeLargeModal"]';
          if (i === 11)
            xpathElement = '//*[@id="genterWrapper"]/div[2]/div[2]/label';
          if (i === 18)
            xpathElement = '//*[@id="genterWrapper"]/div[2]/div[3]/label';
          await driver.findElement(By.xpath(xpathElement)).click();
        }
        if (i === 6 || i === 13 || i === 20) {
          if (i === 6) exptectedText = "Male";
          if (i === 13) exptectedText = "Female";
          if (i === 20) exptectedText = "Other";
          textValue = await driver
            .findElement(
              By.xpath(
                `/html/body/div[4]/div/div/div[2]/div/table/tbody/tr[3]/td[2]`
              )
            )
            .getText();
          if (textValue !== exptectedText) {
            error = true;
            checkStep.error(practiceForm.scenario4.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(practiceForm.scenario4.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(practiceForm.scenario4.steps[step]);
      }
    }

    //Scenario 5
    checkStep.starScenario(practiceForm.scenario5.title);
    step = 0;
    for (let i = 0; i < practiceForm.scenario5.steps.length; i++) {
      try {
        if (i === 0) {
          await driver
            .manage()
            .window()
            .setRect({ height: 1270, width: 945, x: 1930, y: 1450 });
          await driver.get("https://demoqa.com/automation-practice-form");
        }
        if (i === 1 || i === 4 || i === 7) {
          if (i === 1) typeText = "m";
          if (i === 4) typeText = "a";
          if (i === 7) typeText = "p";
          await driver.findElement(By.id("subjectsContainer")).click();
          await driver.findElement(By.id("subjectsInput")).sendKeys(typeText);
        }
        if (i === 2 || i === 5 || i === 8) {
          await driver.findElement(By.id("subjectsInput")).sendKeys(Key.ENTER);
        }
        if (i === 3 || i === 6 || i === 9 || i === 11 || i === 13 || i === 15) {
          if (i === 3 || i === 15) subjectChecked = "Maths";
          if (i === 6 || i === 13) subjectChecked = "Accounting";
          if (i === 9 || i === 11) subjectChecked = "Physics";
          if (i === 3 || i === 6 || i === 9) subjectStatus = "selected";
          if (i === 11 || i === 13 || i === 15) subjectStatus = "deselected";
          const checkStatus = await driver
            .findElement(By.id("subjectsContainer"))
            .getText();
          if (
            i < 15 &&
            checkStatus.indexOf(subjectChecked + ", " + subjectStatus) === -1
          ) {
            error = true;
            checkStep.error(practiceForm.scenario5.steps[step]);
          }
          if (i > 14 && checkStatus.indexOf(subjectChecked) != -1) {
            error = true;
            checkStep.error(practiceForm.scenario5.steps[step]);
          }
        }
        if (i === 10) {
          await driver
            .findElement(By.id("subjectsInput"))
            .sendKeys(Key.BACK_SPACE);
        }
        if (i === 12) {
          await driver
            .findElement(
              By.xpath('//*[@id="subjectsContainer"]/div/div[1]/div[2]/div[2]')
            )
            .click();
        }
        if (i === 14) {
          await driver
            .findElement(By.xpath('//*[@id="subjectsContainer"]/div/div[2]'))
            .click();
        }
        if (error === false)
          checkStep.checked(practiceForm.scenario5.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(practiceForm.scenario5.steps[step]);
      }
    }

    //Scenario 6
    checkStep.starScenario(practiceForm.scenario6.title);
    step = 0;
    for (let i = 0; i < practiceForm.scenario6.steps.length; i++) {
      try {
        if (i === 0) {
          await driver
            .manage()
            .window()
            .setRect({ height: 1270, width: 945, x: 1930, y: 1450 });
          await driver.get("https://demoqa.com/automation-practice-form");
        }
        if ((i > 0 && i < 4) || (i > 9 && i < 13) || (i > 18 && i < 22)) {
          if (i === 10 || i === 19) await delay(500);
          if (i === 1 || i === 10 || i === 19)
            (fieldId = "firstName"), (text = "Name");
          if (i === 2 || i === 11 || i === 20)
            (fieldId = "lastName"), (text = "Last");
          if (i === 3 || i === 12 || i === 21)
            (fieldId = "userNumber"), (text = "1234567890");
          await driver.findElement(By.id(fieldId)).sendKeys(text);
        }
        if (
          (i > 3 && i < 7) ||
          i === 8 ||
          (i > 12 && i < 16) ||
          i === 17 ||
          (i > 21 && i < 25) ||
          i === 26
        ) {
          if (i === 4 || i === 13 || i === 22)
            xpathElement = '//*[@id="genterWrapper"]/div[2]/div[3]/label';
          if (i === 5)
            xpathElement = '//*[@id="hobbiesWrapper"]/div[2]/div[1]/label';
          if (i === 6 || i === 15 || i === 24)
            xpathElement = '//*[@id="submit"]';
          if (i === 8 || i === 17 || i === 26)
            xpathElement = '//*[@id="closeLargeModal"]';
          if (i === 14)
            xpathElement = '//*[@id="hobbiesWrapper"]/div[2]/div[2]/label';
          if (i === 23)
            xpathElement = '//*[@id="hobbiesWrapper"]/div[2]/div[3]/label';
          await driver.findElement(By.xpath(xpathElement)).click();
        }
        if (i === 7 || i === 16 || i === 25) {
          if (i === 7) exptectedText = "Sports";
          if (i === 16) exptectedText = "Reading";
          if (i === 25) exptectedText = "Music";
          textValue = await driver
            .findElement(
              By.xpath(
                `/html/body/div[4]/div/div/div[2]/div/table/tbody/tr[7]/td[2]`
              )
            )
            .getText();
          if (textValue !== exptectedText) {
            error = true;
            checkStep.error(practiceForm.scenario6.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(practiceForm.scenario6.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(practiceForm.scenario6.steps[step]);
      }
    }

    await driver.close();
  },
};
