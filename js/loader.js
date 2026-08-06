var tl = new TimelineMax({ repeat: -1, repeatDelay: 0.01, yoyo: true });
tl.staggerTo(
  ".loader-text span",
  1.2,
  { color: "#C9A96E", scale: 1.05 },
  0.4
);
$(window).on('load', function() {
    $('#page-loader').delay(2000).fadeOut(1000, function() {
        $('body').removeClass('loading');
    });
});