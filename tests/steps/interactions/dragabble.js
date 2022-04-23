module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const dragabble = require("../../testCases/interactions/dragabble.json");
    const checkStep = require("../../functions/checkStep");
    const { delay } = require("../../functions/general");
    let step = 0;

    //Scenario 1
    checkStep.starScenario(dragabble.scenario1.title);
    for (let i = 0; i < dragabble.scenario1.steps.length; i++) {
      try {
        if (i === 0) {
          await driver.get("https://demoqa.com/");
          await driver
            .manage()
            .window()
            .setRect({ height: 1070, width: 945, x: 1930, y: 1450 });
        }
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[5]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[5]/div/ul/li[5]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/dragabble")
            checkStep.error(dragabble.scenario1.steps[step]);
        }
        checkStep.checked(dragabble.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(dragabble.scenario1.steps[step]);
      }
    }

    //Scenario 2
    checkStep.starScenario(dragabble.scenario2.title);
    step = 0;
    for (let i = 0; i < dragabble.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/dragabble");
        sourceEle = await driver.findElement(By.id('dragBox'));
        if (i === 1 || i === 3) {
          if (i === 1) {
            originalPositionX = await (await sourceEle.getRect()).x;
            originalPositionY = await (await sourceEle.getRect()).y;
          }
          if (i === 3) {
            finalPositionX = await (await sourceEle.getRect()).x;
            finalPositionY = await (await sourceEle.getRect()).y;
            if (
              originalPositionX === finalPositionX ||
              originalPositionY === finalPositionY
            )
              checkStep.error(dragabble.scenario2.steps[step]);
          }
        }
        if (i === 2) {
          const actions = driver.actions({ async: true });
          await actions
            .dragAndDrop(sourceEle, {
              x: parseInt(250),
              y: parseInt(250),
            })
            .perform();
        }
        checkStep.checked(dragabble.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(dragabble.scenario2.steps[step]);
      }
    }

    //Scenario 3
    checkStep.starScenario(dragabble.scenario3.title);
    step = 0;
    for (let i = 0; i < dragabble.scenario3.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/dragabble");
        if (i === 1)
          await driver
            .findElement(By.id("draggableExample-tab-axisRestriction"))
            .click();
        if (i < 5) elementId = "restrictedX";
        if (i > 4) elementId = "restrictedY";
        sourceEle = await driver.findElement(By.id(elementId));
        if (i === 2 || i === 4 || i === 5 || i === 7) {
          if (i === 2 || i === 5) {
            originalPositionX = await (await sourceEle.getRect()).x;
            originalPositionY = await (await sourceEle.getRect()).y;
          }
          if (i === 4 || i === 7) {
            finalPositionX = await (await sourceEle.getRect()).x;
            finalPositionY = await (await sourceEle.getRect()).y;
            if (
              i === 4 &&
              (originalPositionX === finalPositionX ||
                originalPositionY !== finalPositionY)
            )
              checkStep.error(dragabble.scenario3.steps[step]);
            if (
              i === 7 &&
              (originalPositionX !== finalPositionX ||
                originalPositionY === finalPositionY)
            )
              checkStep.error(dragabble.scenario3.steps[step]);
          }
        }
        if (i === 3 || i === 6) {
          const actions = driver.actions({ async: true });
          await actions
            .dragAndDrop(sourceEle, {
              x: parseInt(100),
              y: parseInt(100),
            })
            .perform();
        }
        checkStep.checked(dragabble.scenario3.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(dragabble.scenario3.steps[step]);
      }
    }

    //Scenario 4
    checkStep.starScenario(dragabble.scenario4.title);
    step = 0;
    minPosBox = [280.75, 355];
    maxPosBox = [487.75, 461];
    minPosParent = [269.75, 579];
    maxPosParent = [284.75, 667];
    for (let i = 0; i < dragabble.scenario4.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/dragabble");
        if (i === 1)
          await driver
            .findElement(By.id("draggableExample-tab-containerRestriction"))
            .click();
        if (i < 7) elementXpath = '//*[@id="containmentWrapper"]/div';
        if (i > 6)
          elementXpath =
            '//*[@id="draggableExample-tabpane-containerRestriction"]/div[2]/span';
        sourceEle = await driver.findElement(By.xpath(elementXpath));
        actualPositionX = await (await sourceEle.getRect()).x;
        actualPositionY = await (await sourceEle.getRect()).y;
        if (
          (i === 2 &&
            (actualPositionX !== minPosBox[0] ||
              actualPositionY !== minPosBox[1])) ||
          ((i === 4 || i === 6) &&
            (actualPositionX !== maxPosBox[0] ||
              actualPositionY !== maxPosBox[1])) ||
          (i === 7 &&
            (actualPositionX !== minPosParent[0] ||
              actualPositionY !== minPosParent[1])) ||
          ((i === 9 || i === 11) &&
            (actualPositionX !== maxPosParent[0] ||
              actualPositionY !== maxPosParent[1]))
        )
          checkStep.error(dragabble.scenario4.steps[step]);
        if (i === 3 || i === 5 || i === 8 || i === 10) {
          if (i === 3) (xValue = 207), (yValue = 106);
          if (i === 5 || i === 10) (xValue = 100), (yValue = 100);
          if (i === 8) (xValue = 15), (yValue = 88);
          const actions = driver.actions({ async: true });
          await actions
            .dragAndDrop(sourceEle, {
              x: parseInt(xValue),
              y: parseInt(yValue),
            })
            .perform();
        }
        checkStep.checked(dragabble.scenario4.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(dragabble.scenario4.steps[step]);
      }
    }

    //Scenario 5
    checkStep.starScenario(dragabble.scenario5.title);
    step = 0;
    initialPos = "0px";
    for (let i = 0; i < dragabble.scenario5.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/dragabble");
        if (i === 1)
          await driver
            .findElement(By.id("draggableExample-tab-cursorStyle"))
            .click();
        if (i > 1 && i < 5) elementId = "cursorCenter";
        if (i > 4 && i < 8) elementId = "cursorTopLeft";
        if (i > 7) elementId = "cursorBottom";
        if (i > 1) {
          sourceEle = await driver.findElement(By.id(elementId));
          actualPositionX = await await sourceEle.getCssValue("left");
          actualPositionY = await await sourceEle.getCssValue("top");
        }
        /*
        Check the relative position from cursor
        The cursor start at 0px 0px at he center, topleft or bottom position
        From the original position move 100px 100px
        When move the cursor 100px 100px from the original position give the next results
        cursorCenter 100 100 (Original postion of cursor until center of the object at the final position)
        cursorTopLeft 150 150 (Original postion of cursor until center of the object at the final position)
        cursorBottom 100 50 (Original postion of cursor until center of the object at the final position)
        */
        if (
          ((i === 2 || i === 5 || i === 8) &&
            (actualPositionX !== initialPos ||
              actualPositionY !== initialPos)) ||
          (i === 4 &&
            (actualPositionX !== "93.25px" || actualPositionY !== "94px")) ||
          (i === 7 &&
            (actualPositionX !== "154.25px" || actualPositionY !== "155px")) ||
          (i === 10 &&
            (actualPositionX !== "100px" || actualPositionY !== "50px"))
        )
          checkStep.error(dragabble.scenario4.steps[step]);
        if (i % 3 === 0 && i != 0) {
          const actions = driver.actions({ async: true });
          await actions
            .dragAndDrop(sourceEle, {
              x: parseInt(100),
              y: parseInt(100),
            })
            .perform();
          await delay(500);
        }
        checkStep.checked(dragabble.scenario5.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(dragabble.scenario5.steps[step]);
      }
    }

    await driver.close();
  },
};
