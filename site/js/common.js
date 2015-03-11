head.ready(function() {

    var body   = $('body');
    var header = $('header');
    var win    = $(window);
    var slider = $('.js-slick');

    if ( slider.length ) {
        slider.slick({
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            dots: true
        });
    }

});