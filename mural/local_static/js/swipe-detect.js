(function($) {
  $.fn.swipeDetector = function(options) {
    // States: 0 - no swipe, 1 - swipe started, 2 - swipe released
    var swipeState = 0;
    // Coordinates when swipe started
    var startX = 0;
    var startY = 0;
    // Distance of swipe
    var pixelOffsetX = 0;
    var pixelOffsetY = 0;
    // Target element which should detect swipes.
    var swipeTarget = this;
    // We want to ignore clicks on slim-pops, so target panel sepcifically
    // Hmm, doesn't help, since the initial click is still "legal"
    // var swipeTarget = $(".swipe-main");

    var defaultSettings = {
      // Amount of pixels, when swipe don't count.
      swipeThreshold: 70,
      // Flag that indicates that plugin should react only on touch events.
      // Not on mouse events too.
      // useOnlyTouch: false
      // need true, Otherwise separate mouse clicks trigger swipe
      useOnlyTouch: true
    };

    // Initializer
    (function init() {
      options = $.extend(defaultSettings, options);
      // Support touch and mouse as well.
      swipeTarget.on("mousedown touchstart", swipeStart);
      $("html").on("mouseup touchend", swipeEnd);
      $("html").on("mousemove touchmove", swiping);
    })();

    function swipeStart(event) {
      if (options.useOnlyTouch && !event.originalEvent.touches) return;

      if (event.originalEvent.touches) event = event.originalEvent.touches[0];

      // Need to ignore touches on slim-pops
      // if (swipeState === 0) {
      if (swipeState === 0 && !$(event.target).closest("#slimpop-container").length) {
        swipeState = 1;
        startX = event.clientX;
        startY = event.clientY;
      }
    }

    function swipeEnd(event) {

      // if (swipeState === 2) {

      // need to catch and stop the case where the click was on a slim-pop
      if ($(event.target).closest("#slimpop-container").length) {
        console.log(" -- slimpop-container was found");
        // need to set swipe state to 0, otherwise click
        swipeState = 0;
      } else if (swipeState === 2) {
        swipeState = 0;

        if (
          Math.abs(pixelOffsetX) > Math.abs(pixelOffsetY) &&
          Math.abs(pixelOffsetX) > options.swipeThreshold
        ) {
          // Horizontal Swipe
          if (pixelOffsetX < 0) {
            swipeTarget.trigger($.Event("swipeLeft.sd"));
            console.log("Left");
          } else {
            swipeTarget.trigger($.Event("swipeRight.sd"));
            console.log("Right");
          }
        } else if (Math.abs(pixelOffsetY) > options.swipeThreshold) {
          // Vertical swipe
          if (pixelOffsetY < 0) {
            swipeTarget.trigger($.Event("swipeUp.sd"));
            console.log("Up");
          } else {
            swipeTarget.trigger($.Event("swipeDown.sd"));
            console.log("Down");
          }
        }
      }
    }

    function swiping(event) {
      // If swipe don't occuring, do nothing.
      if (swipeState !== 1) return;

      if (event.originalEvent.touches) {
        event = event.originalEvent.touches[0];
      }

      var swipeOffsetX = event.clientX - startX;
      var swipeOffsetY = event.clientY - startY;

      if (
        Math.abs(swipeOffsetX) > options.swipeThreshold ||
        Math.abs(swipeOffsetY) > options.swipeThreshold
      ) {
        swipeState = 2;
        pixelOffsetX = swipeOffsetX;
        pixelOffsetY = swipeOffsetY;
      }
    }

    // Create reset so that click on slim-pop doesn't count and swipe end
    function reset() {
      swipeState = 0;
    }

    return swipeTarget; // Return element available for chaining.
  };
})(jQuery);

// Showcase
$("document").ready(function() {
  $(".swipe-main")
    .swipeDetector()
    .on("swipeLeft.sd swipeRight.sd swipeUp.sd swipeDown.sd", function(event) {
      if (event.type === "swipeLeft") {
        // get the element and href for next
        var url = $(".next").attr('href');
        // per mural.js changePage depends on updated url
        if (url !== undefined) {
          history.pushState(null, null, url);
          changePage(true);       
        }
      } else if (event.type === "swipeRight") {
        var url = $(".prev").attr('href');
        console.log(" -- swipe url: " + url);
        if (url !== undefined) {
          history.pushState(null, null, url);
          changePage(false);       
        }
      } else if (event.type === "swipeUp") {
        // message.text("Swipe Up");
      } else if (event.type === "swipeDown") {
        // message.text("Swipe Down");
      }
    });
});
