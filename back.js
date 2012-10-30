var partialtext, memGen, imageGen;
chrome.contextMenus.create({
  title: "Generate Meme",
  contexts:["selection", "editable"]
});

var getMemeGen = function(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    var res;
    if (xhr.readyState === 4 && xhr.status === 200){
      try {
        res = JSON.parse(xhr.responseText).result;
        res = res[Math.floor(Math.random()*res.length)];
        imageGen = /http:\/\/cdn\.memegenerator\.net\/images\/400x\/(\d*)\.jpg/.exec(res.imageUrl)[1];
        memGen = res.generatorID;
      } catch (e){
        setTimeout(getMemeGen, 3000);
      }
    }
  }
  xhr.open("GET", "http://version1.api.memegenerator.net/Instances_Select_ByNew?languageCode=en&pageIndex=0&pageSize=3", true);
  xhr.send();
};
getMemeGen();
chrome.contextMenus.onClicked.addListener(function(e){
  var text = e.selectionText,
  sep = text.indexOf('\\'),
  text1, text2, xhr;
console.log(e.selectionText);
if (sep != -1 && text.length >= sep + 2 && text[sep + 1] != '\\'){
  text = text.split('\\');
  text1 = text[0];
  text2 = text[1];
} else if (partialtext){
  text1 = partialtext;
  text2 = text;
  partialtext = null;
} else {
  partialtext = text;
  return;
}
xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  var res;
  if (xhr.readyState === 4 && xhr.status === 200){
    try {
      res = JSON.parse(xhr.responseText).result;
      res = res.instanceImageUrl; 
      console.log(res);
      chrome.tabs.create({url: res});
      chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {image: res}, function(res){
          console.log(res);
        });
      });
    } catch (e){
      return;
    }
  }
};
xhr.open("GET","http://version1.api.memegenerator.net/Instance_Create?username=dekelgen&password=reindeerflotilla&languageCode=en&generatorID="+memGen+"&imageID="+imageGen+"&text0="+text1.replace(" ","%20")+"&text1="+text2.replace(" ","%20"), true);
xhr.send()
  getMemeGen();
  });
