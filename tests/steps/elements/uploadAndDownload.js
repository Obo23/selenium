module.exports = {
  test: async function () {
    const { By, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const uploadAndDownload = require("../../testCases/elements/uploadAndDownload.json");
    const checkStep = require("../../functions/checkStep");
    require("dotenv").config({ path: ".env" });
    let step = 0,
      error = false;

    //Scenario 1
    checkStep.starScenario(uploadAndDownload.scenario1.title);
    for (let i = 0; i < uploadAndDownload.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(
              By.xpath("/html/body/div[2]/div/div/div[2]/div/div[1]/div")
            )
            .click();
        if (i === 2) await driver.findElement(By.id("item-7")).click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/upload-download") {
            error = true;
            checkStep.error(uploadAndDownload.scenario1.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(uploadAndDownload.scenario1.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(uploadAndDownload.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(uploadAndDownload.scenario2.title);
    step = 0;
    for (let i = 0; i < uploadAndDownload.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/upload-download");
        if (i === 1) await driver.findElement(By.id("downloadButton")).click();
        if (i === 2) {
          error = true;
          checkStep.error(uploadAndDownload.scenario2.steps[step]);
        }
        if (i === 3) {
          await driver
            .findElement(By.id("uploadFile"))
            .sendKeys(process.env.IMG_PATH);
        }
        if (i === 4) {
          expectedPath = "C:\\fakepath\\sampleFile.jpeg";
          uploadPath = await driver
            .findElement(By.id("uploadedFilePath"))
            .getText();
          if (uploadPath !== expectedPath) {
            error = true;
            checkStep.error(uploadAndDownload.scenario2.steps[step]);
          }
        }
        if (error === false)
          checkStep.checked(uploadAndDownload.scenario2.steps[step]);
        error = false;
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(uploadAndDownload.scenario2.steps[step]);
      }
    }
    await driver.close();
  },
};
