(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-72168097-1', 'auto');
ga('send', 'pageview');

var currentlyShowingPortfolio = 3;
var totalPortfolioItems = $('.portfolio-item').length;
var currentlyShowingTimeline = 1;
var totalTimelineItems = $('.timeline-item').length;
$('button#loadMore').on('click', function(){
	currentlyShowingPortfolio += 3;
	$('.portfolio-item:lt(' + currentlyShowingPortfolio + ')').slideDown('slow', function(){});
	if(currentlyShowingPortfolio >= totalPortfolioItems){
		$(this).hide();
	}
});
$('.timeline-button .timeline-image').on('click', function(){
	currentlyShowingTimeline++;
	$('.timeline-item:lt(' + currentlyShowingTimeline + ')').slideDown('slow', function(){});
	if(currentlyShowingTimeline >= totalTimelineItems){
		$('.timeline-button').hide();
	}
});
console.log('Thanks for visiting my site!\nI would love to hear from you about working together.\nPlease use the contact form at the bottom of this page to reach me.\nThanks - Sean');
