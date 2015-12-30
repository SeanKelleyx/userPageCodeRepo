var hasTouch;
window.addEventListener('touchstart', function setHasTouch () {
    touchDevice();
    window.removeEventListener('touchstart', setHasTouch);
}, false);

$("#tools a").click(function(event){
	event.preventDefault();
});

function touchDevice(){
	$(".portfolio-box .portfolio-box-caption")
	.css('background', 'rgba(209, 142, 24, 0.6) none repeat scroll 0 0')
	.css('opacity', 1);
}