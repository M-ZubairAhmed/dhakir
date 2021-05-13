import { browser } from "webextension-polyfill-ts";

browser.runtime.onInstalled.addListener((): void => {
  console.log("Dhakir extension installed successfully");

  // TODO open help section here
  // browser.tabs.create({});
});

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({});
});
