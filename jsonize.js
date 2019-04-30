// console.log("load extract-item-info.js");
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type === "start") {
      console.log({ message: "message" });
      sendResponse({ message });
    }
  });
