$.fn.trivia = function () {
	let triviaGame = this;
	triviaGame.userPick = null;
	triviaGame.answers = {
		correct: 0,
		incorrect: 0
	};
	triviaGame.count = 30;
	triviaGame.current = 0;
	triviaGame.questions = [{
		question: "What is the founding club of the Sons of Anarchy??",
		choices: ["SAMTAZ", "SAMDINO", "SAMCRO", "SAMBEL"],
		correct: 2,
	}, {
		question: "Which of the following is not a breed of dog??",
		choices: ["Pomeranian", "Egyptian", "Terrier", "Blue Heeler"],
		correct: 1,

	}, {
		question: "Which is a phone carrier?",
		choices: ["Apple", "Verizon", "Samsung", "Yolo"],
		correct: 1,

	}, {
		question: "In 'Attack on Titan' how many original Titans exist?",
		choices: ["2", "7", "11", "9"],
		correct: 3,

	}, {
		question: "Which of the following is the last 'body-on-frame' SUV remaining?",
		choices: ["Xterra", "Sammie", "Kat", "4Runner"],
		correct: 3,

	}, {
		question: "Which of the following is not a God?",
		choices: ["Osiris", "Hermes", "Gaia", "Ares"],
		correct: 2

	}, {
		question: "How many centimeters are in one inch?",
		choices: [".344", ".0.393", "1.003", ".544"],
		correct: 1,

	}, {
		question: "What is the capital of the United States of America?",
		choices: ["Austin, Tx", "New York, NY", "Denver, Co", "Washington D.C"],
		correct: 3
	}];
	triviaGame.askQuestion = function () {
		if (triviaGame.questions[triviaGame.current]) {
			$("#timer").html("Time remaining: " + "00:" + triviaGame.count + " secs");
			$("#triviaQuestions").html(triviaGame.questions[triviaGame.current].question);
			let choicesArray = triviaGame.questions[triviaGame.current].choices;
			let buttonsArr = [];

			for (let i = 0; i < choicesArray.length; i++) {
				let button = $('<button>');
				button.text(choicesArray[i]);
				button.attr('data-id', i);
				$('#answerChoices').append(button);
			}
			window.triviaCounter = setInterval(triviaGame.timer, 1000);
		} else {
			$('body').append($('<div />', {
				text: 'Unanswered: ' + (
					triviaGame.questions.length - (triviaGame.answers.correct + triviaGame.answers.incorrect)),
				class: 'result'
			}));
			$('#start_button').text('Restart').appendTo('body').show();
		}
	};
	triviaGame.timer = function () {
		triviaGame.count--;
		if (triviaGame.count <= 0) {
			setTimeout(function () {
				triviaGame.nextQuestion();
			});

		} else {
			$("#timer").html("Tiempo remaining: " + "00:" + triviaGame.count + " seconds.");
		}
	};
	triviaGame.nextQuestion = function () {
		triviaGame.current++;
		clearInterval(window.triviaCounter);
		triviaGame.count = 30;
		$('#timer').html("");
		setTimeout(function () {
			triviaGame.reset();
			triviaGame.askQuestion();
		}, 2000)
	};
	triviaGame.reset = function () {
		$('div[id]').each(function (item) {
			$(this).html('');
		});
		$('.correct').html('Number of correct answers: ' + triviaGame.answers.correct);
		$('.incorrect').html('Number of incorrect answers: ' + triviaGame.answers.incorrect);
	};
	triviaGame.answer = function (correct) {
		let string = correct ? 'correct' : 'incorrect';
		triviaGame.answers[string]++;
		$('.' + string).html(string + ' answers: ' + triviaGame.answers[string]);
	};
	return triviaGame;
};
let newQuestion;

$("#start_button").click(function () {
	$(this).hide();
	$('.result').remove();
	$('div').html('');
	newQuestion = new $(window).trivia();
	newQuestion.askQuestion();
});

$('#answerChoices').on('click', 'button', function (e) {
	let userPick = $(this).data("id"),
		triviaGame = newQuestion || $(window).trivia(),
		index = triviaGame.questions[triviaGame.current].correct,
		correct = triviaGame.questions[triviaGame.current].choices[index];

	if (userPick !== index) {
		$('#answerChoices').text("Incorrect, yo. The correct answer is: " + correct);
		triviaGame.answer(false);
	} else {
		$('#answerChoices').text("You're pretty smart! " + correct);
		triviaGame.answer(true);
	}
	triviaGame.nextQuestion();
});