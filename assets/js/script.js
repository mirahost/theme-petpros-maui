(function($){

    var $window = $(window);

    // Ok, we have js loaded
    $('html').removeClass('no-js')


    $('#primaryNav li').on('mouseenter mouseleave', function(e){
        var $this = $(this);
        var $subnav = $('ul', $this);

        if( $window.width() < 750 ) {
            return false;
        }

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

    // Validator
    var validatorSettings = {
        ignore : '.ignore, :hidden',
        errorElement : 'span',
        submitHandler : function( $form ){
            $form.submit();
        }
    }

    $.validator.addMethod('notEmpty', function( value, element ){
        return value !== -1;
    }, $.validator.messages.required );

    if( $('#agreementForm').length )
        $('#agreementForm').validate( validatorSettings );

    if ( $('#contactForm').length )
        $('#contactForm').validate( validatorSettings );


    // Partners slider
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
            maxSlides : 4,
            controls : false,
            infiniteLoop : false,
            slideWidth : parseInt( slideMaxWidth + 1, 8 )
        });
    });


    // Billing sync fields
    var fields = {
        'street_address' : 'billing_street_address',
        'city' : 'billing_city',
        'zip' : 'billing_zip'
    };

    $('.js-addressSync').on('click', function(){
        $.each(fields, function( base, billing ){
            var $base = $('input[name="' + base + '"]');
            var $billing = $('input[name="' + billing + '"]');

            if( !$base.length || !$billing.length || $billing.val() !== '' ) return true;

            $billing.val( $base.val() );
        })
    });

    // Modal defaults update
    $.modal.defaults = {
        overlay: "#000",
        opacity: 0.5,
        zIndex: 99,
        escapeClose: true,
        clickClose: true,
        closeText: "&#10006;",
        closeClass: '',
        showClose: true,
        modalClass: "modal",
        spinnerHtml: null,
        showSpinner: false,
        fadeDuration: null,
        fadeDelay: 1.0
    };


    // Custom checkboxes
    var labelSettings = {
        force_random_id : true,
        label : false
    };

    $(':radio, :checkbox').labelauty( labelSettings );

    $('#petsBoxWrapper').on('boxAdded', function(){
        $(':radio:not(".labelauty"), :checkbox:not(".labelauty")').labelauty( labelSettings );
    })

})(jQuery);


(function($){

    var $wrapper = $('.szAccordion');
    var $heading = $('h2', $wrapper);
    var $content = $heading.nextUntil('h2');

    $content.hide();

    $heading.on('click', function(){
        var $this = $(this)
        var $content = $this.nextUntil('h2');

        $this.toggleClass('opened');
        $content.slideToggle();

    });

})(jQuery);

(function($){

    // Add pet
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

        $wrapper.trigger('boxAdded');
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