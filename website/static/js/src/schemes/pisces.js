$(document).ready(function () {
  var $headerInner = $('.header-inner');
  var $sidebar = $('#sidebar');
  var getSidebarTop = function(){
    return $headerInner.height() + CONFIG.sidebar.offset;
  };
  var setSidebarMarginTop = function(sidebarTop){
    return $sidebar.css({ 'margin-top': sidebarTop });
  };
  var mql = window.matchMedia('(min-width: 991px)');
  setSidebarMarginTop(getSidebarTop()).show();
  mql.addListener(function(e){
    if(e.matches){
      setSidebarMarginTop(getSidebarTop());
    }
  });
});

$.fn.delegates = function(configs) {
  el = $(this[0]);
  for (var name in configs) {
       var value = configs[name];
       if (typeof value == 'function') {
            var obj = {};
            obj.click = value;
            value = obj;
       };
       for (var type in value) {
            el.delegate(name, type, value[type]);
       }
  }
  return this;
};