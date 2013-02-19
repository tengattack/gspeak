// Copyright (c) 2013 tengattack

var g_lang = 'zh';
chrome.storage.sync.get('lang', function(r) {
  g_lang = r['lang'];
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace == 'sync') {
    for (key in changes) {
      if (key == 'lang') {
        g_lang = changes[key].newValue;
        console.log('lang was changed to \'' + g_lang + '\'!');
      }
    }
  }
});

function selectionOnClick(info, tab) {
  if (info.selectionText) {
    //console.log('reading: \'' + info.selectionText + '\'!');
    var strurl = 'http://translate.google.com.hk/translate_tts?ie=UTF-8&q=' + info.selectionText + '&tl=' + g_lang + '&total=1&idx=0&textlen=' + info.selectionText.length.toString() + '&prev=input';
    soundManager.play('gsnd', {"url": strurl});
  }
}

var menu_title = chrome.i18n.getMessage('menu_title');
var id = chrome.contextMenus.create({"title": menu_title, "contexts":["selection"],
                                       "onclick": selectionOnClick});

soundManager.setup({
  url: chrome.extension.getURL('./swf/'),
  flashVersion: 9,
  debugMode: false,
  debugFlash: false,
  useHTML5Audio: true,
  html5Only: true,
  preferFlash: false,
  onready: function() {
    console.log('SM2 ready!');

    soundManager.createSound({
      id: 'gsnd',
      url: '',
      autoLoad: false,
      autoPlay: false,
      onload: function() {
        
      },
      volume: 100
    });

  },
  ontimeout: function() {
    console.log('SM2 init failed!');
  },
  defaultOptions: {
    // set global default volume for all sound objects
    volume: 33
  }
});


