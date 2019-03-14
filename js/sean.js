(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-72168097-1', 'auto');
ga('send', 'pageview');

var currentlyShowingTimeline = 1;
var totalTimelineItems = $('.timeline-item').length;
function setUpPortfolioButton(){
	$('#show-more-portfolio').show();
	var totalPortfolioItems = $('.portfolio-item').length;
	var currentlyShowingPortfolio = 3;
	$('button#loadMore').on('click', function(){
		currentlyShowingPortfolio += 3;
		$('.portfolio-item:lt(' + currentlyShowingPortfolio + ')').slideDown('slow', function(){});
		if(currentlyShowingPortfolio >= totalPortfolioItems){
			$(this).hide();
		}
	});
}
$('.timeline-button .timeline-image').on('click', function(){
	currentlyShowingTimeline++;
	$('.timeline-item:lt(' + currentlyShowingTimeline + ')').slideDown('slow', function(){});
	if(currentlyShowingTimeline >= totalTimelineItems){
		$('.timeline-button').hide();
	}
});
$('form#access-code-form').on('submit', function(event){
	event.preventDefault();
	$('button#access-code-submit-button').fadeOut('slow', function(){});
	$('.passcode-success-message, .passcode-error-message').fadeOut('slow', function(){});
	var code = $('input[name=access-code]').val();
	if(code && code != ''){
		$.ajax({
			url: '/auth/access.php', 
			type: 'POST',
			dataType: 'json',
			data: {passcode: code},
			success: function(data){
				if(data.success){
					if(data.projects.length){
						$('#project-grid').html(data.projects);
						$('#project-modals').html(data.modals);
						if($('.portfolio-item').length > 3){
							setUpPortfolioButton();
						}
						showAccessSuccessMessageHideForm();
					}else{
						auth_error();
					}
				}else{
					auth_error();
				}
			},
			error: function(){
				auth_error();
			}
		});
	}
});
function showAccessSuccessMessageHideForm(){
	$('#access-code-form').fadeOut('slow',function(){
		$('.passcode-success-message').fadeIn('slow', function(){});
	});
}
function auth_error(){
	$('button#access-code-submit-button').fadeIn('slow', function(){});
	$('.passcode-error-message').fadeIn('slow', function(){});
	console.error('some error');
}
console.log('Thanks for visiting my site!\nI would love to hear from you about working together.\nPlease use the contact form at the bottom of this page to reach me.\nThanks - Sean');
