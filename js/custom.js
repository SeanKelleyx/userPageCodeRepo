var isTouchDevice = 'ontouchstart' in document.documentElement;

$("#tools a").click(function(event){
	event.preventDefault();
});

if(isTouchDevice){
	$(".portfolio-box .portfolio-box-caption")
	.css('background', 'rgba(209, 142, 24, 0.6) none repeat scroll 0 0')
	.css('opacity', 1);
}