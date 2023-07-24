const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const startElement = document.getElementById('start');
const pauseElement = document.getElementById('pause');

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')

    let correct = true
    let charactersTyped = 0
    let timerInterval;

    arrayQuote.forEach((characterSpan, index) => {
      const character = arrayValue[index]
      if (character == null) {
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
        correct = false
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')
      } else {
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
        correct = false
      }
    })

    if (correct) {
        const totalTimeTaken = getTimerTime();
        const quoteText = quoteDisplayElement.innerText.trim();
        const totalCharacters = quoteText.length;
        const typingSpeed = calculateTypingSpeed(totalCharacters, totalTimeTaken);

        // Updated: Remove the input event listener to prevent further typing
        quoteInputElement.removeEventListener('input', handleInput);

        // Updated: Stop the timer by clearing the interval
        clearInterval(timerInterval);

        // Updated: Disable the input field to freeze the screen
        quoteInputElement.disabled = true;

        // Updated: Display the typing speed and reload after a delay to give time to see the result
        displayResult(`종료! 타자 속도: ${typingSpeed} CPM`);
        setTimeout(() => {
            window.location.reload();
        }, 300000);

        clearInterval(getTimerTime);

        // alert(`종료! 타자 속도: ${typingSpeed} CPM`);
        // window.location.reload();
    }
    // else {
    //     // Update charactersTyped and calculate real-time CPM
    //     charactersTyped++;
    //     const totalTimeTaken = getTimerTime();
    //     const cpm = calculateTypingSpeed(charactersTyped, totalTimeTaken);
    //     displayCPM(cpm);
    // }
});

function handleInput() {
    // ... (previous input event handling code)

    // Updated: Calculate real-time CPM
    charactersTyped++;
    const totalTimeTaken = getTimerTime();
    const cpm = calculateTypingSpeed(charactersTyped, totalTimeTaken);
    displayCPM(cpm);
}

function calculateTypingSpeed(totalCharacters, timeTaken) {
    const charactersPerMinute  = (totalCharacters / timeTaken) * 60;
    return charactersPerMinute .toFixed(2);
}

function displayCPM(cpm) {
    const cpmDisplayElement = document.getElementById('div');
    cpmDisplayElement.innerText = cpm;
}

function displayResult(result) {
    // Create a new element to display the result
    const resultElement = document.getElementById('cpmDisplay');
    resultElement.textContent = result;
    document.body.appendChild(resultElement);
}

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
      const characterSpan = document.createElement('span')
      characterSpan.innerText = character
      quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
}

let startTime;

function startButton() {
    getRandomQuote().then(() => {
        renderNewQuote();
        startTimer();
        quoteInputElement.disabled = false;
      });
}

function pauseButton() {

}


function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

function init() {
  startElement.addEventListener('click', startButton); // Add event listener to the Start button
  pauseElement.addEventListener('click', pauseButton);
  quoteInputElement.disabled = true;
}

init();