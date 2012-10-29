chrome.contextMenus.create({
  title: "Generate Meme",
  contexts:["selection", "editable"]
});

chrome.contextMenus.onClicked.addListener(function(e){
  var text = e.selectionText;
  console.log(e.selectionText);
  debugger;
});
