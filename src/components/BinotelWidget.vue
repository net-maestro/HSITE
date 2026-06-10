<template>
    <!-- Этот div может быть полезен, если вам нужно место для отображения виджета или сообщения -->
    <div id="binotel-widget"></div>
  </template>
  
  <script>
  export default {
    name: "BinotelWidget",
    mounted() {
      (function(d, w, s) {
        var widgetHash = "0mmyvktfegrrksj8khly",
          gcw = d.createElement(s);
        gcw.type = "text/javascript";
        gcw.async = true;
        gcw.src = "//widgets.binotel.com/getcall/widgets/" + widgetHash + ".js";
        var sn = d.getElementsByTagName(s)[0];
        sn.parentNode.insertBefore(gcw, sn);
      })(document, window, "script");
    },
  };
  </script>
  