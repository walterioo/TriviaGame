//Trivia Game
    var startTrivia = [
        q1 = {
            question: 'What type of beer is known because of its high IBU content?',
            choices: ['Belgian Dubbel', 'Dry Stout', 'Indian Pale Ale', 'Irish Red Ale'],
            correctAns: 2, // Position of the correct answet in the choices array
            image: 'assets/images/ipa.gif'
        },
        q2 = {
            question: 'Which is not a step in the process of making beer',
            choices: ['Mulching', 'Maturation', 'Fermentation', 'Lautering'],
            correctAns: 0, // Position of the correct answet in the choices array
            image: 'assets/images/homer.gif'
        },
        q3 = {
            question: 'Which is not a main ingredient in making real beer',
            choices: ['Malt', 'Water', 'Hops', 'Rice'],
            correctAns: 3, // Position of the correct answet in the choices array
            image: 'assets/images/rice.gif'
        },
        q4 = {
            question: 'What famous water is it used to make dry and hoppy brews?',
            choices: ['Pilsner', 'Belgian', 'Burton', 'Porter'],
            correctAns: 2, // Position of the correct answet in the choices array
            image: 'assets/images/burton.gif'
        },
        q5 = {
            question: 'In the brewing process, the fermentation step turns sugar into alcohol and what else?',
            choices: ['More Sugar', 'Nitrogen', 'Malt', 'Carbon dioxide'],
            correctAns: 3, // Position of the correct answet in the choices array
            image: 'assets/images/co2.gif'
        },
        q6 = {
            question: 'Generally, which ingredient is malted at the beginning of the brewing process?',
            choices: ['Barley', 'Hops', 'Sugar', 'Alcohol'],
            correctAns: 0, // Position of the correct answet in the choices array
            image: 'assets/images/barley.gif'
        },
        q7 = {
            question: 'What is the process of separating the wort from the solid remains of the mash called?',
            choices: ['Fermenting', 'Lautering', 'Conditioning', 'Lagering'],
            correctAns: 1, // Position of the correct answet in the choices array
            image: 'assets/images/lauter.gif'
        },
        q8 = {
            question: 'What causes skunked beer?',
            choices: ['Heat', 'Light', 'Old age', 'Bad yeast'],
            correctAns: 1, // Position of the correct answet in the choices array
            image: 'assets/images/skunk.gif'
        },
        q9 = {
            question: 'Which style of beer is Guinness famous for?',
            choices: ['Stout', 'IPA', 'Wheat Beer', 'Weissbier'],
            correctAns: 0, // Position of the correct answet in the choices array
            image: 'assets/images/guinness.gif'
        },
        q10 = {
            question: 'Weiss beer is made from which grain?',
            choices: ['Oatmeal', 'Barley', 'Rye', 'Wheat'],
            correctAns: 3, // Position of the correct answet in the choices array
            image: 'assets/images/wheat.jpg'
        }
    ];
    var wins = 0;
    var loses = 0;
    var unanswered = 0;
    var currentQuestion, timer, intervalId;
    var counter = 0;
    var trivia = [];
    var totalAnswers = startTrivia.length;

    function startTimer() {
            timer = 20;
            intervalId = setInterval(decrement, 1000);
            $('.timer-bar').html('<h2>Remaining time: ' + timer + '</h2>');
    }
    //Counter and Unanswered
    function decrement() {
        timer--;
        $('.timer-bar').html('<h2>Remaining time: ' + timer + '</h2>');

        if (timer === 0) {
            unanswered++;
            counter++;
            running = false;
            clearInterval(intervalId);
            $userChoice = $('<div>');
        $userChoice.addClass('current-answer');
        $userChoice.html('Your answer is incorrect! The correct answer is: ' + currentQuestion.choices[currentQuestion.correctAns] + '<br>');
        $userChoice.append('<img id="images" src="' + currentQuestion.image + '">');
        $('.answer').detach();
        $('.answer-section').append($userChoice);  
            //Timer for the result screen
            setTimeout(function () {
                
                finishGame();
            }, 3000)
        }
    }
    function playerWins() {
        $userChoice = $('<div>');
        $userChoice.addClass('current-answer');
        $userChoice.html('Your answer is correct! <br>');
        $userChoice.append('<img id="images" src="' + currentQuestion.image + '">');
        $('.answer').detach();
        $('.answer-section').append($userChoice);

        setTimeout(function () {
            finishGame();
        }, 3000)
    }

    function playerLoses() {
        $userChoice = $('<div>');
        $userChoice.addClass('current-answer');
        $userChoice.html('Your answer is incorrect! The correct answer is: ' + currentQuestion.choices[currentQuestion.correctAns] + '<br>');
        $userChoice.append('<img id="images" src="' + currentQuestion.image + '">');
        $('.answer').detach();
        $('.answer-section').append($userChoice);
        //Timer for the result screen
        setTimeout(function () {
            finishGame();
        }, 3000)
    }

    function newQuestion() {
        let i = Math.floor(Math.random() * trivia.length);
        currentQuestion = trivia[i];
        trivia.splice(i,1);
        // // Display the new Question and Answers in the DOM
        $('.question-section').html('<h2>' + currentQuestion.question + '</h2>');
        for (let i = 0; i < currentQuestion.choices.length; i++) {
            $ansDiv = $('<div>');
            $ansDiv.addClass('answer');
            $ansDiv.attr('id', i);
            $ansDiv.html(currentQuestion.choices[i]);
            $('.answer-section').append($ansDiv);
        }
    }

    function finishGame() {
        clearInterval(intervalId);
        console.log('counter: '+ counter);
        if (counter === totalAnswers) {
            console.log('Game finished');
            $('.timer-bar').empty();
            $('h2').detach();
            $('.answer-section').empty();
            $('#start-btn').hide();
            $('.question-section').append('<h2>The trivia is over! Heres is how you did!</h2>');
            let $newDiv = $('<div>');
            $newDiv.addClass('stats');
            $newDiv.append('<p> Correct Answers: ' + wins + '</p>');
            $newDiv.append('<p> Incorrect Answers: ' + loses + '</p>');
            $newDiv.append('<p> Unaswered: ' + unanswered + '</p>');
            $('.answer-section').append($newDiv);
            $('#reset-btn').show();
        } else {
            $('.answer-section').empty();
            newQuestion();
            startTimer();
        }
    }

$(document).ready(function () {    
    $('#reset-btn').hide();
    trivia = startTrivia.slice();
    // EVENT HANDLERS
    $(document).on('click', '.answer', function () {
        console.log('answer click');

        if (this.id == currentQuestion.correctAns) { //thruthy because id is a string
            console.log('You win');
            clearInterval(intervalId);
            wins++;
            counter++;
            playerWins();
        } else {
            console.log('You lose');
            clearInterval(intervalId);
            loses++;
            counter++;
            playerLoses()
        }
        })    
    
    
    //Start Button Listener
    $('#start-btn').on('click', function () {
        $(this).hide();
        newQuestion();
        startTimer();
    })
    //Reser Button Listener
    $(document).on('click','#reset-btn',function(){
        console.log('reset click');
        $(this).hide();
        $('.answer-section').empty();
        $('.question-section').empty();
        startTimer();
        trivia = startTrivia.slice();
        newQuestion();
        counter = 0;
        
    })
})