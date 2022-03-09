import { ruswords } from './words.js';
import { emojis } from './emojis.js';
 
let checkButton = document.getElementById("check")
let letters = document.getElementById("letters")
let userInput = document.getElementById("userInput")
let words = ["дерево","собака","кошка","фотоаппаратура","сыр"]
words = ruswords
let secretWord = words[Math.floor(Math.random()*words.length)]

let secretArray = []

refreshSecretArray()
function refreshSecretArray(){
    secretArray = []
    let emoji;
    for (let i = 0; i < secretWord.length; i = i+1) {
        // console.log(10)
        emoji = emojis[Math.floor(Math.random()*emojis.length)]
        secretArray.push(emoji)
    }

//     for (let i = 0; i < 77; i = i + 1) {
//         // if (i != 77) {
//         // console.log('я смог')
//     // }
// }

}

console.log(secretArray);
let stars = document.getElementById("stars")
let usedLetters = ""
let img = document.getElementById("img")
let imgNumber = 0
let mainTitle = document.getElementById("title")
let newGame = document.getElementById("newGame")

let settings = document.getElementById("settings")
let modal = document.getElementById('modal')

let solo = document.getElementById('solo')
let multi = document.getElementById('multi')

let wordModal = document.getElementById('wordModal')

let guess = document.getElementById('guess')
let wordInput = document.getElementById('wordInput')

let mode = 'solo'

// stars.innerHTML = "*".repeat(secretWord.length)
stars.innerHTML = secretArray.join('')
userInput.focus()


// let eight = 4

// while(eight<20){
//     console.log(eight)
//     eight = eight + 4
// }

// for (let i = 3; i < 21; i = i + 3) {
//     if (i != 9) {
//         console.log(i)
//     }
// }

function getFontSize(){
    stars.style.fontSize = '25px'
    while(stars.offsetHeight>30){
        stars.style.fontSize = parseInt(window.getComputedStyle(stars).fontSize)-1+'px'
        

    }
}

getFontSize()

checkButton.onclick = function (event){
    // console.log("Проверить")
    // строка чтоб не обновлялась страница!
    event.preventDefault(); 

    
    if(!usedLetters.includes(userInput.value)){
        usedLetters = usedLetters+" "+userInput.value
        // console.log(5)
    }
    
      
    
    letters.innerHTML = "Использованные буквы: "+usedLetters



    if (secretWord.includes(userInput.value)) {
        // console.log("Да")
        // let newCypher = ""
        let newArray = []
        for (let letterNumber = 0; letterNumber < secretWord.length; letterNumber++) {
            console.log(secretWord[letterNumber])
            if (secretWord[letterNumber] == userInput.value) {
                // newCypher = newCypher + secretWord[letterNumber]
                newArray.push(secretWord[letterNumber])
            }

            else{
                // newCypher = newCypher + stars.innerHTML[letterNumber]
                newArray.push(secretArray[letterNumber])
            }

        }
        secretArray = newArray
        // stars.innerHTML = newCypher

        stars.innerHTML = secretArray.join('')

        if(secretWord == stars.innerHTML){
            // console.log("Winnnnnnnnnnnnnnn") 
            checkButton.style.opacity = 0.5
            mainTitle.innerHTML = "Вы победили!"
        }
    }

    else {
        imgNumber = imgNumber+1
        // console.log(imgNumber)
        img.src = "/img/hangman"+imgNumber+".png"
            
        if (imgNumber == 6){
            checkButton.disabled = true
            checkButton.style.opacity = 0.5
            mainTitle.innerHTML = "Вы проиграли! Секретное слово было: "+secretWord
        }

    }
    userInput.select()
}

newGame.onclick = function (){
    if (mode == 'solo'){
        mainTitle.innerHTML = 'Виселица'
        secretWord = words[Math.floor(Math.random()*words.length)]
        startGame()


    }
    else{
        mainTitle.innerHTML = 'Виселица для двоих'
        wordModal.style.transform = 'translate(0%)'
    }

}


settings.onclick = function (){
    // console.log('Настройки')
    modal.style.transform = 'translateY(0%)'

}

modal.onclick = function (){
    modal.style.transform = 'translateY(-100%)'

}

modal.children[0].onclick = function (event){
    event.stopPropagation();

}


solo.onclick = function (){

    mode = 'solo'
    secretWord = words[Math.floor(Math.random()*words.length)]
    // console.log('Одиночная Игра')
    modal.style.transform = 'translateY(-100%)'
    mainTitle.innerHTML = 'Виселица'
    startGame()
}

multi.onclick = function (){

    mode = 'multi'
    // console.log('Мульти Игра')
    modal.style.transform = 'translateY(-100%)'
    mainTitle.innerHTML = 'Виселица для двоих'
    wordModal.style.transform = 'translateY(0%)'
    
}

guess.onclick = function (){
    
    // console.log(wordInput.value)
    wordModal.style.transform = 'translateY(-100%)'
    secretWord = wordInput.value
    startGame()
 

}



function startGame (){
    refreshSecretArray()
    stars.innerHTML = secretArray.join('')
    // stars.innerHTML = "*".repeat(secretWord.length)
    imgNumber = 0
    img.src = "/img/hangman0.png"
    letters.innerHTML = "Правила: Вводи буквы чтобы угадать слово!"
    usedLetters = ""
    userInput.select()
    checkButton.disabled = false
    checkButton.style.opacity = 1

}