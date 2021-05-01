$(function(){
   $(".c_h").click(function(e) {
            if ($(".chat_container").is(":visible")) {
                $(".c_h .right_c .mini").text("+")
            } else {
                $(".c_h .right_c .mini").text("-")
            }
            $(".chat_container").slideToggle("slow");
            return false
        });
});


$(document).ready(() => {


	/******************/
	/*** START CHAT ***/
	/******************/


	// set visitor name
	let $userName = "Tom";

	// start chatbox
	$("#form-start").on("submit", (event) => {
		event.preventDefault();
		$userName = $("#username").val();
		$("#landing").slideUp(300);
		setTimeout(() => {
			$("#start-chat").html("Continue chat")
		}, 300);
	});




	/*****************/
	/*** USER CHAT ***/
	/*****************/


	// Post a message to the board
	function $postMessage() {
		$("#message").find("br").remove();
		let $message = $("#message").html().trim(); // get text from text box
		$message = $message.replace(/<div>/, "<br>").replace(/<div>/g, "").replace(/<\/div>/g, "<br>").replace(/<br>/g, " ").trim();
		if ($message) { // if text is not empty
			const html = `<div class="post post-user">${$message + timeStamp()}</span></div>`; // convert post to html
			$("#message-board").append(html); // add post to board
			$scrollDown(); // stay at bottom of chat
			botReply($message);
		};
		$("#message").empty();
	};

	// Chat input
	$("#message").on("keyup", (event) => {
		if (event.which === 13) $postMessage(); // Use enter to send
	}).on("focus", () => {
		$("#message").addClass("focus");
	}).on("blur", () => {
		$("#message").removeClass("focus");
	});
	$("#send").on("click", $postMessage);




	/**********************/
	/*** AUTO REPLY BOT ***/
	/**********************/


	function botReply(userMessage) {
		const reply = generateReply(userMessage);
		if (typeof reply === "string") postBotReply(reply);
		else reply.forEach((str) => postBotReply(str));
	};

	function generateReply(userMessage) {
		const message = userMessage.toLowerCase();
		let reply = [`Sorry, I don't understand you.`, `Please try again or send a mail to our support team`, `cryptofun.go@gmail.com`];

		// Generate some different replies
		if (/^hi$|^hell?o|^howdy|^hoi|^hey|^ola/.test(message)) reply = [`Hi ${$userName}`, `What can I do for you?`];
		else if (/how are you|how is it going/.test(message)) reply = [`Thank's fine`, `How are you?`];
		else if (/contact|mail|e-mail|email|address/.test(message)) reply = [`You can get in touch with us using the following mail-address`, `cryptofun.go@gmail.com`];
		else if (/fine|good|great|perfect|fantastic|tank's|thanks|thank you/.test(message)) reply = [`<span class="far fa-grin fa-2x"></span>`];
		else if (/how long|when|arrive|link|can't find/.test(message)) reply = [`Please check your browsing history for your Google Sheet link.`];
		else if (/customize|customise|personalize|personalise/.test(message)) reply = [`If you have any suggestions for a new Youtube video, please leave a comment.`, `www.youtube.com`];
		else if (/edit|editable|access/.test(message)) reply = [`If you can't edit your Google Sheet, you just need to copy the Sheet in your Google account.`];
		else if (/test/.test(message)) reply = [`Ok`, `Feel free to test as much as you want`];
		else if (/help|sos|emergency|support|problem/.test(message)) reply = [`I am here to help.`, `If you need more support feel free to write my boss:`, `cryptofun.go@gmail.com?`];
		else if (/class\=\"fa/.test(message)) reply = [`I see you've found the smileys`, `Cool! <span class="far fa-grin-beam fa-2x"></span>`, `Do you need something?`];
		else if (/how|what|why/.test(message)) reply = userMessage + " what?";
		else if (/^huh+|boring|lame|wtf|pff/.test(message)) reply = [`<span class="far fa-dizzy fa-2x"></span>`, `I'm sorry you feel that way`, `How can I make it better?`];
		else if (/bye|ciao|adieu|salu/.test(message)) reply = [`bye bye  ${$userName} <span class="far fa-kiss-wink-heart fa-2x"></span>`];

		return reply;
	};

	function postBotReply(reply) {
		const html = `<div class="post post-bot">${reply + timeStamp()}</div>`;
		const timeTyping = 500 + Math.floor(Math.random() * 2000);
		$("#message-board").append(html);
		$scrollDown();
	};



	/******************/
	/*** TIMESTAMPS ***/
	/******************/


	function timeStamp() {
		const timestamp = new Date();
		const hours = timestamp.getHours();
		let minutes = timestamp.getMinutes();
		if (minutes < 10) minutes = "0" + minutes;
		const html = `<span class="timestamp">${hours}:${minutes}</span>`;
		return html;
	};




	/***************/
	/*** CHAT UI ***/
	/***************/


	// Back arrow button
	$("#back-button").on("click", () => {
		$("#landing").show();
	});


	// Menu - navigation
	$("#nav-icon").on("click", () => {
		$("#nav-container").show();
	});

	$("#nav-container").on("mouseleave", () => {
		$("#nav-container").hide();
	});

	$(".nav-link").on("click", () => {
		$("#nav-container").slideToggle(200);
	});

	// Clear history
	$("#clear-history").on("click", () => {
		$("#message-board").empty();
		$("#message").empty();
	});

	// Sign out
	$("#sign-out").on("click", () => {
		$("#message-board").empty();
		$("#message").empty();
		$("#landing").show();
		$("#username").val("");
		$("#start-chat").html("Start chat");
	});




	/*********************/
	/*** SCROLL TO END ***/
	/*********************/


	function $scrollDown() {
		const $container = $("#message-board");
		const $maxHeight = $container.height();
		const $scrollHeight = $container[0].scrollHeight;
		if ($scrollHeight > $maxHeight) $container.scrollTop($scrollHeight);
	}




	/***************/
	/*** EMOIJIS ***/
	/***************/


	// toggle emoijis
	$("#emoi").on("click", () => {
		$("#emoijis").slideToggle(300);
		$("#emoi").toggleClass("fa fa-grin far fa-chevron-down");
	});

	// add emoiji to message
	$(".smiley").on("click", (event) => {
		const $smiley = $(event.currentTarget).clone().contents().addClass("fa-lg");
		$("#message").append($smiley);
		$("#message").select(); // ==> BUG: message field not selected after adding smiley !! 
	});



/*Contact animation*/

});

$( '.js-input' ).keyup(function() {
	if( $(this).val() ) {
	   $(this).addClass('not-empty');
	} else {
	   $(this).removeClass('not-empty');
	}
});
  

/*anibot*/

	gsap.set('.eyelidTop', {
		y: '-100%'
	});
	gsap.set('.eyelidBottom', {
		y: '100%'
	});

	var tlBlink = gsap.timeline({
		repeat: -1,
		yoyo: true
	});
	
	tlBlink
	.to('.eyelidTop', {
		delay: 2,
		duration: 0.5,
		y: 0,
		yoyo: true,
		repeatDelay: 0.1
	})
	.to('.eyelidBottom', {
		duration: 0.5,
		y: 0,
		yoyo: true,
		repeatDelay: 0.1
	}, '<')
	.to('.eyelash', {
		duration: 0.3,
		y: '25%',
		x: '-10%',
		yoyo: true,
		repeatDelay: 0.1
	}, '<+0.2')
	;

// Pupil Mousemove Follow
// --------------------------
document.addEventListener('mousemove', function(e){
  var pupilW = document.querySelector('.pupil');
  var posX = ((event.clientX * 2 - window.innerWidth) / window.innerWidth) *22 + "%";
  var posY = ((event.clientY * 2 - window.innerHeight) / window.innerHeight) *19 + "%";
  // console.log(x );
  gsap.to('.pupil', {
    x: posX,
    y: posY,
    duration: 0.02
  })
});