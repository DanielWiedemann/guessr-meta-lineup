// Clicking the toolbar icon opens the side panel directly, instead of
// requiring the user to find it in the side-panel picker.
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.error);
