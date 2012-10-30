console.log("AWAITING MEME IMAGES!");
chrome.extension.onMessage.addListener(
    function(req, sender, sendRes){
      console.log(req.image);
    });
