// Collapsible Drawers: uses ".collapsible.trigger", ".trigger-icon" for the icon, and ".collapsible.drawer" classes
$('.collapsible.drawer').hide();
$('.collapsible.trigger').parent().delegate('.collapsible.trigger', 'click', function() {
	$(this).next('.collapsible.drawer').slideToggle(150);
	$('.trigger-icon', this).toggleClass('active');
});

$('.droptray.drawer').hide();
$('.droptray.trigger').parent().delegate('.droptray.trigger', 'click', function() {
	$(this).next('.droptray.drawer').slideToggle(150);
	$(this).next('.droptray.drawer').toggleClass('active');
	$('.trigger-icon', this).toggleClass('active');
});

$('.toggler').parent().delegate('.toggler', 'click', function() {
	var targetItem = $(this).data('target');
	$(targetItem).slideToggle(150);
});

// Open/Close Animation Behaviors (CSS3 Animations): uses ".trigger", ".toggle", and ".closer" classes in conjunction with "data-target" attribute
$('.trigger').parent().delegate('.trigger', 'click', function() {
	var targetItem = $(this).data('target');
	$(targetItem).addClass('active');
});

$('.toggle').parent().delegate('.toggle', 'click', function() {
	var targetItem = $(this).data('target');
	$(targetItem).toggleClass('active');
});

$('.closer').parent().delegate('.closer', 'click', function() {
	var targetItem = $(this).data('target');
	$(targetItem).removeClass('active');
});

// search widget mechanism for transferring search string from input to search-results page
$('.search-widget input').keypress(function(e) {
	if(e.which == 13) {
		e.preventDefault();
		var myOption = $(this).val();
		var myUrl = $(this).parents('.search-widget').data('target');
		self.location=myUrl+'?'+myOption;
    }
});

var pageOption = document.URL.match(/\?[a-zA-Z%20]*/);
if (pageOption !== null) {
	pageOption = pageOption[0].replace('?', '');
	pageOption = pageOption.replace(/%20/g, ' ');
	$('.search-string').html('"'+ pageOption +'"');
}

// goto select-option feature
$('.option-forwarder').parent().delegate('.option-forwarder', 'click', function(e) {
	e.preventDefault();
	var myOption = $(this).data('option');
	var myUrl = $(this).attr('href');
	self.location=myUrl+'?'+myOption;
});
var pageOption = document.URL.match(/\?[a-zA-Z]*/);
if (pageOption !== null) {
	pageOption = pageOption[0].replace('?', '');
	$('#form-select').val(pageOption);
}

// manually set where to scroll to for page anchors
$('[data-move-to]').click(function() {
	var myPosition = '#' + ($(this).data('move-to'));
	var distance;
	var pat = /,.*/;
	if (pat.test(myPosition)) {
		distance = myPosition.match(pat)[0];
		distance = distance.replace(/,|,/, '');
		distance = parseInt(distance);
	}
	if (distance === undefined) {
		distance = 50;
	}
	$('html, body').animate({
        scrollTop: $(myPosition).offset().top - distance
    }, 500);
});

//== Menu close on click outside
// Behavior for Mobile Menu drawer
$(document).on("click",function(e) {
	if (!($(e.target).parents(".use-native-click").length || $(e.target).hasClass("use-native-click"))) {
		$("#siteWrapper").removeClass("active");
	}
});


//
// EQUAL HEIGHT COLUMNS:
// Note: To use, add "data-equalize" to the parent element, 
// then "data-equal-height" to each column.
// For those rare occasions when you need it, you can add 
// a value to either "data-equalize" or "data-equal-height" 
// to offset the height by a given amount. 
// Use the qualifiers "+" or "-" respectively.  
// Example: data-equal-height="+6"
//
// You can also add a breakpoint to the "data-equalize" element,
// in order to include responsive behavior.  Simply add 
// "data-breakpoint" with a number value that uses any of the 
// following qualifiers: <, <=, >, >=.
// Example: data-breakpoint="<=960"
//

function initEqualize() {
	var windowSize = $(window).width();
	$('[data-equalize]').each(function() {
		console.log("Init Triggered!");
		if ($(this).data('breakpoint') !== undefined) {
			console.log("This data-breakpoint is: " + $(this).data('breakpoint'));
			var myQualifier = $(this).data('breakpoint').match(/[\<\=\>]*/);
			myQualifier = myQualifier.toString();
			var myBreakpoint = $(this).data('breakpoint').replace(/[<=>]*/, '');
			myBreakpoint = parseInt(myBreakpoint);
			if (myQualifier === '<') {
				if (windowSize < myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
				}
				else {equalize()}	
			}
			else if (myQualifier === '<=') {
				if (windowSize <= myBreakpoint) {
					$('[data-equal-height]', this).removeAttr('style');
				}
				else {equalize()}
			}
			else if (myQualifier === '>') {
				if (windowSize > myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
				}
				else {equalize()}
			}
			else if (myQualifier === '>=') {
				if (windowSize >= myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
				}
				else {equalize()}
			}
			else {
				equalize();
			}
		}
		else {equalize()}
	});
}

