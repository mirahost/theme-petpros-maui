(function($){

    // Ok, we have js loaded
    $('html').removeClass('no-js')

    // Homepage hero slider
    $('.homepage.banner > div').bxSlider({
        controls : false,
        pager : false,
        auto : true
    });

})(jQuery);


(function($){

    // Call plugins only on the pages where the plugin is loaded
    if( typeof $.fn.validate === 'undefined') return false;

    $('#petAdd').validate({
        ignore : '.ignore',
        errorElement : 'span'
    });

})(jQuery);

(function($){

    var $partnersSlider = $('.footer-links .slider');

    // Init partners slider after all images are loaded
    $(window).on('load', function(){
        var slideMaxWidth = 0;
        $('img', $partnersSlider).each(function(){
            var imgWidth = $(this).width();
            if( imgWidth > slideMaxWidth ) {
                slideMaxWidth = imgWidth;
            }
        })

        $partnersSlider.bxSlider({
            minSlides : 4,
            maxSlides : 6,
            controls : false,
            infiniteLoop : false,
            slideWidth : parseInt( slideMaxWidth, 10 )
        });
    });

})(jQuery);