// Get page divs by id
var num = document.getElementById('num')
var start = document.getElementById('start')
var results = document.getElementById('results')
var input = document.getElementById('input')
var textInput = document.getElementById('text-input')

var numArray = []
var testLen = 4

// Set time to wait numbers 
var screenTime = 1000
var waitTime = 200

//set visibility divs
input.setAttribute("hidden","")
num.setAttribute("hidden","")
results.setAttribute("hidden","")


document.getElementById("start-test").addEventListener("click", function() {
    start.setAttribute("hidden","")
    num.removeAttribute("hidden","")
    testSequence(testLen)
}, false);


function writeNum(numArray, i, testLen) {
    setTimeout(function () {
        num.innerHTML = numArray[i]
        testLen--
        i++
        setTimeout(function () {
            num.innerHTML = ""
        }, screenTime)
        if (testLen > 0) {
            writeNum(numArray, i, testLen)
        }
    }, screenTime + waitTime)
}


function testSequence(testLen) {
    numArray = Array.from({length: testLen}, () => Math.floor(Math.random() * 10))

    // Debug console random digits
    console.log("testLen: " + testLen)
    for (var i = 0; i < testLen; i++) {
        console.log(numArray[i])
    }    

    num.innerHTML = "Ready?"
    writeNum(numArray, 0, testLen)
    
    setTimeout(function () {
        input.removeAttribute("hidden","")
        textInput.focus()
    }, (testLen + 1) * (screenTime + waitTime))
}


function checkAnswer() {
    if (textInput.value == numArray.join("") && testLen <= 14) {
        // You can go on
        console.log(textInput.value + " = " + numArray.join(""))
        textInput.value = ""
        input.setAttribute("hidden","")
        testLen += 1
        testSequence(testLen)
    } else {
        // You have to stop
        console.log(textInput.value + " != " + numArray.join(""))
        input.setAttribute("hidden","")
        results.removeAttribute("hidden","")
        document.getElementById("your-answer").innerHTML = "Your answer: " + textInput.value
        document.getElementById("right-answer").innerHTML = "Right answer: " + numArray.join("")
        document.getElementById("final-score").innerHTML = testLen - 1
    }
}


document.getElementById("submit-answer").addEventListener("click", function() {
    checkAnswer()
}, false);

document.getElementById("text-input").onkeydown = function(e){
    if(e.keyCode == 13){
        checkAnswer()
    }
}