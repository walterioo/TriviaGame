//Trivia Game

$(document).ready(function () {
    //Question and answer holder    
    var trivia = [
        q1 = {
            question: 'What type of beer is known because of its high IBU content?',
            choices: ['Belgian Dubbel', 'Dry Stout', 'Indian Pale Ale', 'Irish Red Ale'],
            correctAns: 2, // Position of the correct answet in the choices array
            image: 'assets/images/'
        },
        q2 = {
            question: 'Which is not a step in the process of making beer',
            choices: ['Mulching', 'Maturation', 'Fermentation', 'Lautering'],
            correctAns: 0, // Position of the correct answet in the choices array
            image: 'assets/images/'
        },
        q3 = {
            question: 'Which is not a main ingredient in making real beer',
            choices: ['Malt', 'Water', 'Hops', 'Rice'],
            correctAns: 3, // Position of the correct answet in the choices array
            image: 'assets/images/'
        },
        q4 = {
            question: 'What famous water is it used to make dry and hoppy brews?',
            choices: ['Pilsner', 'Belgian', 'Burton', 'Porter'],
            correctAns: 2, // Position of the correct answet in the choices array
            image: 'assets/images/'
        },
        q5 = {
            question: 'In the brewing process, the fermentation step turns sugar into alcohol and what else?',
            choices: ['More Sugar', 'Nitrogen', 'Malt', 'Carbon dioxide'],
            correctAns: 3, // Position of the correct answet in the choices array
            image: 'assets/images/'
        },
        q6 = {
            question: 'Generally, which ingredient is malted at the beginning of the brewing process?',
            choices: ['Barley', 'Hops', 'Sugar', 'Alcohol'],
            correctAns: 0, // Position of the correct answet in the choices array
            image: 'assets/images/'
        },
        q7 = {
            question: 'What is the process of separating the wort from the solid remains of the mash called?',
            choices: ['Fermenting', 'Lautering', 'Conditioning', 'Lagering'],
            correctAns: 1, // Position of the correct answet in the choices array
            image: 'assets/images/'
        },
        q8 = {
            question: 'What causes skunked beer?',
            choices: ['Heat', 'Light', 'Old age', 'Bad yeast'],
            correctAns: 1, // Position of the correct answet in the choices array
            image: 'assets/images/'
        },
        q9 = {
            question: 'Which style of beer is Guinness famous for?',
            choices: ['Stout', 'IPA', 'Wheat Beer', 'Weissbier'],
            correctAns: 1, // Position of the correct answet in the choices array
            image: 'assets/images/'
        },
        q10 = {
            question: 'Weiss beer is made from which grain?',
            choices: ['Oatmeal', 'Barley', 'Rye', 'Wheat'],
            correctAns: 3, // Position of the correct answet in the choices array
            image: 'assets/images/'
        }
    ];
    var wins = 0;
    var loses = 0;
    var unanswered = 0;
    var usedArray = [];
    var currentQuestion, timer, intervalId;
    var counter = 0;
    var resetButton = $("<button id='reset-btn'>Reset</button>");
    var running = false;

    $('#reset-btn').detach();
    // Function to select a new question 
    function newQuestion() {
        let i = Math.floor(Math.random() * trivia.length);

        if (usedArray.indexOf(i) === -1) { // Checks if the question was previously selected if not pushes it 
            usedArray.push(trivia[i]);
            currentQuestion = trivia[i];
        } else { // Re-calls the function if it was previously selected
            newQuestion()
        }
        // Display the new Question and Answers in the DOM
        $('.question-section').html('<h2>' + currentQuestion.question + '</h2>');
        for (let i = 0; i < currentQuestion.choices.length; i++) {
            $ansDiv = $('<div>');
            $ansDiv.addClass('answer');
            $ansDiv.attr('id', i);
            $ansDiv.html(currentQuestion.choices[i]);
            $('.answer-section').append($ansDiv);
        }
    }

    function playerWins() {
        $userChoice = $('<div>');
        $userChoice.html('Your answer is correct! <br>');
        $userChoice.append('<img id="images" src="' + currentQuestion.image + '">');
        $('.answer').detach();
        $('.answer-section').append($userChoice);

        setTimeout(function () {
            finishGame();
        }, 3000)
    }

    function playerLoses() {
        $userChoice = $('<div id="display-choice">');
        $userChoice.html('Your answer is incorrect! The correct answer is: ' + currentQuestion.choices[currentQuestion.correctAns] + '<br>');
        $userChoice.append('<img id="images" src="' + currentQuestion.image + '">');
        $('.answer').detach();
        $('.answer-section').append($userChoice);
        //Timer for the result screen
        setTimeout(function () {
            finishGame();
        }, 3000)
    }

    //Set Timer
    function startTimer() {
        if (!running) {
            timer = 5;
            running = true;
            intervalId = setInterval(decrement, 1000);
            $('.timer-bar').html('<h2>Remaining time: ' + timer + '</h2>');
        }
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

            $('.answer-section').html('<p class="answer">Time is up! The correct answer is: ' + currentQuestion.choices[currentQuestion.correctAns] + '</p>');

            //Timer for the result screen
            setTimeout(function () {
                $('.answer').detach();
                finishGame();
            }, 3000)
        }
    }

    function finishGame() {
        clearInterval(intervalId);
        console.log('counter: '+ counter);
        if (counter === 3) {
            console.log('Game finished');
            $('.timer-bar').detach();
            $('h2').detach();
            $('.answer').detach();
            $('#start-btn').hide();
            $('.question-section').append('<h2>The trivia is over! Heres is how you did!</h2>');
            let $newDiv = $('<div>');
            $newDiv.append('<p class="answer"> Correct Answers: ' + wins + '</p>');
            $newDiv.append('<p class="answer"> Incorrect Answers: ' + loses + '</p>');
            $newDiv.append('<p class="answer"> Unaswered: ' + unanswered + '</p>');
            $('.answer-section').append($newDiv);
            $('.button-wrapper').append(resetButton);
        } else {
            newQuestion();
            startTimer();
        }
    }

    // EVENT HANDLERS
    // Answer event listener
    $('.answer').on('click', function () {
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
        $(this).detach();
        newQuestion();
        startTimer();
    })
    //Reser Button Listener
    $('#reset-btn').on('click',function(){
        console.log('reset click');
        $('#reset-btn').hide();
        $('.answer-sections').empty();
        $('.question-section').empty();
        startTimer();
        newQuestion();
    })
})