var partialtext;
chrome.contextMenus.create({
  title: "Generate Meme",
  contexts:["selection", "editable"]
});

chrome.contextMenus.onClicked.addListener(function(e){
  var text = e.selectionText,
      sep = text.indexOf('\\'),
      text1, text2;
  console.log(e.selectionText);
  if (sep != -1 && text.length >= sep + 2 && text[sep + 1] != '\\'){
    text = text.split('\\');
    text1 = text[0];
    text2 = text[1];
    debugger;
  } else if (partialtext){
    text1 = partialtext;
    text2 = text;
    partialtext = null;
    debugger;
  } else {
    partialtext = text;
    return;
  }

});
