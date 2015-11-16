$(function(){

    /* Owl Slider */
    $(function() {
        if( $(".index_slider .owl-carousel").is("div") ){

            var owl =  $('.index_slider .owl-carousel');

            owl.owlCarousel({
                singleItem : true,
                autoPlay : 12000,
                stopOnHover : true,
                navigation: true,
                responsiveBaseWidth: '.index_slider .owl-carousel',
                transitionStyle : "backSlide"
            });

            owl.find('.owl-controls .owl-buttons .owl-prev').attr('title', 'Предыдущий');
            owl.find('.owl-controls .owl-buttons .owl-next').attr('title', 'Следующий');

            // Custom Navigation Events
//                    owl.parent().find(".to_right").click(function(){
//                        owl.trigger('owl.next');
//                    });
//
//                    owl.parent().find(".to_left").click(function(){
//                        owl.trigger('owl.prev');
//                    })

        }
    });
    $(function() {
        if( $(".carousel_slider .owl-carousel").is("div") ){

            var owl =  $('.carousel_slider .owl-carousel'),
                carouselNext = owl.parent().parent().find(".to_right"),
                carouselPrev = owl.parent().parent().find(".to_left");

            owl.owlCarousel({
                items : 5,
                autoPlay : 12000,
                stopOnHover : true,
                responsiveBaseWidth: '.carousel_slider .owl-carousel',
                pagination: false,
                afterAction: function(){
                    if ( this.itemsAmount > this.visibleItems.length ) {
                        $(carouselNext).show();
                        $(carouselPrev).show();

                        $(carouselNext).removeClass('disabled');
                        $(carouselPrev).removeClass('disabled');
                        if ( this.currentItem == 0 ) {
                            $(carouselPrev).addClass('disabled');
                        }
                        if ( this.currentItem == this.maximumItem ) {
                            $(carouselNext).addClass('disabled');
                        }

                    } else {
                        $(carouselNext).hide();
                        $(carouselPrev).hide();
                    }
                }
            });

            // Custom Navigation Events
            carouselNext.click(function(){
                owl.trigger('owl.next');
            });

            carouselPrev.click(function(){
                owl.trigger('owl.prev');
            })

        }
    });
    /* /Owl Slider */


    /* SYNCED Owl Slider */
    if( $(".synced_slider1 .owl-carousel").is("div") ) {

        var sync1 = $(".synced_slider1 .owl-carousel"),
            sync2 = $(".synced_slider2 .owl-carousel"),
            carouselNext = sync2.parent().parent().find(".to_right"),
            carouselPrev = sync2.parent().parent().find(".to_left");

        sync1.owlCarousel({
            singleItem: true,
            autoPlay : 12000,
            stopOnHover : true,
            slideSpeed: 1000,
            navigation: false,
            pagination: false,
            afterAction: syncPosition,
            responsiveRefreshRate: 200,
            touchDrag: false,
            mouseDrag : false

        });

        sync2.owlCarousel({
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 3],
            itemsMobile: [479, 2],
            pagination: false,
            responsiveRefreshRate: 100,
            afterInit: function (el) {
                el.find(".owl-item").eq(0).addClass("synced");
            },
            afterAction: function(){
                if ( this.itemsAmount > this.visibleItems.length ) {
                    $(carouselNext).show();
                    $(carouselPrev).show();

                    $(carouselNext).removeClass('disabled');
                    $(carouselPrev).removeClass('disabled');
                    if ( this.currentItem == 0 ) {
                        $(carouselPrev).addClass('disabled');
                    }
                    if ( this.currentItem == this.maximumItem ) {
                        $(carouselNext).addClass('disabled');
                    }

                } else {
                    $(carouselNext).hide();
                    $(carouselPrev).hide();
                }
            }
        });

        $(".synced_slider2 .owl-carousel").on("click", ".owl-item", function (e) {
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo", number);
        });

        // Custom Navigation Events
        carouselNext.click(function(){
            sync2.trigger('owl.next');
        });

        carouselPrev.click(function(){
            sync2.trigger('owl.prev');
        })

    }

    function syncPosition(el) {
        var current = this.currentItem;
        $(".synced_slider2 .owl-carousel")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced");
        if ($(".synced_slider2 .owl-carousel").data("owlCarousel") !== undefined) {
            center(current)
        }
    }

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                found = true;
            }
        }

        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
        }

    }
    /* /SYNCED Owl Slider */

}); // END READY
