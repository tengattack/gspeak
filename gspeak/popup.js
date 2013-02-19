// Copyright (c) 2013 tengattack. All rights reserved.

$(document).ready(function() {

    var lang_list = [ 'zh', 'ja', 'en'];

    $('#span-info').html(chrome.i18n.getMessage('select_info'));

    //var la = localStorage.getItem('lang');
    chrome.storage.sync.get('lang', function(r) {

      var la = r['lang'];

      var bfind = false;

      var obj_select = $('#select-lang');

      for (var i = 0; i < lang_list.length; i++) {

        var bthis = false;
        var name = chrome.i18n.getMessage(lang_list[i]);

        if (la == lang_list[i]) {
          bfind = true;
          bthis = true;
        }

        obj_select.append("<option " + (bthis ? "selected " : "") + "value='" + lang_list[i] + "'>" + name + "</option>");
      }

      if (!bfind) {
        la = 'zh';
        //localStorage.setItem('lang', la);
        chrome.storage.sync.set({'lang': la}, function() {});
      }
    });

    $('#select-lang').change(function() {
      chrome.storage.sync.set({'lang': $(this).children('option:selected').val()}, function() {
        // Notify that we saved.
        // message('Settings saved');
      });
    });
})