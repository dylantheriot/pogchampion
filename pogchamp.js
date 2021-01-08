chrome.storage.local.get('pogchampion', function(res) {
  if (res.pogchampion) {
    init_preview.src = res.pogchampion;
  } else {
    let imgURL = chrome.extension.getURL("hboxPogChamp.png");
    chrome.storage.local.set({'pogchampion': imgURL});
    init_preview.src = imgURL;
  }
});

setInterval(function () { 
  var x = document.querySelectorAll('.chat-line__message .text-fragment:not(.pogged)'); 
  if (x.length !== 0) { 
    for (let i = 0; i < x.length; i++) {
      x[i].classList.add("pogged")
      chrome.storage.local.get('pogchampion', function(res) {
        x[i].innerHTML = x[i].innerHTML.replaceAll("PogChamp", `<img class="chat-image chat-line__message--emote" style="max-height: 28px; width: auto" src=${res.pogchampion} alt="PogChamp">`);
      });
    }
  }; 
}, 05);