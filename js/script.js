$(document).ready(function($) {
    var windowEl = $(window);
    var windowW = windowEl.width();
    var beforeWidth = $(this).width();



    $('.reviews-slider').not('.slick-initialized').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: $('.reviews-arrow-prev'),
        nextArrow: $('.reviews-arrow-next'),
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
            }
        }, ]
    });

    function sliderOne() {
        $('.works-items').not('.slick-initialized').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                    }
                }
            ]
        });
    };

    function sliderTwo() {
        $('.about-items').not('.slick-initialized').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
        });
    };

    if (windowW < 1050) {
        sliderOne();
    };


    if (windowW < 991) {
        sliderTwo();
    };

    // resize slider
    var counter = 0;
    var counterTwo = 0;
    var i = 0;
    var j = 0;

    $(window).on('resize orientationchange', function(event) {
        var windowEl = $('body');
        var windowW = windowEl.width();

        if (windowW < 1050) {
            counter++
            if (counter == 1) {
                sliderOne();
                i = 1;
                counter = 0;
            }
        } else if (windowW >= 1050 && i == 1) {
            $('.works-item').removeAttr('id aria-describedby tabindex role');
            setTimeout(function() {
                $('.works-items').slick('unslick');
            }, 500);
            counter = 0;
            i = 0;
        };

        if (windowW < 991) {
            counterTwo++
            if (counterTwo == 1) {
                sliderTwo();
                j = 1;
                counterTwo = 0;
            }
        } else if (windowW >= 991 && j == 1) {
            $('.about-item').removeAttr('id aria-describedby tabindex role');
            setTimeout(function() {
                $('.about-items').slick('unslick');
            }, 500);
            counterTwo = 0;
            j = 0;
        };
    });

    //smooth anchor

    $(".header-menu, .logo, .footer-logo").on("click", "a", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 500);
        $('.header-menu-wrapp').removeClass('open-menu');
        $('.hamburger').removeClass('close-menu');
        return false;

    });

    //fix menu

    var lastScrollTop = 0;
    $(window).scroll(function() {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            $('#header').addClass('header-fix');
        } else {
            $('#header').removeClass('header-fix');
        }
    });

    //open and close menu

    $('.hamburger').on('click', function() {
        $('.header-menu-wrapp').toggleClass('open-menu');
        return false;
    });

    $('.header-cross').on('click', function() {
        $('.header-menu-wrapp').removeClass('open-menu');
        return false;
    });

    $('.home-button, .header-contact-button, .free-quote-button').on('click', function() {
        $('.popup-wrapp').addClass('open-popup');
        return false;
    });

    $('.popup-cross').on('click', function() {
        $('.popup-wrapp').removeClass('open-popup');
        return false;
    });

    $('.popup-succes-cross').on('click', function() {
        $('.popup-succes-wrapp').removeClass('open-popup');
        return false;
    });

    /*Динамическая подсветка пунктов меню*/

    $(window).scroll(function() {
        $('.magic').each(function() {
            var window_top = $(window).scrollTop();
            var div_top = $(this).offset().top;
            var div_1 = $(this).attr('id');
            if (window_top > div_top - 120) {
                $('.header-menu').find('li').removeClass('menu-active');
                $('.header-menu').find('li[class="' + div_1 + '"]').addClass('menu-active');
            } else {
                $('.header-menu').find('li[class="' + div_1 + '"]').removeClass('menu-active');
            };
        });
    });

    /*календарь*/

    $(document).ready(function($) {
        var currentDate = new Date();
        $('.contact-send-data').datepicker({
            dateFormat: 'mm-dd-yy',
            minDate: currentDate,
            onSelect: function(dateText) {
                $('.contact-send-data').val(dateText);
            }
        });
    });

    //form

    $('form').submit(function(e) {
        var thisForm = $(this);
        var form = $('form');
        var submitBtn = thisForm.find('input[type="submit"]');
        var data = new FormData(thisForm[0]);
        submitBtn.prop("disabled", true);
        $.ajax({
            url: 'mail.php',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            type: 'POST',
            success: function(data) {
                thisForm[0].reset();
                form[0].reset();
                submitBtn.prop("disabled", false);
                $('.popup-succes-wrapp').addClass('open-popup');
                $(dataLayer.push({ 'event': 'event_lendos' }));
            },
            error: function() {
                alert('Something went wrong!');
                submitBtn.prop("disabled", false);
            }
        });
        e.preventDefault();
    });

    /*передает данные о локации, услугах и дате в форму*/
    $(document).ready(function($) {

        $('.home-button').on("click", function(event) {
            var home_from = $(".home-from").val();
            var home_to = $(".home-to").val();
            var pop_up_moving_from = $(".pop-up-moving-from");
            var pop_up_moving_to = $(".pop-up-moving-to");
            pop_up_moving_from.val(home_from);
            pop_up_moving_to.val(home_to);
        });
    });

    /*.advantages opened*/
    $(document).ready(function($) {
        var thisEl = $(this);
        var thisH = thisEl.outerHeight();
        $('.advantages-item-descr').click(function() {
            $(this).toggleClass('opened', 300);
            $(this).children('.advantages-item-descr-arrow').toggleClass('transform')
        });
    });
});

/*цвет гамбургера при скролле*/
$(window).scroll(function() {
    var scr = $(this).scrollTop();
    var about = $('#about').offset();
    if (scr >= about['top']) {
        $('.hamburger').addClass('hamburger-fix', 300);
    } else {
        $('.hamburger').removeClass('hamburger-fix', 300);
    }
});