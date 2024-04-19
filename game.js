var buttonColors = ["red", "blue", "green", "yellow"]; //declare the button colors array

var gamePattern = [];           //declare an empty array of game pattern bcs it hasnt started yet
var userClickedPattern = [];    //empty array for user clicks bcs it hasnt started yet

var started = false;    //started is false bcs again, IT HASNT STARTED YET
var level = 0;          //you know why its declared to 0

//handles user clicks to start the game
$(document).keydown(function(){     //target the whole document, bcs if you only target the button, then it wont trigger the whole page, well it just wont work
    if (!started){      //if it hasnt started yet
        $('#level-title').text("Level " + level);   //then when user click the button, it displays the level
        nextSequence(); //call the next sequence so it will generate the sequence color
        started = true; //now the game has started
    }
});

//user clicks
$('.btn').click(function(){     //this is where we target the button bcs this is only triggered by the BUTTON PRESS
    var userChoosenColor = $(this).attr("id");  //if user pick the color blue, then this var will equal to the id of the button that got pressed, for example : '#blue'

    userClickedPattern.push(userChoosenColor);  //now push the button to the array, now blue is in the array at index 0 (FOR EXAMPLE)

    playSound(userChoosenColor);    //play the sound OF THE CLICKED BUTTON, the sound for blue will be played here

    animatePress(userChoosenColor); //dont forget to animate it

    checkAnswer(userClickedPattern.length - 1); //now check the answer, here we are passing the index, so if user clicked blue for the first time, then blue will be at index 0, now we are passing 0 for the function. how does this checks the whole array element? ???
});

//checking user answer
function checkAnswer(currentLevel){     //needs a parameter bcs we are calling this later
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){    //now check if the user input is equal to the game pattern AT THE SAME INDEX. now this answered the previous question about how does this checks the whole ass elements.

        console.log("success");     //now display this to the console so you wont be confused

        if (userClickedPattern.length === gamePattern.length){  //now check if the user has clicked the same number of button as the amount of colors generated in the game pattern

            setTimeout(function(){  //give sum rest before generating the next color to press bcs bro we needa break here to remember those stuff

                nextSequence(); //call bro again
            }, 1000);   //give rest for 1000ms
        }
    } else {    //if the button that got pressed by user is not equal to the button that got generated

        playSound("wrong");     //play this hell music

        $('body').addClass('game-over');    //at this class to the body, or the background, so it will hurt the user eyes as a punishment, now the addClass will add the game-over class to it right, and the game-over in the css contains the color red, so thats why

        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200); //give sum rest for 200ms before removing the background, no one can handle that ugly red background for more than 200ms

        $('#level-title').text("Game Over! Press any key to restart");  //now change the title so user know that they are a loser, the .text here is used to change the text of the selected id in which is $('#level-title')

        startOver();    //call bro to reset the whole effort user did
    }
}

//game pattern
function nextSequence(){
    userClickedPattern = [];    //this bro needs this to be redeclared bcs 

    level++; //increment this, so as the game started, user will see that they are currently at level x, this will gradually increase the level as user finishes the button clicks

    $('#level-title').text("Level " + level);   //change the title

    var randomNumber = Math.floor(Math.random() * 4);   //generate the random number

    var randomChoosenColor = buttonColors[randomNumber];    //this will pick the random index of the button colors we declared earlier, generating a random color for the next sequence

    gamePattern.push(randomChoosenColor);   //push the color to the game pattern so we can compare it with user input later

    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);   //for visual purpose, user will see clearly which button got generated

    playSound(randomChoosenColor);  //play the sound bcs duh
}

//play sound for each button
function playSound(name){   //needs a parameter bcs we need to play different sounds for different class
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();   //play it
}

//animate the pressed button
function animatePress(currentColor){    //this will animate the button that got pressed by user
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);    //set timeout to 100ms
}

function startOver(){       //finally if the user is a loser, this function will get executed
    level = 0;              //start over the whole thing
    gamePattern = [];
    started = false;
}


/*
IN A NUTSHELL, THIS WHAT WILL HAPPEN : 
1. it will display the current h1 which is press a key to start (line 10)
2. now user will press a key, got detected by line 10
3. checks if the started variable is equal to false, in which it is
4. generate the colors by calling the nextSequence() (line 13)
5. change the started to true bcs we will change this to false to execute step 4 if user failed
6. now inside the next sequence, say it generated blue in which is the index 1 of the array
7. put the generated color in the array of gamePattern
8. now we wait for user to click the button
9. say user clicked the button blue, now this is what line 19 - 29 responsible for
10. put the user clicked color in the userClickedPattern
11. now userClickedPattern is populated with blue right, at index 0 bcs its the first color that got clicked
12. now go to the checkAnswer function
13. user is in the checkAnswer() now
14. now if the userClickedPattern has 2 elements, say userClickedPattern['red', 'blue'], red is in index 0 and blue is at index 1, so we are comparing those value using userClickedPattern[currentLevel] with gamePattern[currentLevel].
*/