chrome.storage.local.get('pogchampion', function (res) {
  if (res.pogchampion) {
    init_preview.src = res.pogchampion;
  } else {
    let imgURL = chrome.extension.getURL("hboxPogChamp.png");
    chrome.storage.local.set({ 'pogchampion': imgURL });
    init_preview.src = imgURL;
  }
});

setInterval(function () {
  chrome.storage.local.get('toggle', function (res) {
    let toggle = res.toggle === "true" ? true : false;
    // var x = document.querySelectorAll('.chat-line__message .text-fragment:not(.pogged)');
    var x = document.querySelectorAll('.chat-image.chat-line__message--emote:not(.pogged)');
    // let pogChampionWord = '';
    // chrome.storage.local.get('word', function (res) {
    //   if (res.word) {
    //     pogChampionWord = res.word;
    //   }
    //   else {
    //     // default
    //     pogChampionWord = 'PogChampion';
    //   }
    // })
    if (x.length !== 0) {
      for (let i = 0; i < x.length; i++) {
        x[i].classList.add("pogged")
        if (toggle) {
          if (x[i].alt === "PogChamp") {
            chrome.storage.local.get('pogchampion', function (res) {
              x[i].removeAttribute("srcset");
              x[i].src = res.pogchampion;
            });
          }
        }
        // chrome.storage.local.get('pogchampion', function(res) {
        //   x[i].innerHTML = x[i].innerHTML.replaceAll(pogChampionWord, `<img class="chat-image chat-line__message--emote" style="max-height: 28px; width: auto" src=${res.pogchampion} alt="PogChamp">`);
        // });
      }
    };

  });

}, 05);