const textBox = require("./steps/elements/textBox.js");
const checkBox = require("./steps/elements/checkBox.js"); 
const radioButton = require("./steps/elements/radioButton.js"); 
const webTables = require("./steps/elements/webTables.js");
const buttons = require('./steps/elements/buttons.js');
const links = require('./steps/elements/links.js');
const brokenLinks = require('./steps/elements/brokenLinks.js');
const uploadAndDownload = require('./steps/elements/uploadAndDownload.js');
const dynamicProperties = require('./steps/elements/dynamicProperties.js'); 
const practiceForm = require ('./steps/forms/practiceForm.js');
const browserWindows = require ('./steps/alertsFrameWindows/browserWindows.js');
const alerts = require ('./steps/alertsFrameWindows/alerts.js'); 
const frames = require ('./steps/alertsFrameWindows/frames.js');
const nestedFrames = require ('./steps/alertsFrameWindows/nestedFrames.js');
const modalDialogs = require("./steps/alertsFrameWindows/modalDialogs.js"); 
const accordian = require("./steps/widgets/accordian.js"); 
const autoComplete = require("./steps/widgets/autoComplete.js"); 
const datePicker = require("./steps/widgets/datePicker.js"); 
const slider = require("./steps/widgets/slider.js"); 
const progressBar = require("./steps/widgets/progressBar.js"); 
const tabs = require("./steps/widgets/tabs.js");
const toolTips = require("./steps/widgets/toolTips.js");
const menu = require("./steps/widgets/menu.js");
const selectMenu = require("./steps/widgets/selectMenu.js");
const sortable = require("./steps/interactions/sortable.js");
const selectable = require("./steps/interactions/selectable.js"); 
const resizable = require("./steps/interactions/resizable.js"); 
const droppable = require("./steps/interactions/droppable.js");
const dragabble = require("./steps/interactions/dragabble.js");

async function tests() {
  //Elements
  await textBox.test();
  await checkBox.test();
  await radioButton.test();
  await webTables.test();
  await buttons.test();
  await links.test();
  await brokenLinks.test();
  await uploadAndDownload.test();
  await dynamicProperties.test();

  //Forms
  await practiceForm.test();

  // Alert, Frame & Windows
  await browserWindows.test();
  await alerts.test();
  await frames.test();
  await nestedFrames.test();
  await modalDialogs.test();

  //Widgets
  await accordian.test();
  await autoComplete.test();
  await datePicker.test();
  await slider.test();
  await progressBar.test();
  await tabs.test();
  await toolTips.test();
  await menu.test();
  await selectMenu.test();

  //Interactions
  await sortable.test();
  await selectable.test();
  await resizable.test();
  await droppable.test();
  await dragabble.test();
}

tests();