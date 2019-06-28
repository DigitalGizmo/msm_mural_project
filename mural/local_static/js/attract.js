$(document).ready(function(){
  // -------- ATTRACT LOOP -----------
  // Yes, this is very verbose -- could be considerably refactored, but..
  // This is adapted from Mercy where images flew in all directions, and..
  // We may yet want to do that here, and..
  // Don't want to take the time to refactor!

  // touch anywhere to begin
  $(document).click(function() {
	window.location.href='/';
  });

  /* --- Attract loop animation --- */
  const photos = [$('#photo1'), $('#photo2'), $('#photo3'), 
    $('#photo4'), $('#photo5'), $('#photo6'), $('#photo7'), 
    $('#photo8'), $('#photo9'), $('#photo10'), $('#photo11')
    ];
  const touchTitle = $('#touch-title')
  var screenWidth = $(window).width();
  var offScreenRight = $(window).width() + 400;
  const speedFactor = 3;

  // first timeline inside setup() function
  function setup() {
    // instantiate timeline
    const tl = new TimelineMax();
    // set initial
    tl.set(photos[0], {autoAlpha: 0, yPercent:10, xPercent: -100})
      .set(photos[1], {autoAlpha: 0, yPercent:10, xPercent: -100})
      .set(photos[2], {autoAlpha: 0, yPercent:10, xPercent: -100})
      .set(photos[3], {autoAlpha: 0, yPercent:10, xPercent: -100})
      .set(photos[4], {autoAlpha: 0, yPercent:10, xPercent: -100})
      .set(photos[5], {autoAlpha: 0, yPercent:10, xPercent: -100})
      .set(photos[6], {autoAlpha: 0, yPercent:10, xPercent: -100})
      .set(photos[7], {autoAlpha: 0, yPercent:10, xPercent: -100})
      .set(photos[8], {autoAlpha: 0, yPercent:10, xPercent: -100})
      .set(photos[9], {autoAlpha: 0, yPercent:10, xPercent: -100})
      .set(photos[10], {autoAlpha: 0, yPercent:10, xPercent: -100})
      .set(touchTitle, {autoAlpha: 0})
      // .set(photo3, {autoAlpha: .1, y:100, x:screenWidth + photo3.width()}) 
      ;  
    // return timeline
    return tl;
  }

  function movePhoto(photoIndex, delaySecs, durationSecs) { //, forward
    var tl = new TimelineMax({delay:delaySecs}, 0);
    // start the positional tween at time of 0
    // x is left edge of photo
    // if (forward) {
      // tl.to(photos[photoIndex], (durationSecs/2), {autoAlpha:1, repeat:1, yoyo:true})
      //   .to(photos[photoIndex], durationSecs, {x:screenWidth, ease:Linear.easeNone}, 0);
    // } else {
      tl.to(photos[photoIndex], (durationSecs/2), {autoAlpha:1, repeat:1, yoyo:true})
        .from(photos[photoIndex], durationSecs, {x:offScreenRight, ease:Linear.easeNone}, 0);
    // }
    return tl;
  }

  function moveTitle(delaySecs, durationSecs) {
    var tl = new TimelineMax({delay:delaySecs, repeat:1}, 0); // , repeat:1 twice

    var rightEnd = $(window).width() - ($(window).width() * .6);
    console.log(" -- rightEnd: " + rightEnd);

    tl.to(touchTitle, (durationSecs/2), {autoAlpha:1, repeat:1, yoyo:true})
      .to(touchTitle, durationSecs, {x:rightEnd, ease:Linear.easeNone}, 0);

    return tl;
  }

  // instantiate master timeline
  var master = new TimelineMax({repeat:-1} );
  // nest and call functions with timelines
  // add labels for better master timeline control

  master.add(setup())
    // photoIndex, delaySecs, durationSecs, forward
    .add(moveTitle((0 * speedFactor), (12 * speedFactor)), 0)
    .add(movePhoto(0, (0 * speedFactor), (4 * speedFactor)), 0)  // , true
    .add(movePhoto(1, (2 * speedFactor), (4 * speedFactor)), 0)  // , true
    .add(movePhoto(2, (4 * speedFactor), (4 * speedFactor)), 0)  // , false
    .add(movePhoto(3, (6 * speedFactor), (4 * speedFactor)), 0)  // , true
    .add(movePhoto(4, (8 * speedFactor), (4 * speedFactor)), 0)  // , false
    .add(movePhoto(5, (10 * speedFactor), (4 * speedFactor)), 0) // , true
    .add(movePhoto(6, (12 * speedFactor), (4 * speedFactor)), 0) // , true
    .add(movePhoto(7, (14 * speedFactor), (4 * speedFactor)), 0) // , true
    .add(movePhoto(8, (16 * speedFactor), (4 * speedFactor)), 0) // , true
    .add(movePhoto(9, (18 * speedFactor), (4 * speedFactor)), 0) // , true
    .add(movePhoto(10, (20 * speedFactor), (4 * speedFactor)), 0) // , true
    ;

});