function equalize() {
	$('[data-equalize]').each(function() {
		var tallest = 0;
		var parentAugment = 0;
		if ($(this).data('equalize') !== '') {
			parentAugment = parseInt($(this).data('equalize'));
		}
		var augment;
		$('[data-equal-height]', this).each(function() {
			console.log("The Height is: " + $(this).height());
			augment = 0;
			$(this).attr('style', '');
			if ($(this).data('equal-height') !== '') {
				augment = parseInt($(this).data('equal-height'));
			}
			if ($(this).height() > tallest) {
				tallest = $(this).height() + augment;
			}
		});
		$('[data-equal-height]', this).css('height', tallest+parentAugment+'px');
	});
}

$(window).load(function() {
	// Initialize
	initEqualize();
});

var windowSize;
// Update on window resize
$(window).resize(function() {
	windowSize = $(window).width();
	console.log('Window size is: ' + windowSize);
	$('[data-equalize]').each(function() {
		if ($(this).data('breakpoint')) {
			var myQualifier = $(this).data('breakpoint').match(/[<=>]*/);
			myQualifier = myQualifier.toString();
			console.log("My qualifier is: " + myQualifier);
			var myBreakpoint = $(this).data('breakpoint').replace(/[<=>]*/, '');
			myBreakpoint = parseInt(myBreakpoint);
			console.log("My Breakpoint is: " + myBreakpoint);
			if (myQualifier === '<') {
				if (windowSize < myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
					console.log("less than");
				}
				else {equalize()}
			}
			else if (myQualifier === '<=') {
				if (windowSize <= myBreakpoint) {
					$('[data-equal-height]', this).removeAttr('style');
					console.log("less than or equal to");
				}
				else {equalize()}
			}
			else if (myQualifier === '>') {
				if (windowSize > myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
					console.log("greater than");
				}
				else {equalize()}
			}
			else if (myQualifier === '>=') {
				if (windowSize >= myBreakpoint) {
					$('[data-equal-height]', this).css('height', '');
					console.log("Yep");
				}
				else {equalize()}
			}
			else {
				equalize();
			}
		}
	});
});

//======================
//	TABS
//======================

function initTabs() {
	if ($('.tabs-widget').length > 0) {
		$('.tabs-widget').each(function() {
			$('ul li:first-child', this).addClass('active');
			$('.tabs-wrapper', this).children().first().addClass('active');
		});
	}
	// Need to initialize "equalize" after tab is set to ".active", or equalize doesn't work
	initEqualize();
}

initTabs();

$('.tabs-widget li').click(function() {
	var myId = $(this).data('target');
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	$(this).parent().siblings('.tabs-wrapper').children('[data-tab]').removeClass('active');
	$(this).parent().siblings('.tabs-wrapper').children('[data-tab="'+ myId +'"]').addClass('active');
	// Equalizes columns on the fly, upon each tab click. Due to default state of "display: none", unable to equalize earlier
	equalize();
});

//======================
//	MODALS
//======================

// function initModals() {
// 	$('.modal.window').hide();
// 	if ($('.modal.window').length > 0) {
// 		$('body').prepend('<div id="overlay" style="display: none; position: fixed; width: 100%; height: 100%; background-color: rgba(0,0,0,0.45); opacity: 0; z-index: 999"></div>');
// 		$('.modal.window').prepend('<div class="close-modal"><span class="icon-close"></span></div>');
// 		$('.modal.window').css({
// 			position: 'absolute',
// 			top: '0',
// 			left: '0',
// 			right: '0',
// 			margin: 'auto',
// 			padding: '20px',
// 			width: '84%',
// 			maxWidth: '650px',
// 			backgroundColor: '#FFF',
// 			opacity: 0,
// 			zIndex: 9999
// 		});
// 		var thisModal = $('.modal.window').detach();
// 		$('body').prepend(thisModal);
// 	}
// }

// initModals();

// $('.modal.trigger').parent().delegate('.modal.trigger', 'click', function() {
// 	var myModal = $(this).data('target');
// 	var scrollTop = $(window).scrollTop();
// 	var topPos = scrollTop - 100 + 'px';
// 	$('#'+ myModal).css({
// 		top: topPos
// 	});
// 	$('#overlay').show();
// 	$('#overlay').animate({
// 		opacity: 1
// 	}, 240);
// 	$('#'+ myModal).show();
// 	var scrollTop = $(window).scrollTop();
// 	var topPos = scrollTop + 100 + 'px';
// 	$('#'+ myModal).animate({
// 		top: topPos,
// 		opacity: 1
// 	}, 150);
// });

