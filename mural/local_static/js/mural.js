$(document).ready(function(){

  // ------- SLIM POPS ------

  // -- .pop_item --
  // enable click event on menu items and text links

  // $(".pop_item").click(function(event){ // .mobile
  // $(".pop_item").on("click touchstart", function(event){
  $(document).on("click", ".pop_item", function(event){

    console.log(" -- got to pop item: ");
    
    // console.log("--- got to pop_item");
    event.preventDefault();
    // get href
    // use closest -- target may be image in dig deeper gallery
    var chosen_href = $(event.target).closest('a').attr('href');
    console.log(" -- slim chosen_href: " + chosen_href);

    // the following from Impressions for variable slim pop sizes
    // var href_split = chosen_href.split('/');    
    // // href_split[2] = person, evidence, fastfact, special
    // var slimpopSizeClass = href_split[2];
    // console.log(" -- slim class size: " + slimpopSizeClass);
    // console.log(" -- href_split length: " + href_split.length);
    // slimPop(ajaxHref, slimpopSizeClass);  

    // Because of swipe-detect we need to reset so that click on pop
    // doesn't count as release of a swipe
    // Hmm, doesn't work
    // $(".swipe-main").swipeDetector().reset();

    slimPop(chosen_href, "learn-more");

  });

  // "document on" sytntax required since this markup may appear on
  // links loaded by ajax. (at least map dig deeper)
  // $(document).on("click", ".pop_item", function(event){

  // -- .swap_pop --
  // enable click event on slim that's already up
  // "document on" sytntax required since this the markup was loaded by ajax.
  $(document).on("click", ".swap_pop", function(event){
    event.preventDefault();
    // get href
    var chosen_href = $(event.target).attr('href');
    console.log('swap chosen_href: ' + chosen_href);
    // var href_split = chosen_href.split('/');    
    // var slimpopSizeClass = href_split[2];
    // BTW supporting/base_detail_full also has slimpop-wrapper
    var contentDiv = $('#slimpop-container');
    // resize contentDiv
    // contentDiv.removeClass().addClass("slimpop-basic").addClass(href_split[2]); 
    // call ajax for the slim pop. 
    getURL(chosen_href, contentDiv);
  });

  // ------- PANEL SLIDE ------

  $(document).on("click", ".next", function(event){
    event.preventDefault();
    // get href
    var chosen_href = $(event.target).closest('a').attr('href');

    console.log('-- swipe href: ' + chosen_href);
    // change url
    history.pushState(null, null, chosen_href);
    // goingForward = true
    changePage(true);
  });

  $(document).on("click", ".prev", function(event){
    event.preventDefault();
    var chosen_href = $(event.target).closest('a').attr('href');
    history.pushState(null, null, chosen_href);
    changePage(false);
  });

  // ---- TOUCH-SWIPE ----


  $(function() {
    $(".swipe-main").swipe( { fingers:'all', swipeLeft:swipe1, swipeRight:swipe1, allowPageScroll:"auto"} );
    // $("#test2").swipe( { swipeLeft:swipe1, allowPageScroll:"none"} );
    // $("#test3").swipe( { swipeLeft:swipe2, swipeRight:swipe2} );
    // $("#test4").swipe( { swipeStatus:swipe2, allowPageScroll:"vertical"} );
    // // $("#test5").swipe( { swipeStatus:swipe2, allowPageScroll:"horizontal" } );
    // $("#test6").swipe( { pinchStatus:pinch, allowPageScroll:"vertical" } );

    //Swipe handlers.
    function swipe1(event, direction, distance, duration, fingerCount) {        console.log("Ya'll swiped " + direction );
        // $(".next").text("You swiped " + direction );
        if(direction == "left") {
          // get the element and href for next
          var url = $(".next").attr('href');
          // per mural.js changePage depends on updated url
          if (url !== undefined) {
            history.pushState(null, null, url);
            changePage(true);       
          }
        } else if (direction == "right") {
          var url = $(".prev").attr('href');
          // console.log(" -- swipe url: " + url);
          if (url !== undefined) {
            history.pushState(null, null, url);
            changePage(false);       
          }          
        }
    }

  });



  // $(function() {      
  //   //Enable swiping...
  //   $(".swipe-main").swipe( {
  //     //Generic swipe handler for all directions
  //     swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
  //       console.log("Ya'll swiped " + direction );
  //       // $(".next").text("You swiped " + direction );
  //       if(direction == "left") {
  //         // get the element and href for next
  //         var url = $(".next").attr('href');
  //         // per mural.js changePage depends on updated url
  //         if (url !== undefined) {
  //           history.pushState(null, null, url);
  //           changePage(true);       
  //         }
  //       } else if (direction == "right") {
  //         var url = $(".prev").attr('href');
  //         // console.log(" -- swipe url: " + url);
  //         if (url !== undefined) {
  //           history.pushState(null, null, url);
  //           changePage(false);       
  //         }          
  //       }
  //     },
  //     //Default is 75px, set to 0 for demo so any distance triggers swipe
  //      threshold:40
  //   });
  // });

}); // end doc ready

