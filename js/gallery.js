// Project Image Hover
$(".project-image-box").hover(
  function() {
    $(this).find(".project-overlay").animate({opacity: 1}, 600);
  },
  function() {
    $(this).find(".project-overlay").animate({opacity: 0}, 600);
  }
);


// Lightbox
var $overlay = $('<div id="vault-overlay"></div>');
var $image = $("<img>");

var $prevButton =
$('<div id="vault-prevButton"><i class="fa fa-chevron-left"></i></div>');

var $nextButton =
$('<div id="vault-nextButton"><i class="fa fa-chevron-right"></i></div>');

var $exitButton =
$('<div id="vault-exitButton"><i class="fa fa-times"></i></div>');


// Add Overlay
$overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
$("#vault-gallery").append($overlay);


// Hide Overlay Initially
$overlay.hide();


// Open Lightbox
$(".project-overlay").click(function(event) {

  event.preventDefault();

  var imageLocation =
  $(this).prev("a").attr("href");

  $image.attr("src", imageLocation);

  $overlay.fadeIn("slow");

});


// Close Lightbox
$overlay.click(function() {
  $(this).fadeOut("slow");
});


// Next Image
$nextButton.click(function(event) {

  $("#vault-overlay img").hide();

  var currentImgSrc =
  $("#vault-overlay img").attr("src");

  var currentImg =
  $('#vault-gallery img[src="' + currentImgSrc + '"]');

  var nextImg =
  $(
    currentImg
      .closest(".project-card")
      .next()
      .find("img")
  );

  var images =
  $("#vault-gallery img");

  if(nextImg.length > 0){

    $("#vault-overlay img")
      .attr("src", nextImg.attr("src"))
      .fadeIn(800);

  } else {

    $("#vault-overlay img")
      .attr("src", $(images[0]).attr("src"))
      .fadeIn(800);

  }

  event.stopPropagation();

});


// Previous Image
$prevButton.click(function(event) {

  $("#vault-overlay img").hide();

  var currentImgSrc =
  $("#vault-overlay img").attr("src");

  var currentImg =
  $('#vault-gallery img[src="' + currentImgSrc + '"]');

  var prevImg =
  $(
    currentImg
      .closest(".project-card")
      .prev()
      .find("img")
  );

  if(prevImg.length > 0){

    $("#vault-overlay img")
      .attr("src", prevImg.attr("src"))
      .fadeIn(800);

  } else {

    var images =
    $("#vault-gallery img");

    $("#vault-overlay img")
      .attr("src", $(images[images.length - 1]).attr("src"))
      .fadeIn(800);

  }

  event.stopPropagation();

});


// Exit Button
$exitButton.click(function() {

  $("#vault-overlay").fadeOut("slow");

});