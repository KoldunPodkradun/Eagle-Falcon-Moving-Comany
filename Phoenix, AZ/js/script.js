/*about-item animation*/

$(document).ready(function($) {
    var windowEl = $(window);
    var windowW = windowEl.width();

    $('.reviews-slider').slick({
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

    if (windowW < 1050) {
        $('.works-items').slick({
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

    if (windowW < 991) {
        $('.about-items').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
        });
    }



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