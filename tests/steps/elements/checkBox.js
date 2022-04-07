module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const checkBox = require("../../testCases/elements/checkBox.json");
    const checkStep = require("../../functions/checkStep");
    let step = 0;

    //Scenario 1
    checkStep.starScenario(checkBox.scenario1.title);
    for (let i = 0; i < checkBox.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(
              By.xpath("/html/body/div[2]/div/div/div[2]/div/div[1]/div")
            )
            .click();
        if (i === 2) await driver.findElement(By.id("item-1")).click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== 'https://demoqa.com/checkBox')
            checkStep.error(checkBox.scenario1.steps[step]);
        }
        checkStep.checked(checkBox.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(checkBox.scenario1.steps[step]);
      }
    }
    
    //Scenario 2
    step = 0;
    checkStep.starScenario(checkBox.scenario2.title);
    for (let i = 0; i < checkBox.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/checkbox");
        if (i % 2 === 1) {
          if (i === 1)
            paths = [
              '//*[@id="tree-node"]/div/button[1]',
              '//*[@id="tree-node"]/ol/li/span/label',
            ];
          if (i === 3)
            paths = [
              '//*[@id="tree-node"]/ol/li/span/label',
              '//*[@id="tree-node"]/ol/li/ol/li[1]/span/label',
            ];
          if (i === 5)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[1]/span/label',
              '//*[@id="tree-node"]/ol/li/ol/li[1]/ol/li[1]/span/label',
            ];
          if (i === 7)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[1]/ol/li[1]/span/label',
              '//*[@id="tree-node"]/ol/li/ol/li[1]/ol/li[2]/span/label',
            ];
          if (i === 9)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[1]/ol/li[2]/span/label',
              '//*[@id="tree-node"]/ol/li/ol/li[2]/span/label',
            ];
          if (i === 11)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[2]/span/label',
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/span/label',
            ];
          if (i === 13)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/span/label',
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/ol/li[1]/span/label/span[3]',
            ];
          if (i === 15)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/ol/li[1]/span/label/span[3]',
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/ol/li[2]/span/label/span[3]',
            ];
          if (i === 17)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/ol/li[2]/span/label/span[3]',
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/ol/li[3]/span/label/span[3]',
            ];
          if (i === 19)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/ol/li[3]/span/label/span[3]',
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/span/label',
            ];
          if (i === 21)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/span/label',
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[1]/span/label/span[3]',
            ];
          if (i === 23)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[1]/span/label/span[3]',
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[2]/span/label/span[3]',
            ];
          if (i === 25)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[2]/span/label/span[3]',
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[3]/span/label/span[3]',
            ];
          if (i === 27)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[3]/span/label/span[3]',
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[4]/span/label/span[3]',
            ];
          if (i === 29)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/ol/li[4]/span/label/span[3]',
              '//*[@id="tree-node"]/ol/li/ol/li[3]/span/label',
            ];
          if (i === 31)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[3]/span/label',
              '//*[@id="tree-node"]/ol/li/ol/li[3]/ol/li[1]/span/label/span[3]',
            ];
          if (i === 33)
            paths = [
              '//*[@id="tree-node"]/ol/li/ol/li[3]/ol/li[1]/span/label/span[3]',
              '//*[@id="tree-node"]/ol/li/ol/li[3]/ol/li[2]/span/label/span[3]',
            ];
          for (let j = 0; j < paths.length; j++) {
            await driver.findElement(By.xpath(paths[j])).click();
          }
        }
        if (i % 2 === 0 && i != 0) {
          if (i === 2)
            elementsSel = [
              "home",
              "desktop",
              "notes",
              "commands",
              "documents",
              "workspace",
              "react",
              "angular",
              "veu",
              "office",
              "public",
              "private",
              "classified",
              "general",
              "downloads",
              "wordFile",
              "excelFile",
            ];
          if (i === 4) elementsSel = ["desktop", "notes", "commands"];
          if (i === 6) elementsSel = ["notes"];
          if (i === 8) elementsSel = ["commands"];
          if (i === 10)
            elementsSel = [
              "documents",
              "workspace",
              "react",
              "angular",
              "veu",
              "office",
              "public",
              "private",
              "classified",
              "general",
            ];
          if (i === 12) elementsSel = ["workspace", "react", "angular", "veu"];
          if (i === 14) elementsSel = ["react"];
          if (i === 16) elementsSel = ["angular"];
          if (i === 18) elementsSel = ["veu"];
          if (i === 20)
            elementsSel = [
              "office",
              "public",
              "private",
              "classified",
              "general",
            ];
          if (i === 22) elementsSel = ["public"];
          if (i === 24) elementsSel = ["private"];
          if (i === 26) elementsSel = ["classified"];
          if (i === 28) elementsSel = ["general"];
          if (i === 30) elementsSel = ["downloads", "wordFile", "excelFile"];
          if (i === 32) elementsSel = ["wordFile"];
          if (i === 34) elementsSel = ["excelFile"];
          for (let j = 0; j < elementsSel.length; j++) {
            const result = await driver
              .findElement(By.xpath(`//*[@id="result"]/span[${j + 2}]`))
              .getText();
            if (elementsSel[j].localeCompare(result) === -1) Promise.reject();
          }
        }
        checkStep.checked(checkBox.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(checkBox.scenario2.steps[step]);
      }
    }

    //Scenario 3
    step = 0;
    checkStep.starScenario(checkBox.scenario3.title);
    for (let i = 0; i < checkBox.scenario3.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/checkbox");
        if (i % 2 === 1) {
          if (i === 1) path = '//*[@id="tree-node"]/ol/li/span/button';
          if (i === 3) path = '//*[@id="tree-node"]/ol/li/ol/li[1]/span/button';
          if (i === 5) path = '//*[@id="tree-node"]/ol/li/ol/li[2]/span/button';
          if (i === 7)
            path = '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[1]/span/button';
          if (i === 9)
            path = '//*[@id="tree-node"]/ol/li/ol/li[2]/ol/li[2]/span/button';
          if (i === 11)
            path = '//*[@id="tree-node"]/ol/li/ol/li[3]/span/button';
          await driver.findElement(By.xpath(path)).click();
        }
        if (i % 2 === 0 && i != 0) {
          if (i === 2)
            id = [
              "tree-node-desktop",
              "tree-node-documents",
              "tree-node-downloads",
            ];
          if (i === 4) id = ["tree-node-notes", "tree-node-commands"];
          if (i === 6) id = ["tree-node-workspace", "tree-node-office"];
          if (i === 8)
            id = ["tree-node-react", "tree-node-angular", "tree-node-veu"];
          if (i === 10)
            id = [
              "tree-node-public",
              "tree-node-private",
              "tree-node-classified",
              "tree-node-general",
            ];
          if (i === 12) id = ["tree-node-wordFile", "tree-node-excelFile"];
          for (let j = 0; j < id.length; j++) {
            await driver.findElement(By.id(id[j]));
          }
        }
        checkStep.checked(checkBox.scenario3.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(checkBox.scenario3.steps[step]);
      }
    }

    //Scenario 4
    checkStep.starScenario(checkBox.scenario4.title);
    step = 0;
    elements = [
      "tree-node-desktop",
      "tree-node-documents",
      "tree-node-downloads",
      "tree-node-notes",
      "tree-node-commands",
      "tree-node-workspace",
      "tree-node-office",
      "tree-node-react",
      "tree-node-angular",
      "tree-node-veu",
      "tree-node-public",
      "tree-node-private",
      "tree-node-classified",
      "tree-node-general",
      "tree-node-wordFile",
      "tree-node-excelFile",
    ];
    for (let i = 0; i < checkBox.scenario4.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/checkbox");
        if (i % 2 === 1) {
          if (i === 1) path = '//*[@id="tree-node"]/div/button[1]';
          if (i === 3) path = '//*[@id="tree-node"]/div/button[2]';
          await driver.findElement(By.xpath(path)).click();
        }
        if (i === 2) {
          for (let j = 0; j < elements.length; j++) {
            await driver.findElement(By.id(elements[j]));
          }
        }
        if (i === 4) {
          try {
            for (let j = 0; j < elements.length; j++) {
              await driver.findElement(By.id(elements[j])).getAttribute("id");
              checkStep.error(checkBox.scenario4.steps[step]);
            }
          } catch {
            continue;
          }
        }
        checkStep.checked(checkBox.scenario4.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(checkBox.scenario4.steps[step]);
      }
    }

    await driver.close();
  },
};
