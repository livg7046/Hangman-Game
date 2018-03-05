// Global Var
var keysUsed = [];
var theWord = getWord();
var theWordArr = [];
var displayedWordArr = [];
var guesses = 6;
var correctGuesses = 0;
var blanks ="";
// ***FUNCTIONS***


//Function init

function init (){
    console.log(theWord);
    keyboard ();
    theWordToArr ();
    updateBlanks();

}

function updateBlanks (){
    blanks = displayedWordArr.join(" ");
    document.getElementById("word").innerHTML= blanks;

}

function theWordToArr (){
    for(var i = 0; i < theWord.length; i++){
        theWordArr.push(theWord.charAt(i));
        displayedWordArr.push('_');
    }
}


// Word randomizer "getWord"
function getWord () {
    var words = ["magichorse","glitter","rainbows", "land narwhal", "singlehorn", "untamable", "pure", "rare", "beautiful", "majestic"];
    var theWord = words[Math.floor(Math.random()*words.length)];
    return theWord;
            
}

// Display letter in word "displayWord"

function displayWord(keyPressed) {
    
    for (var i = 0; i < theWordArr.length; i++){
        if (keyPressed === theWordArr[i]) {
            displayedWordArr[i] = keyPressed;
            correctGuesses ++;
        }
    }
    updateBlanks();
}


// Button Handler 

function btnHandler (keyPressed){
    keyPressed = keyPressed.toLowerCase ();
    console.log(keyPressed);
    if (!isKeyUsed (keyPressed)) {
        keysUsed.push(keyPressed);
        
        if (isLetterInWord(keyPressed)) {
           displayWord (keyPressed);
           console.log(displayedWordArr.toString().replace(",",""));
           
           if (correctGuesses === theWord.length){
               youWin ();
           }
           
        
        } else {
            guesses --;
            var imgIndex = 6 - guesses;
            var prevImgIndex = imgIndex - 1;
            document.getElementById(imgIndex.toString()).style.visibility = "visible";
            if(guesses < 5) 
                document.getElementById(prevImgIndex.toString()).style.visibility = "hidden";
            if (guesses === 0){
                youLose();
            }
        }
    }  
    
}

//Has key been pressed 
    
function isKeyUsed (x) {
    return keysUsed.includes(x);
    
}
    
//Is letter in word

function isLetterInWord (y) {
    return theWord.includes(y);
}

// Display "youWin"
function youWin () {
    document.getElementById("keyboard").style.visibility = "hidden";
    document.getElementById("7").style.visibility = "visible";


 }

// Display "youLose"
function youLose (letterBtn) {
    document.getElementById("keyboard").style.visibility = "hidden";

}

//Display keyboard 
function keyboard () {
  var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  for (var l = 0; l <letters.length; l++)  {
    var letterBtn = document.createElement('button');
    var text = document.createTextNode(letters[l]);
    letterBtn.appendChild(text);

    letterBtn.onclick = (function(letter){ 
    
        return function(){
            this.disabled = true;
            console.log(this);
            btnHandler(letter);
        }
    })(letters[l]);

    document.getElementById("keyboard").appendChild(letterBtn);

  }
}

init ();




//CHEAT SHEET
/*
How to attach a function to an event without a parameter
letterBtn.onclick = functionName;

How to attach a function to an event WITH a parameter
--Where `letter` is the name of the parameter (you define this any name you want)
--Where `letter[l]` contains the value that you're passing to `letter` parameter
letterBtn.onclick = (function(letter){  
        return function(){
            btnHandler(letter);
        }
    })(letters[l]);


*/


