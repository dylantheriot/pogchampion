document.addEventListener('DOMContentLoaded', function() {
  // chrome.storage.local.clear();
  // load previously chosen pogchamp
  const init_preview = document.querySelector('img');
  chrome.storage.local.get('pogchampion', function(res) {
    if (res.pogchampion) {
      init_preview.src = res.pogchampion;
    } else {
      let imgURL = chrome.extension.getURL("hboxPogChamp.png");
      chrome.storage.local.set({'pogchampion': imgURL});
      init_preview.src = imgURL;
    }
  });
  chrome.storage.local.get('toggle', function (res) {
    if (res.toggle) {
      let val = res.toggle === "true" ? true : false;
      document.getElementById('pogchampToggle').checked = val;
    }
    else {
      document.getElementById('pogchampToggle').checked = true;
      chrome.storage.local.set({'toggle': "true"});
    }
  });

  // chrome.storage.local.get('word', function(res) {
  //   if (res.word) {
  //     document.getElementById('word').value = res.word;
  //   }
  // });

  // document.querySelector('#word').addEventListener('change', function (evt) {
  //   chrome.storage.local.set({'word': evt.target.value}, function(){
  //     if (chrome.runtime.lastError) {
  //       alert('Word is too long. Please choose a smaller word.');
  //     }
  //   });
  // });

  document.querySelector('#pogchampToggle').addEventListener('change', function (evt) {
    let val = document.getElementById('pogchampToggle').checked ? "true" : "false";
    // alert(document.getElementById('pogchampToggle').checked);
    // alert(val);
    chrome.storage.local.set({'toggle': val}, function(){
      // alert('set to ', val);
      // alert(val);
    });
  });

  document.querySelector('.pogchampion').addEventListener('change', function (evt) {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      // convert image file to base64 string
      let pogchampionB64 = reader.result;
      preview.src = pogchampionB64;

      chrome.storage.local.set({'pogchampion': pogchampionB64}, function(){
        if(chrome.runtime.lastError)
        {
            alert('Image is too big. Please choose a smaller image.');
        }
    
      });

    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });
})