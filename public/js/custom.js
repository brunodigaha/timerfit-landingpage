// Animated Header
$(function() {
  var shrinkHeader = 650;
  $(window).scroll(function() {
    var scroll = getCurrentScroll();
    if (scroll >= shrinkHeader) {
      $('.navbar-fixed-top').addClass('shrink-nav-fixed')
      $('.navbar-brand').addClass('shrink-nav-brand')
      $('.navbar-logo').addClass('shrink-nav-logo');
    } else {
      $('.navbar-fixed-top').removeClass('shrink-nav-fixed')
      $('.navbar-brand').removeClass('shrink-nav-brand')
      $('.navbar-logo').removeClass('shrink-nav-logo');
    }
  });

  function getCurrentScroll() {
    return window.pageYOffset;
  }
});

// Google Web Fonts
WebFontConfig = {
  google: {
    families: ['Roboto:400,100,100italic,300,300italic,500,400italic,500italic,700,700italic,900,900italic:latin']
  }
};
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();