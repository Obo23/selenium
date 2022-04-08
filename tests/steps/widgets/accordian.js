const general = require("../../functions/general");

module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const accordian = require("../../testCases/widgets/accordian.json");
    const checkStep = require("../../functions/checkStep");

    let step = 0;

    //Scenario 1
    checkStep.starScenario(accordian.scenario1.title);
    for (let i = 0; i < accordian.scenario1.steps.length; i++) {
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
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[4]/div/ul/li[1]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/accordian")
            checkStep.error(accordian.scenario1.steps[step]);
        }
        checkStep.checked(accordian.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(accordian.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(accordian.scenario2.title);
    step = 0;
    const collapse = "collapse",
      deployed = "collapse show";
    for (let i = 0; i < accordian.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/accordian");
        if (i % 2 === 1) {
          if (i === 1) idElement = "section3Heading";
          if (i === 3) idElement = "section2Heading";
          if (i === 5) idElement = "section1Heading";
          await driver.findElement(By.id(idElement)).click();
        }
        if (i % 2 === 0 && i != 0) {
          await general.delay(1500);
          const sectionStatus1 = await driver
            .findElement(
              By.xpath('//*[@id="accordianContainer"]/div/div[1]/div[2]')
            )
            .getAttribute("class");
          const sectionStatus2 = await driver
            .findElement(
              By.xpath('//*[@id="accordianContainer"]/div/div[2]/div[2]')
            )
            .getAttribute("class");
          const sectionStatus3 = await driver
            .findElement(
              By.xpath('//*[@id="accordianContainer"]/div/div[3]/div[2]')
            )
            .getAttribute("class");
          if (i === 2) {
            if (
              sectionStatus1 != collapse ||
              sectionStatus2 != collapse ||
              sectionStatus3 != deployed
            ) {
              checkStep.error(accordian.scenario2.steps[step]);
            }
          }
          if (i === 4) {
            if (
              sectionStatus1 != collapse ||
              sectionStatus2 != deployed ||
              sectionStatus3 != collapse
            ) {
              checkStep.error(accordian.scenario2.steps[step]);
            }
          }
          if (i === 6) {
            if (
              sectionStatus1 != deployed ||
              sectionStatus2 != collapse ||
              sectionStatus3 != collapse
            ) {
              checkStep.error(accordian.scenario2.steps[step]);
            }
          }
        }
        checkStep.checked(accordian.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(accordian.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
