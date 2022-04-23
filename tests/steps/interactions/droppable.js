const { delay } = require("../../functions/general");

module.exports = {
  test: async function () {
    const { By, Key, Builder } = require("selenium-webdriver");
    let driver = new Builder().forBrowser("chrome").build();
    const droppable = require("../../testCases/interactions/droppable.json");
    const checkStep = require("../../functions/checkStep");

    let step = 0;

    //Scenario 1
    checkStep.starScenario(droppable.scenario1.title);
    for (let i = 0; i < droppable.scenario1.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/");
        if (i === 1)
          await driver
            .findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[5]'))
            .click();
        if (i === 2)
          await driver
            .findElement(
              By.xpath(
                "/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[5]/div/ul/li[4]"
              )
            )
            .click();
        if (i === 3) {
          const url = await driver.getCurrentUrl();
          if (url !== "https://demoqa.com/droppable")
            checkStep.error(droppable.scenario1.steps[step]);
        }
        checkStep.checked(droppable.scenario1.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(droppable.scenario1.steps[step]);
      }
    }

    // //Scenario 2
    checkStep.starScenario(droppable.scenario2.title);
    step = 0;
    for (let i = 0; i < droppable.scenario2.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/droppable");
        if (i === 1 || i === 3) {
          if (i === 1)
            (colorExpected = "rgba(0, 0, 0, 0)"), (textExpected = "Drop here");
          if (i === 3)
            (colorExpected = "rgba(70, 130, 180, 1)"),
              (textExpected = "Dropped!");
          droppedElement = await driver.findElement(By.id("droppable"));
          backGround = await droppedElement.getCssValue("background-color");
          actualText = await droppedElement.getText();
          if (backGround !== colorExpected || actualText !== textExpected)
            checkStep.error(droppable.scenario2.steps[step]);
        }
        if (i === 2) {
          let sourceEle = await driver.findElement(By.id("draggable"));
          const actions = driver.actions({ async: true });
          await actions
            .dragAndDrop(sourceEle, {
              x: parseInt(190),
              y: parseInt(0),
            })
            .perform();
        }
        checkStep.checked(droppable.scenario2.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(droppable.scenario2.steps[step]);
      }
    }

    //Scenario 3
    checkStep.starScenario(droppable.scenario3.title);
    step = 0;
    for (let i = 0; i < droppable.scenario3.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/droppable");
        if (i === 1)
          await driver
            .findElement(By.id("droppableExample-tab-accept"))
            .click();
        if (i % 2 === 0 && i > 0) {
          if (i === 2 || i === 4)
            (colorExpected = "rgba(0, 0, 0, 0)"), (textExpected = "Drop here");
          if (i === 6)
            (colorExpected = "rgba(70, 130, 180, 1)"),
              (textExpected = "Dropped!");
          droppedElement = await driver.findElement(
            By.xpath(
              "/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div/div[2]/div/div[2]"
            )
          );
          backGround = await droppedElement.getCssValue("background-color");
          actualText = await droppedElement.getText();
          if (backGround !== colorExpected || actualText !== textExpected)
            checkStep.error(droppable.scenario3.steps[step]);
        }
        if (i === 3 || i === 5) {
          if (i === 3) elementId = "notAcceptable";
          if (i === 5) elementId = "acceptable";
          let sourceEle = await driver.findElement(By.id(elementId));
          const actions = driver.actions({ async: true });
          await actions
            .dragAndDrop(sourceEle, {
              x: parseInt(190),
              y: parseInt(0),
            })
            .perform();
        }
        checkStep.checked(droppable.scenario3.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(droppable.scenario3.steps[step]);
      }
    }

    //Scenario 4
    checkStep.starScenario(droppable.scenario4.title);
    step = 0;
    for (let i = 0; i < droppable.scenario4.steps.length; i++) {
      try {
        let dropElements = [
          "notGreedyDropBox",
          "notGreedyInnerDropBox",
          "greedyDropBox",
          "greedyDropBoxInner",
        ];
        colorNotDrop = "rgba(0, 0, 0, 0)";
        colorDropped = "rgba(70, 130, 180, 1)";
        outerText = "Outer droppable\n";
        innerTextGreedy = "Inner droppable (greedy)";
        innerTextNotGreedy = "Inner droppable (not greedy)";
        droppedText = "Dropped!";
        if (i === 0) await driver.get("https://demoqa.com/droppable");
        if (i === 1 || i === 12)
          await driver
            .findElement(By.id("droppableExample-tab-preventPropogation"))
            .click();
        if ((i % 2 === 0 && i > 0 && i < 11) || i === 14 || i === 16) {
          for (let j = 0; j < 4; j++) {
            droppedElement = await driver.findElement(By.id(dropElements[j]));
            backGround = await droppedElement.getCssValue("background-color");
            actualText = await droppedElement.getText();
            if (i === 2) {
              colorExpected = colorNotDrop;
              if (j === 0) textExpected = outerText + innerTextNotGreedy;
              if (j === 1) textExpected = innerTextNotGreedy;
              if (j === 2) textExpected = outerText + innerTextGreedy;
              if (j === 3) textExpected = innerTextGreedy;
            }
            if (i === 4) {
              if (j === 0) {
                colorExpected = colorDropped;
              } else {
                colorExpected = colorNotDrop;
              }
              if (j === 0)
                textExpected = droppedText + "\n" + innerTextNotGreedy;
              if (j === 1) textExpected = innerTextNotGreedy;
              if (j === 2) textExpected = outerText + innerTextGreedy;
              if (j === 3) textExpected = innerTextGreedy;
            }
            if (i === 6 || i === 14) {
              if (j < 2) {
                colorExpected = colorDropped;
              } else {
                colorExpected = colorNotDrop;
              }
              if (j === 0) textExpected = droppedText + "\n" + droppedText;
              if (j === 1) textExpected = droppedText;
              if (j === 2) textExpected = outerText + innerTextGreedy;
              if (j === 3) textExpected = innerTextGreedy;
            }
            if (i === 8) {
              if (j < 3) {
                colorExpected = colorDropped;
              } else {
                colorExpected = colorNotDrop;
              }
              if (j === 0) textExpected = droppedText + "\n" + droppedText;
              if (j === 1) textExpected = droppedText;
              if (j === 2) textExpected = droppedText + "\n" + innerTextGreedy;
              if (j === 3) textExpected = innerTextGreedy;
            }
            if (i === 10) {
              colorExpected = colorDropped;
              if (j % 2 === 0) textExpected = droppedText + "\n" + droppedText;
              if (j % 2 === 1) textExpected = droppedText;
            }
            if (i === 16) {
              if (j === 2) {
                colorExpected = colorNotDrop;
              } else {
                colorExpected = colorDropped;
              }
              if (j === 0) textExpected = droppedText + "\n" + droppedText;
              if (j === 1) textExpected = droppedText;
              if (j === 2) textExpected = outerText + droppedText;
              if (j === 3) textExpected = droppedText;
            }
            if (backGround !== colorExpected || actualText !== textExpected)
              checkStep.error(droppable.scenario4.steps[step]);
          }
        }
        if ((i % 2 === 1 && i > 1 && i < 10) || i === 13 || i === 15) {
          xValue = 0;
          yValue = 0;
          if (i === 3) xValue = 190;
          if (i === 5 || i === 9) yValue = 75;
          if (i === 7) yValue = 210;
          if (i === 13) (xValue = 190), (yValue = 75);
          if (i === 15) yValue = 285;
          let sourceEle = await driver.findElement(By.id("dragBox"));
          const actions = driver.actions({ async: true });
          await actions
            .dragAndDrop(sourceEle, {
              x: parseInt(xValue),
              y: parseInt(yValue),
            })
            .perform();
        }
        if (i === 11) {
          await driver.navigate().refresh();
        }
        checkStep.checked(droppable.scenario4.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(droppable.scenario4.steps[step]);
      }
    }

    //Scenario 5
    checkStep.starScenario(droppable.scenario5.title);
    step = 0;
    let originalPositionX;
    let originalPositionY;
    for (let i = 0; i < droppable.scenario5.steps.length; i++) {
      try {
        if (i === 0) await driver.get("https://demoqa.com/droppable");
        if (i === 1 || i === 10)
          await driver
            .findElement(By.id("droppableExample-tab-revertable"))
            .click();
        if (i < 5) elementId = "revertable";
        if (i > 10) elementId = "notRevertable";
        sourceEle = await driver.findElement(By.id(elementId));
        //Check the color and the text of drop element
        if (i === 2 || i === 6 || i === 14) {
          if (i === 2)
            (colorExpected = "rgba(0, 0, 0, 0)"), (textExpected = "Drop here");
          if (i === 6 || i === 14)
            (colorExpected = "rgba(70, 130, 180, 1)"),
              (textExpected = "Dropped!");
          droppedElement = await driver.findElement(
            By.xpath(
              "/html/body/div[2]/div/div/div[2]/div[2]/div[2]/div/div[4]/div/div[2]"
            )
          );
          backGround = await droppedElement.getCssValue("background-color");
          actualText = await droppedElement.getText();
          if (backGround !== colorExpected || actualText !== textExpected)
            checkStep.error(droppable.scenario5.steps[step]);
        }
        // Check the position of the drag element
        if (i === 4 || i === 6 || i === 8 || i === 12 || i === 14 || i === 16) {
          let finalPositionX = await (await sourceEle.getRect()).x;
          let finalPositionY = await (await sourceEle.getRect()).y;
          if (
            (i === 4 || i === 8 || i === 14) &&
            (originalPositionX === finalPositionX ||
              originalPositionY === finalPositionY)
          )
            checkStep.error(droppable.scenario5.steps[step]);
          if (
            (i === 6 || i === 10 || i === 12 || i === 16) &&
            (originalPositionX !== finalPositionX ||
              originalPositionY !== finalPositionY)
          )
            checkStep.error(droppable.scenario5.steps[step]);
        }
        //Move the drag element
        if (i === 3 || i === 5 || i === 7 || i === 11 || i === 13 || i === 15) {
          originalPositionX = await (await sourceEle.getRect()).x;
          originalPositionY = await (await sourceEle.getRect()).y;
          if (i === 3 || i === 11) (xValue = 50), (yValue = 10);
          if (i === 5) (xValue = 140), (yValue = 10);
          if (i === 7 || i === 15) (xValue = -140), (yValue = -10);
          if (i === 13) (xValue = 190), (yValue = 20);
          const actions = driver.actions({ async: true });
          await actions
            .dragAndDrop(sourceEle, {
              x: parseInt(xValue),
              y: parseInt(yValue),
            })
            .perform();
          await delay(500);
        }
        if (i === 9) {
          await driver.navigate().refresh();
        }
        checkStep.checked(droppable.scenario5.steps[step]);
        step++;
      } catch (e) {
        await driver.close();
        checkStep.error(droppable.scenario5.steps[step]);
      }
    }

    await driver.close();
  },
};
