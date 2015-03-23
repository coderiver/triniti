head.ready(function() {

    var win             = $(window),
        doc             = $(document),
        body            = $('body'),
        header          = $('header'),
        slider          = $('.js-slick'),
        gallery         = $('.js-gallery'),
        gallerySlides   = gallery.children().length,
        galleryCaptions = $('.js-gallery-captions'),
        form            = $('#form'),
        logo            = $('.header__logo'),
        contactButton   = $('.header__button-inner'),
        scrollPosition  = win.scrollTop();


    var whatLogo = function() {
        if ( doc.width() <= 1260 ) {
            logo
                .removeClass('is-fixed')
                .addClass('is-small');
        } else {
            logo.removeClass('is-small');
        }
    };

    win.on('resize', function() {
        whatLogo();
    });

    var makeElementsFixed = function() {
        if ( !logo.hasClass('is-fixed') && !logo.hasClass('is-small') ) {
            logo.addClass('is-fixed');
        }

        if ( !contactButton.hasClass('is-fixed') ) {
            contactButton.addClass('is-fixed');
        }
    };

    var makeElementsStatic = function() {
        if ( logo.hasClass('is-fixed') ) {
            logo.removeClass('is-fixed');
        }

        if ( contactButton.hasClass('is-fixed') ) {
            contactButton.removeClass('is-fixed');
        }
    };

    if ( scrollPosition > 180 ) {
        makeElementsFixed();
    }

    if ( scrollPosition < 180 ) {
        makeElementsStatic();
    }

    win.on('scroll', function(event) {
        scrollPosition = win.scrollTop();

        if ( scrollPosition > 180 ) {
            makeElementsFixed();
        }

        if ( scrollPosition < 180 ) {
            makeElementsStatic();
        }
    });

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
            errorClass : 'is-error',
            validClass : 'is-success',
            realTime : true,
            custom : {
                phone : {
                    // pattern: /^((((\(\d{3}\))|(\d{3}-))\d{3}-\d{4})|(\+?\d{1,3}((-| |\.)(\(\d{1,4}\)(-| |\.|^)?)?\d{1,8}){1,5}))(( )?(x|ext)\d{1,5}){0,1}$/,
                    pattern: /^[-0-9()+ ]+$/,
                    errorMessage : 'Phone number is not valid!'
                }
            },
            onValid : function(event) {
                // prevent default event when submit
                event.preventDefault();
                alert('Succes! Need send request to server');

                var msg = $('#form .form__success');
                var closeBtn = $('#form .form__refresh');
                msg.fadeIn(200);
                closeBtn.on('click', function(event) {
                    event.preventDefault();
                    msg.fadeOut('200');
                    form.find('input, textarea').val('').trigger('blur');
                });
            },
            onError : function() {
                console.log('Form validation error');
            }
        });
    }

    // // remove on production
    // form.submit(function(event) {
    //     event.preventDefault();
    //     if ( form.hasClass('is-success') ) {
    //         alert('Succes! Need send request to server');
    //     }
    // });


    $('.animation').each(function() {
        var el    = $(this),
            elTop;

            if ( el.hasClass('left-top') ||
                 el.hasClass('right-top') ||
                 el.hasClass('top')) {
                elTop = el.offset().top + 100;
            }
            else if ( el.hasClass('left-bottom') ||
                      el.hasClass('right-bottom') ||
                      el.hasClass('bottom')) {
                elTop = el.offset().top - 100;
            }
            else {
                elTop = el.offset().top;
            }

            if ( scrollPosition + win.height() >= elTop ) {
                el.addClass('done');
            }

            win.on('scroll', function() {
                if ( scrollPosition + win.height() >= elTop ) {
                    el.addClass('done');
                }
            });

    });

});