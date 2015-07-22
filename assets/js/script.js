(function($){

    // Ok, we have js loaded
    $('html').removeClass('no-js')


    $('#primaryNav li').on('mouseenter mouseleave', function(e){
        var $this = $(this);
        var $subnav = $('ul', $this);

        if( $subnav.is(':animated') ) {
            return false;
        }

        $subnav.slideToggle();
        $this.toggleClass('active');

    });

    // Homepage hero slider
    $('.homepage.banner > div').bxSlider({
        controls : false,
        pager : false,
        auto : true,
        mode : 'fade',
        speed : 1000,
        randomStart : true
    });

})(jQuery);

(function($){

    // Call plugins only on the pages where the plugin is loaded
    if( typeof $.fn.validate === 'undefined') return false;

    var settings = {
        ignore : '.ignore, :hidden',
        errorElement : 'span',
    });

})(jQuery);

(function($){

    /*
    $('.terms').bPopup({
        content:'iframe', //'ajax', 'iframe' or 'image'
        contentContainer:'.content',
        loadUrl:'/terms/' //Uses jQuery.load()
    });
*/
    $('.terms').on('click', function(e){

        $(this).bPopup({
            content:'iframe', //'ajax', 'iframe' or 'image'
            contentContainer:'.content',
            loadUrl:'/terms/' //Uses jQuery.load()
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


(function($){

    var $template = $('.js-petTemplate');

    if( !$template.length ) {
        return false;
    }

    var $tpl = $template.html();
    var index = 0;
    var $wrapper = $('#petsBoxWrapper');
    var defaultAdded = 1;

    $template.remove();

    $(document).on('click', '.js-petAdd', function(){
        $wrapper.append( $tpl.replace('__COUNT__', ordinalInWord(index)) );
        index++;

        if( index > 9 ) {
            $(this).fadeOut();
            return false;
        }

        return false;
    });

    for( var i = 0; i < defaultAdded; i++ ) {
        $('.js-petAdd').trigger('click');
    }

})(jQuery);


function ordinalInWord( cardinal ) {
    var ordinals = [ 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth' ];
    return ordinals[cardinal];
}