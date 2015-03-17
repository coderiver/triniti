head.ready(function() {

    var win             = $(window);
    var body            = $('body');
    var header          = $('header');
    var slider          = $('.js-slick');
    var gallery         = $('.js-gallery');
    var gallerySlides   = gallery.children().length;
    var galleryCaptions = $('.js-gallery-captions');
    var form            = $('#form');

    if ( slider.length ) {
        slider.slick({
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            dots: true
        });
    }

    var galleryNavigation = function() {
        var prev           = $('.gallery__prev'),
            next           = $('.gallery__next'),
            slides         = $('.gallery__captions'),
            counterCurrent = $('.gallery__counter-current'),
            counterAll     = $('.gallery__counter-all');

        prev.on('click', function() {
            gallery.slick('slickPrev');
        });

        next.on('click', function() {
            gallery.slick('slickNext');
        });

        if ( gallerySlides < 10 ) {
            counterAll.text('0' + gallerySlides);
        } else {
            counterAll.text(gallerySlides);
        }

        gallery.on('afterChange', function(slick, currentSlide) {
            var index = gallery.slick('slickCurrentSlide');
            index = (index < 9) ? '0' + (++index) : ++index ;
            counterCurrent.text(index);
        });

    };

    if ( gallery.length ) {
        gallery.on('init', function(slick) {
            galleryNavigation();
        });

        gallery.slick({
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            dots: false,
            asNavFor: '.js-gallery-captions',
        });
    }

    if ( galleryCaptions.length ) {
        galleryCaptions.slick({
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            dots: false,
            swipe: false,
            draggable: false,
            asNavFor: '.js-gallery'
        });
    }


    var tabsFunc = function(containerSelector, tabSelector, tabContentSelector) {

        var container = $(containerSelector);

        if ( container.length ) {
            container.each(function() {
                var el           = $(this),
                    tab          = el.find(tabSelector),
                    content      = el.find(tabContentSelector),
                    activeClass  = 'is-active',
                    tabs         = [],
                    tabsContent  = [],
                    activeTab;

                //create associative array with tabs content as jQuery object
                content.each(function() {
                    var tabNumber = $(this).data('tab');
                    tabsContent[tabNumber] = $(this);
                });

                tab.each(function() {
                    var el        = $(this),
                        tabNumber = el.data('tab');

                    //create associative array with tabs as jQuery object
                    tabs[tabNumber] = el;

                    if ( el.hasClass(activeClass) ) {
                        activeTab = tabNumber;
                    }

                    el.on('click', function(event) {
                        event.preventDefault();

                        tabs[activeTab].removeClass(activeClass);
                        tabsContent[activeTab].removeClass(activeClass);

                        el.addClass(activeClass);
                        tabsContent[tabNumber].addClass(activeClass);

                        activeTab = tabNumber;
                    });
                });

                //if active tab is not defined then make first tab as active
                if ( !activeTab ) {
                    activeTab = 1;
                    tabs[activeTab].addClass(activeClass);
                    tabsContent[activeTab].addClass(activeClass);
                }
            });
        }

    };

    tabsFunc('.tabs', '.tabs__button', '.tabs__content');

    if ( form.length ) {
        // for form validation was used this jQuery plugin
        // http://lab.hasanaydogdu.com/validetta/
        form.validetta({
            onValid : function() {
                var msg = $('#form .form__success');
                var closeBtn = $('#form .form__close');
                msg.fadeIn(200);
                closeBtn.on('click', function(event) {
                    event.preventDefault();
                    msg.fadeOut('200');
                    form.find('input, textarea').val('');
                });
            },
            onError : function() {
                console.log('error');
            }
        });
    }

    // remove on production
    form.submit(function(event) {
        event.preventDefault();
        if (form.hasClass('is-success')) {
            alert('Succes! Need send request to server');
        }
    });

});