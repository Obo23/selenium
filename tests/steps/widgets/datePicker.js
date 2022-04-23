module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const datePicker = require("../../testCases/widgets/datePicker.json");
    const checkStep = require("../../functions/checkStep");
    const general = require("../../functions/general");
    let step = 0;

    //Scenario 1
    checkStep.starScenario(datePicker.scenario1.title);
    for (let i = 0; i < datePicker.scenario1.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/");
          await driver.manage().window().fullscreen();
        }
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[4]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[4]/div/ul/li[3]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/date-picker")
            checkStep.error(datePicker.scenario1.steps[step]);
        }
        checkStep.checked(datePicker.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(datePicker.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(datePicker.scenario2.title);
    step = 0;
    const date = [1, 6, 12, 2000]; //12 31 2000
    for (let i = 0; i < datePicker.scenario2.steps.length; i++) {
      try {
        if (i === 0) {
        await driver.get("https://demoqa.com/date-picker");
        await driver.manage().window().fullscreen();
      }
        if (i === 1) {
          await driver.findElement(By.id("datePickerMonthYearInput")).click();
          await driver
            .findElement(
              By.xpath(
                `//*[@id="datePickerMonthYear"]/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[1]/select/option[${date[2]}]`
              )
            )
            .click();
          await driver
            .findElement(
              By.xpath(
                `//*[@id="datePickerMonthYear"]/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[2]/select/option[${
                  date[3] - 1899
                }]`
              )
            )
            .click();
          await driver
            .findElement(
              By.xpath(
                `//*[@id="datePickerMonthYear"]/div[2]/div[2]/div/div/div[2]/div[2]/div[${date[1]}]/div[${date[0]}]`
              )
            )
            .click();
        }
        if (i === 2) {
          const checkDate = await driver
            .findElement(By.id("datePickerMonthYearInput"))
            .getAttribute("value");
          if (checkDate !== "12/31/2000")
            checkStep.error(datePicker.scenario2.steps[step]);
        }
        checkStep.checked(datePicker.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(datePicker.scenario2.steps[step]);
      }
    }

    //Scenario 3
    const date2 = [1, 6, 12, 12, 41]; //December 31, 2000 10:00 AM
    checkStep.starScenario(datePicker.scenario3.title);
    step = 0;
    for (let i = 0; i < datePicker.scenario3.steps.length; i++) {
      try {
        if (i === 0) {
        await driver.get("https://demoqa.com/date-picker");
        await driver.manage().window().fullscreen();
      }
        if (i === 1) {
          await driver.findElement(By.id("dateAndTimePickerInput")).click();
          await driver
            .findElement(
              By.xpath(
                `//*[@id="dateAndTimePicker"]/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[1]`
              )
            )
            .click();
          await driver
            .findElement(
              By.xpath(
                `//*[@id="dateAndTimePicker"]/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[1]/div[1]/div[${date2[2]}]`
              )
            )
            .click();
          await driver
            .findElement(
              By.xpath(
                `//*[@id="dateAndTimePicker"]/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[2]`
              )
            )
            .click();
          for (let i = 0; i < 17; i++) {
            await driver
              .findElement(
                By.xpath(
                  `//*[@id="dateAndTimePicker"]/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[2]/div[1]/div[13]`
                )
              )
              .click();
          }
          await driver
            .findElement(
              By.xpath(
                `//*[@id="dateAndTimePicker"]/div[2]/div[2]/div/div/div[2]/div[1]/div[2]/div[2]/div[1]/div[${date2[3]}]`
              )
            )
            .click();
          await driver
            .findElement(
              By.xpath(
                `//*[@id="dateAndTimePicker"]/div[2]/div[2]/div/div/div[2]/div[2]/div[${date2[1]}]/div[${date2[0]}]`
              )
            )
            .click();
          await driver
            .findElement(
              By.xpath(
                `//*[@id="dateAndTimePicker"]/div[2]/div[2]/div/div/div[3]/div[2]/div/ul/li[${date2[4]}]`
              )
            )
            .click();
        }
        if (i === 2) {
          const checkDate2 = await driver
            .findElement(By.id("dateAndTimePickerInput"))
            .getAttribute("value");
          if (checkDate2 !== "December 31, 2000 10:00 AM")
            checkStep.error(datePicker.scenario2.steps[step]);
        }
        checkStep.checked(datePicker.scenario3.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(datePicker.scenario3.steps[step]);
      }
    }

    await driver.close();
  },
};
