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
    // console.log(" -- slim chosen_href: " + chosen_href);

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

    // Swap may have set the height, so reset to default here
    // $("#slimpop-container").css("max-height", "85%");

    slimPop(chosen_href, "learn-more");

  });

  // "document on" sytntax required since this markup may appear on
  // links loaded by ajax. (at least map dig deeper)
  // $(document).on("click", ".pop_item", function(event){

  // -- .swap_pop --
  // enable click event on slim that's already up
  // "document on" sytntax required since this the markup was loaded by ajax.
  // Separating event from swap action so that swipe can call swap
  $(document).on("click", ".swap_pop", function(event){
    event.preventDefault();
    // get href
    var chosen_href = $(event.target).attr('href');
    // console.log('swap chosen_href: ' + chosen_href);
    var nameAttrbute = $(event.target).attr('name');
    var goingForward = true;
    if ($(event.target).attr('id') == "swap_prev") {
      goingForward = false;
    }
    // legacy from impressions:
    // var href_split = chosen_href.split('/');    
    // var slimpopSizeClass = href_split[2]; 
    // resize contentDiv
    // contentDiv.removeClass().addClass("slimpop-basic").addClass(href_split[2]); 

    swap(chosen_href, nameAttrbute, goingForward);
  });

  // ------- PANEL SLIDE ------

  $(document).on("click", ".next", function(event){
    event.preventDefault();
    // get href
    var chosen_href = $(event.target).closest('a').attr('href');

    // console.log('-- swipe href: ' + chosen_href);
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
    $(".swipe-main").swipe( { fingers:'all', swipeLeft:swipe1, 
      swipeRight:swipe1, allowPageScroll:"auto"} );

    // panel to panel Swipe handlers.
    function swipe1(event, direction, distance, duration, fingerCount) {        
      // console.log("Ya'll swiped " + direction );
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
 
}); // end doc ready

function swap(chosen_href, nameAttrbute, goingForward) {
  // ----- Hack to make local swaps work 
  // See if we're in local static mode -- all urls end with .html
  // console.log(" last of href: " +  chosen_href.slice(-5));
  // console.log(" chosen_href: " +  chosen_href);
  if (chosen_href.slice(-5) == ".html") {
    // Link from sitesucker looks like: 2/index.html
    // needs to look like: ../../../pops/objects/ajax/10/2/index.html
    // But subsequent slide links are: ../2/index.html
    // so we need to strip that ../ , if present
    if (chosen_href.split('/')[0] == "..") {
      chosen_href = chosen_href.substring(3);
      // console.log(" -- chosen_href: " + chosen_href);    
    }
    var nameAttrbutes = nameAttrbute.split('/');
    // console.log(" -- type: " + nameAttrbutes[0] + " id: " + 
    // nameAttrbutes[1]);
    chosen_href = "../../../pops/" + nameAttrbutes[0] + 
      "/ajax/" + nameAttrbutes[1] + "/" + chosen_href;
    // console.log(" -- localHref: " + localHref);
    // ------ end Hack       
  }

  // If we use transition, div will be hard-wired in changeSlide
  var contentDiv = $('#slimpop-container');

  // call ajax for the slim pop. (without transition) 
  // getURL(chosen_href, contentDiv);

  // call slide transition 
  changeSlide(chosen_href, goingForward); // contentDiv, 

}

// ------- PANEL SLIDE HELPERS ------

function loadPage(url) {
  return fetch(url, {
    method: 'GET'
  }).then(function(response) {
    return response.text();
  });
}

// Full pannel transition
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

// Slideshow transition
function changeSlide(popUrl, goingForward) { // contentDiv,

  // console.log(" -- url in changePage: " + url);

  loadPage(popUrl).then(function(responseText) {

    // grab old content section
    // var oldContent = document.querySelector('.wrapper');
    // hard-wire to slimpop
    var oldContent = $(".slimpop-wrapper");  
    // console.log(" -- oldContent: " + oldContent.html()); // works

    // var wholeHtml = document.createElement('div');
    var wholeHtml = $(document.createElement('div'));

      // wholeHtml.innerHTML = responseText;
      wholeHtml.html(responseText);

      // console.log(" -- responseText: " + responseText);
      // console.log(" -- wholeHtml: " + wholeHtml.html()); // this works

    // var newContent = wholeHtml.querySelector('.wrapper');
    var newContent = wholeHtml.find(".slimpop-wrapper");

    // console.log(" -- newContent: " + newContent.html());

    // main.appendChild(newContent);
    $("#slimpop-container").append(newContent);

    animateSlide(oldContent, newContent, goingForward);
  });
}

// for full panel
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

// for pop box -- look for way to genearlize and combine with panel
function animateSlide(oldContent, newContent, goingForward) {

  // var goingForward = true;

  var position = oldContent.position();
  // $( "p:last" ).text( "left: " + position.left + ", top: " + position.top );

  // console.log(" - oldContent left: " + position.left + ", top: "+ position.top)

  TweenLite.set(newContent, {
    // visibility: 'visible',
    xPercent: goingForward ? 100 : -100,
    position: 'absolute',
    left: 0,
    top: 0
    // right: 100
  });

  TweenMax.to(oldContent, .6, {xPercent: goingForward ? -100 : 100 } );
  // TweenMax.to(newContent, 2, {xPercent: 0, ease:Linear.easeNone} );

  // TweenLite.to(newContent, .6, { xPercent: 0, onComplete: function() {
  //   oldContent.remove();
  // }});


  // Customize to remove only first
  TweenLite.to(newContent, .6, { xPercent: 0, onComplete: function() {
    $("#slimpop-container").find(".slimpop-wrapper").first().remove();
  }});


  // Adjust height of #slimpop-container



  // Need image height separately
  var imgHeight = $("#slimpop-container").find("img").height();

  // console.log(" -- img height: " + imgHeight);
  // console.log(" -- newContent height: " + newContent.height());
  // console.log(" -- (css height: )" + newContent.css("height"));
  // console.log(" -- newContent height  + imgHeight: " + 
  //   (newContent.height()  + imgHeight)); //+ 84 + 84

  // fudge factor is for height of margins etc., beyond content
  $("#slimpop-container").height(newContent.height() + 84 + imgHeight); // + 84
  // using css heigh only
  // $("#slimpop-container").height(newContent.css("height")); // + 84

  // console.log(" -- (after- slim container css height: )" + $("#slimpop-container").css("height"));
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

    // add swipe for slideshow pops
    $(function() {
      $("#slimpop-container").swipe( { fingers:'all', swipeLeft:swipe2, 
        swipeRight:swipe2, allowPageScroll:"auto"} );

      //Swipe handlers.
      function swipe2(event, direction, distance, duration, fingerCount) {        
        console.log("Swipe in pop " + direction );
        // are we in a slideshow?
        if ($(".slide-nav").length > 0) {
          // console.log("-- there is a slide-nav ");
          if(direction == "left") {
            // get the name and href for next
            var chosen_href = $("#swap_next").attr('href');
            // console.log(" chosen_href in swipe2: " + chosen_href)
            // if (chosen_href.length > 0) {
            if (chosen_href != undefined) {
              var nameAttrbute = $("#swap_next").attr('name');
              // 3dr param, goingForward
              swap(chosen_href, nameAttrbute, true);        
            }
          } else if (direction == "right") {
            var chosen_href = $("#swap_prev").attr('href');
            if (chosen_href != undefined) {
              var nameAttrbute = $("#swap_prev").attr('name');
              swap(chosen_href, nameAttrbute, false);        
            }
          }

        } // end if slide-nav
      } // end function

  });


  } else { // clear the container -- otherwise previous content flashes by
    $('#slimpop-overlay').html = " ";
  }
  // unhide overlay
  $('#slimpop-overlay').removeClass().addClass('unhidden');
  // assign contentDiv for further use
  var contentDiv = $('#slimpop-container');
  // contentDiv will be unhidden by specific classes 
  // contentDiv.removeClass().addClass("slimpop-basic");
  // Now trying without slimpop basic, so removeClass will just remove hidden 
  contentDiv.removeClass().addClass("unhidden");
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

    // -- reset to default -- mayb have been set to specific size by slieshow
    contentDiv.css('height', '');
    contentDiv.css('max-height', '85%');

  }).fail(function(jqXHR) {
    contentDiv.html('<div class="slimpop-wrapper">' + '<p>SlimPop error: ' + 
      jqXHR.status + '</p></div>')
    .append(jqXHR.responseText);
  });
}
