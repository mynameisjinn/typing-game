const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const startElement = document.getElementById('start');
const reloadElement= document.getElementById('reload');

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
        const totalTimeTaken = timeInSeconds;
        const quoteText = quoteDisplayElement.innerText.trim();
        const totalCharacters = quoteText.length;
        const typingSpeed = calculateTypingSpeed(totalCharacters, totalTimeTaken);

        // Updated: Remove the input event listener to prevent further typing
        quoteInputElement.removeEventListener('input', handleInput);

        // Updated: Disable the input field to freeze the screen
        quoteInputElement.disabled = true;

        stopTimer();

        Swal.fire({
          title: '게임이 끝났습니다! 결과를 저장하시겠습니까?',
          html: `타자 속도: ${typingSpeed} CPM \n`,
          showDenyButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })

    }

});

function handleInput() {
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
let isTimerRunning = false;

function startButton() {
  if (!isTimerRunning) {
    getRandomQuote().then(() => {
      renderNewQuote();
      // startTimer();
      quoteInputElement.disabled = false;
    });
  }
}

function reloadButton() {
  // window.location.reload();
  clearInterval(timerInterval);
  getRandomQuote().then(() => {
    renderNewQuote();
    // startTimer();
    quoteInputElement.disabled = false;
  });
}

function quoteInputClick() {
  startTimer();
}


function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  isTimerRunning = true; // Update the timer state to running
  timerInterval = setInterval(() => {
    timerElement.innerText = getTimerTime();
  }, 1000);

  // return timerInterval;
}

function stopTimer() {
  clearInterval(timerInterval); // Stop the timer by clearing the interval
  isTimerRunning = false; // Update the timer state to paused
}

// function getTimerTime() {
//   return Math.floor((new Date() - startTime) / 1000);
// }
let timeInSeconds = 0;

function getTimerTime() {
  timeInSeconds = Math.floor((new Date() - startTime) / 1000);

  if (timeInSeconds < 60) {
    // If less than 60 seconds, display only seconds
    return timeInSeconds + ' 초';
  } else {
    // If 60 seconds or more, convert to minutes and seconds
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    if (seconds === 0) {
      return minutes + ' 분';
    } else {
      return minutes + ' 분 ' + seconds + ' 초';
    }
  }
}


function init() {
  startElement.addEventListener('click', startButton); // Add event listener to the Start button
  reloadElement.addEventListener('click', reloadButton);
  quoteInputElement.addEventListener('click', quoteInputClick);
  quoteInputElement.disabled = true;
}

init();