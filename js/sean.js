(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-72168097-1', 'auto');
ga('send', 'pageview');

var currentlyShowing = 3;
var totalPortfolioItems = $('.portfolio-item').length;
$('button#loadMore').on('click', function(){
	currentlyShowing += 3;
	$('.portfolio-item:lt(' + currentlyShowing + ')').slideDown('slow', function(){});
	if(currentlyShowing >= totalPortfolioItems){
		$(this).hide();
	}
});

console.log('Thanks for visiting my site!\nI would love to hear from you about working together.\nPlease use the contact form at the bottom of this page to reach me.\nThanks - Sean');
