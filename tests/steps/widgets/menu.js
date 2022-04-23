module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const menu = require("../../testCases/widgets/menu.json");
    const checkStep = require("../../functions/checkStep");
    let fs = require("fs");
    let step = 0;

    //Scenario 1
    checkStep.starScenario(menu.scenario1.title);
    for (let i = 0; i < menu.scenario1.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/");
          await driver
            .manage()
            .window()
            .setRect({ height: 2560, width: 1500, x: 1930, y: 1450 });
        }
        if (i === 1) {
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[4]'))
            .click();
          // await general.delay(1000);
        }
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[4]/div/ul/li[8]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/menu")
            checkStep.error(menu.scenario1.steps[step]);
        }
        checkStep.checked(menu.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(menu.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(menu.scenario2.title);
    step = 0;
    const item1 = '//*[@id="nav"]/li[1]';
    const item2 = '//*[@id="nav"]/li[2]';
    const subItem1 = '//*[@id="nav"]/li[2]/ul/li[1]';
    const subItem2 = '//*[@id="nav"]/li[2]/ul/li[2]';
    const subSubList = '//*[@id="nav"]/li[2]/ul/li[3]';
    const subSubItem1 = '//*[@id="nav"]/li[2]/ul/li[3]/ul/li[1]';
    const subSubItem2 = '//*[@id="nav"]/li[2]/ul/li[3]/ul/li[2]';
    const item3 = '//*[@id="nav"]/li[3]';
    for (let i = 0; i < menu.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/menu");
        if (i > 0 && i < 3) (checkItem = item1), (itemName = "Main_Item_1");
        if (i > 2 && i < 5) (checkItem = item2), (itemName = "Main_Item_2");
        if (i > 4 && i < 7) (checkItem = subItem1), (itemName = "Sub_Item_1");
        if (i > 6 && i < 9) (checkItem = subItem2), (itemName = "Sub_Item_2");
        if (i > 8 && i < 11)
          (checkItem = subSubList), (itemName = "Sub_Sub_List");
        if (i > 10 && i < 13)
          (checkItem = subSubItem1), (itemName = "Sub_Sub_Item_1");
        if (i > 12 && i < 15)
          (checkItem = subSubItem2), (itemName = "Sub_Sub_Item_2");
        if (i > 14 && i < 17) (checkItem = item3), (itemName = "Main_Item_3");
        if (i % 2 === 1) {
          var hoverElement = driver.findElement(By.xpath(checkItem));
          const actions = driver.actions({ async: true });
          await actions.move({ origin: hoverElement }).perform();
        }
        if (i % 2 === 0 && i != 0) {
          let encodedString = await driver.takeScreenshot();
          await fs.writeFileSync(
            `./public/widgets/menu/menu${itemName}.png`,
            encodedString,
            "base64"
          );
        }
        checkStep.checked(menu.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(menu.scenario2.steps[step]);
      }
    }

    await driver.close();
  },
};
