$.fn.trivia = function() {
    let triviaGame = this;
    triviaGame.userPick = null;
    triviaGame.answers = {
        correct: 0,
        incorrect: 0
    };
    triviaGame.count = 30;
    triviaGame.current = 0;
    triviaGame.questions = [{
        question: "In Aladdin, what is the name of Jasmine's pet tiger?",
        choices: ["Rajah", "Bo", "Iago", "Jack"],
        correct: 0
    }, {
        question: "In Peter Pan, Captain Hook had a hook on which part of his     body?",
        choices: ["Right Foot", "Left Hand", "Left Foot", "Right Hand"],
        correct: 1

    }, {
        question: "In the Lion King, where does Mufasa and his family live?",
        choices: ["Rocky Mountain", "Forest", "Desert", "Pride Rock"],
        correct: 3

    }, {
        question: "In Beauty and the Beast, how many eggs does Gaston eat for    breakfast?",
        choices: ["2 Dozen", "5 Dozen", "5000", "0"],
        correct: 1

    }, {
        question: "In Alice in Wonderland, what is the name of Alice’s kitten?",
        choices: ["Dinah", "Sammie", "Kat", "Luna"],
        correct: 0

    }, {
        question: "After being on earth, where did Hercules first meet his   father Zeus?",
        choices: ["Mount Olympus", "Greece", "In the Temple of Zeus", "Elysian   Fields"],
        correct: 2

    }, {
        question: "During the ballroom scene of Beauty & the Beast, what color is Belle’s Gown?",
        choices: ["Yellow", "Blue", "Gold", "White"],
        correct: 2

    }, {
        question: "In Bambi, what word does the owl use to describe falling in love?",
        choices: ["Whimsical", "Miserable", "Joyful", "Twitterpatted"],
        correct: 3
    }];
    triviaGame.ask = function() {
        if (triviaGame.questions[triviaGame.current]) {
            $("#timer").html("Time remaining: " + "00:" + triviaGame.count + " secs");
            $("#triviaQuestions").html(triviaGame.questions[triviaGame.current].question);
            let choicesArr = triviaGame.questions[triviaGame.current].choices;
            let buttonsArr = [];

            for (let i = 0; i < choicesArr.length; i++) {
                let button = $('<button>');
                button.text(choicesArr[i]);
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
    triviaGame.timer = function() {
        triviaGame.count--;
        if (triviaGame.count <= 0) {
            setTimeout(function() {
                triviaGame.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + triviaGame.count + " secs");
        }
    };
    triviaGame.nextQ = function() {
        triviaGame.current++;
        clearInterval(window.triviaCounter);
        triviaGame.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            triviaGame.cleanUp();
            triviaGame.ask();
        }, 1000)
    };
    triviaGame.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + triviaGame.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + triviaGame.answers.incorrect);
    };
    triviaGame.answer = function(correct) {
        let string = correct ? 'correct' : 'incorrect';
        triviaGame.answers[string]++;
        $('.' + string).html(string + ' answers: ' + triviaGame.answers[string]);
    };
    return triviaGame;
};
let Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#answerChoices').on('click', 'button', function(e) {
    let userPick = $(this).data("id"),
        triviaGame = Trivia || $(window).trivia(),
        index = triviaGame.questions[triviaGame.current].correct,
        correct = triviaGame.questions[triviaGame.current].choices[index];

    if (userPick !== index) {
        $('#answerChoices').text("Wrong Answer! The correct answer was: " + correct);
        triviaGame.answer(false);
    } else {
        $('#answerChoices').text("Correct!!! The correct answer was: " + correct);
        triviaGame.answer(true);
    }
    triviaGame.nextQ();
});