// $('.modal.window').delegate('.close-modal', 'click', function() {
// 	$('#overlay').animate({
// 		opacity: 0
// 	}, 240, function() {
// 		$(this).hide();
// 	});
// 	var scrollTop = $(window).scrollTop();
// 	var topPos = scrollTop - 100 + 'px';
// 	$('.modal.window').animate({
// 		top: topPos,
// 		opacity: 0
// 	}, 150, function() {
// 		$(this).hide();
// 	});
// });

// $('#overlay').click(function() {
// 	$(this).animate({
// 		opacity: 0
// 	}, 240, function() {
// 		$(this).hide();
// 	});
// 	var scrollTop = $(window).scrollTop();
// 	var topPos = scrollTop - 100 + 'px';
// 	$('.modal.window').animate({
// 		top: topPos,
// 		opacity: 0
// 	}, 150, function() {
// 		$(this).hide();
// 	});
// });

//======================
//	Ohman Modal
//======================

function initModals() {
	$('.ohman.window').hide();
	if ($('.ohman.window').length > 0) {
		$('body').prepend('<div id="overlay" style="display: none; position: fixed; width: 100%; height: 100%; background-color: rgba(0,0,0,0.45); opacity: 0; z-index: 9998"></div>');
		$('.ohman.window').prepend('<div class="close-modal"><span class="icon-close"></span></div>');
		$('.ohman.window').css({
			position: 'absolute',
			top: '100px',
			left: '-600px',
			right: '0',
			margin: 'auto',
			padding: '20px',
			width: '84%',
			maxWidth: '650px',
			backgroundColor: '#FFF',
			'transform': 'scale(0.6)',
			opacity: 0,
			zIndex: 9999
		});
		var thisModal = $('.ohman.window').detach();
		$('body').prepend(thisModal);
	}
}

function resetModal() {
	$('.ohman.window').hide();
	$('.ohman.window').css('left','-600px');
}

initModals();

$('.ohman.trigger').parent().delegate('.ohman.trigger', 'click', function() {
	var myModal = $(this).data('target');
	var scrollTop = $(window).scrollTop();
	$('#'+ myModal).css({
		top: topPos
	});
	$('#overlay').show();
	$('#overlay').animate({
		opacity: 1,
		left: 0
	}, 280);
	$('#'+ myModal).show();
	var scrollTop = $(window).scrollTop();
	var topPos = scrollTop + 100 + 'px';
	TweenMax.to('#'+ myModal, 0.3, {
		top: topPos,
		opacity: 1,
		left: 0,
		scale: 1,
		ease: Power2.easeOut
	});
	// $('#'+ myModal).animate({
	// 	top: topPos,
	// 	opacity: 1,
	// 	left: 0
	// }, 150);
});

$('.ohman.window').delegate('.close-modal', 'click', function() {
	$('#overlay').animate({
		opacity: 0
	}, 280, function() {
		$(this).hide();
	});
	TweenMax.to('.ohman.window', 0.22, {
		opacity: 0,
		left: '400px',
		scale: 0.6,
		ease: Power1.easeIn,
		onComplete: resetModal
	});
	// $('.ohman.window').animate({
	// 	opacity: 0,
	// 	left: '400px'
	// }, 150, function() {
	// 	$(this).hide();
	// 	$(this).css('left','-400px');
	// });
});

$('#overlay').click(function() {
	$(this).animate({
		opacity: 0
	}, 280, function() {
		$(this).hide();
	});
	TweenMax.to('.ohman.window', 0.22, {
		opacity: 0,
		left: '400px',
		scale: 0.6,
		ease: Power1.easeIn,
		onComplete: resetModal
	});
	// $('.ohman.window').animate({
	// 	opacity: 0,
	// 	left: '400px'
	// }, 150, function() {
	// 	$(this).hide();
	// 	$(this).css('left','-400px');
	// });
});

//======================
//	ON/OFF SWITCHES
//======================

$('.switch-object').click(function() {
	$(this).toggleClass('on');
});

function initMobileNav() {
	$('.mobile-nav li a').each(function() {
		if ($(this).siblings('ul').length > 0) {
			$(this).addClass('decorate');
		}
	});
}

initMobileNav();

$('.mobile-nav li a').click(function(e) {
	if ($(this).siblings('ul').length > 0) {
		e.preventDefault();
		$(this).siblings('ul').slideToggle(150);
		$(this).toggleClass('active');
	}
});

$('body').delegate('a.register', 'click', function() {
	$(this).parent().append('<a href=""></a>')
});