// ------- PANEL SLIDE HELPERS ------

function loadPage(url) {
  return fetch(url, {
    method: 'GET'
  }).then(function(response) {
    return response.text();
  });
}

var main = $(".swipe-main");
// var main = document.querySelector('main');

function changePage(goingForward) {

  // Note, the URL has already been changed
  var url = window.location.href;

  // console.log(" -- url in changePage: " + url);

  loadPage(url).then(function(responseText) {

    // grab old content section
    // var oldContent = document.querySelector('.wrapper');
    var oldContent = $('.wrapper');  
    // console.log(" -- oldContent: " + oldContent.html()); // works

    // var wholeHtml = document.createElement('div');
    var wholeHtml = $(document.createElement('div'));

      // wholeHtml.innerHTML = responseText;
      wholeHtml.html(responseText);

      // console.log(" -- responseText: " + responseText);
      // console.log(" -- wholeHtml: " + wholeHtml.html()); // this works

    // var newContent = wholeHtml.querySelector('.wrapper');
    var newContent = wholeHtml.find(".wrapper");

    // console.log(" -- newContent: " + newContent.html());

    // main.appendChild(newContent);
    $(".swipe-main").append(newContent);

    animate(oldContent, newContent, goingForward);
  });
}

function animate(oldContent, newContent, goingForward) {

  // var goingForward = true;

  TweenLite.set(newContent, {
    visibility: 'visible',
    xPercent: goingForward ? 100 : -100,
    position: 'fixed',
    left: 8,
    top: 8,
    right: 8
  });

  TweenMax.to(oldContent, .6, {xPercent: goingForward ? -100 : 100 } );
  // TweenMax.to(newContent, 2, {xPercent: 0, ease:Linear.easeNone} );

  TweenLite.to(newContent, .6, { xPercent: 0, onComplete: function() {
    oldContent.remove();
  }});
}

/* 
*  used by popBox() and..
*/
function slimPop(theURL, sizeClass) { 
  // append divs if not present
  if (!$('#slimpop-overlay').length > 0) { // overlay html doesn't exist
    //create HTML markup for lightbox window
    var slimpopOverlay = 
    '<div id="slimpop-overlay" class="hidden"></div>' +
    '<div id="slimpop-container" class="hidden"></div>';
    //insert lightbox HTML into page
    $('body').append(slimpopOverlay);
    // assign close click to overlay
    $('#slimpop-overlay').click(function(event){
      hideBox();    
    });
  } else { // clear the container -- otherwise previous content flashes by
    $('#slimpop-overlay').html = " ";
  }
  // unhide overlay
  $('#slimpop-overlay').removeClass().addClass('unhidden');
  // assign contentDiv for further use
  var contentDiv = $('#slimpop-container');
  // contentDiv will be unhidden by specific classes 
  contentDiv.removeClass().addClass("slimpop-basic"); 
  //contentDiv.removeClass().addClass("slimpop-basic").addClass(sizeClass); 
  // call Ajax
  getURL(theURL, contentDiv);
}

/* simple hide called by Close link in box, and by hideOverlay, below.
*/
function hideBox() {
  // test for existence of audioPlayer element 
  if ($('audio')) {
    $('audio').trigger("pause");
  }
  if ($('video')) {
    $('video').trigger("pause");
  }
  var contentDiv = $('#slimpop-container');
  // empty content div so it won't briefly show old content on new pop
  contentDiv.html = " ";  
  // hide box.. 
  contentDiv.removeClass().addClass('hidden');
  // ..and darkening overlay
  $('#slimpop-overlay').removeClass().addClass('hidden');

}

// ----------- AJAX ----------

// jQuery Ajax
function getURL(theURL, contentDiv) {
  //contentDiv.load(theURL);
  // using .get instead of .load so that I can catch errors, especially 404
  // requestData,?
  $.get(theURL, function(data) {  
    contentDiv.html(data);
    // console.log("--- attr name: " + contentDiv.attr('id'));
    // make sure we're scrolled to the top
    // in the case of full screen (mobile) the scroll has to operate on 
    // the whole windo
    if (contentDiv.attr('id') == 'fullpop_content_wrapper') {
      $(window).scrollTop( 0 );
    } else {
      contentDiv.animate({ scrollTop: 0 }, 0);    
    }
    // following callback wasn't needed since we're operating on the window.
    // contentDiv.html(data).promise().done(function(){
    //   // console.log(" -- success for html")
    //   // scrollTop works on window, not div
    //   $(window).scrollTop( 0 );
    // });
  }).fail(function(jqXHR) {
    contentDiv.html('<div id="slimpop-wrapper">' + '<p>SlimPop error: ' + 
      jqXHR.status + '</p></div>')
    .append(jqXHR.responseText);
  });
}
