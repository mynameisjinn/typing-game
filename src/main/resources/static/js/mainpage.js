window.onload = () => {

    MainPageService.getInstance().getRandomQuote();
    MainPageService.getInstance().addEventInput();
    MainPageService.getInstance().quoteInputClick();
    MainPageService.getInstance().addStartButton();

}

const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const startElement = document.getElementById('start');
const reloadElement= document.getElementById('reload');

const isTimerRunning = false;

class MainPageApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MainPageApi();
        }
        return this.#instance;
    }

    searchQuotes() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8090/api/quotes/search",
            dataType: "json",
            success: response => {
                responseData = response;
                // console.log(response);
            },
            error: error => {
                console.log(error);
            }
        })

        return responseData;
    }
}

class MainPageService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MainPageService();
        }
        return this.#instance;
    }

    getRandomQuote() {
        const responseData = MainPageApi.getInstance().searchQuotes();
        const randomIndex = Math.floor(Math.random() * responseData.length);
        const randomQuote = responseData[randomIndex];
        const randomQuoteContentKo = randomQuote.contentKo;

        // console.log(randomQuoteContentKo);

        // 랜덤 인용구를 <span> 태그로 나눈다
        randomQuoteContentKo.split('').forEach(character => {
            const characterSpan = document.createElement('span')
            characterSpan.innerText = character
            quoteDisplayElement.appendChild(characterSpan)
            // console.log(characterSpan);
        })
        quoteInputElement.value = null;


        // console.log(responseData);

        // quoteDisplayElement.innerHTML = `
        //     <div>${randomQuote.contentKo}<div>
        // `
    }

    addEventInput() {
        quoteInputElement.addEventListener('input', () => {
            const arrayQoute = quoteDisplayElement.querySelectorAll('span')
            const arrayValue = quoteInputElement.value.split('')

            let correct = true
            let charactersTyped = 0

            arrayQoute.forEach((characterSpan, index) => {
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

            if(correct) {
                const timeInSeconds = 0;
                const totalTimeTaken = timeInSeconds;
                const quoteText = quoteDisplayElement.innerText.trim();
                const totalCharacters = quoteText.length;
                const typingSpeed =  this.calculateTypingSpeed(totalCharacters, totalTimeTaken);

                const handleInput = this.handleInput();
                quoteInputElement.removeEventListener('input', handleInput);

                // Updated: Disable the input field to freeze the screen
                quoteInputElement.disabled = true;

                // stopTimer();

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

        })
    }

    calculateTypingSpeed(totalCharacters, timeTaken) {
        const charactersPerMinute = (totalCharacters / timeTaken) * 60;
        return charactersPerMinute .toFixed(2);
    }

    handleInput() {
        this.charactersTyped++;
        const totalTimeTaken = this.getTimerTime();
        const cpm = this.calculateTypingSpeed(this.charactersTyped, totalTimeTaken);
        // displayCPM(cpm)
    }

    constructor() {
        this.startTime = null;
        this.isTimerRunning = false;
    }

    getTimerTime() {
        let timeInSeconds = 0;
        // let startTime = new Date();
        timeInSeconds = Math.floor((new Date() - this.startTime) / 1000);
        console.log(new Date() - this.startTime)
        console.log(this.startTime)
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

    startTimer() {
        // const startTime = new Date();
        timerElement.innerText = 0;
        this.startTime = new Date();
        this.isTimerRunning = true;
        const timerInterval = setInterval(() => {
            timerElement.innerText = this.getTimerTime();
        }, 1000);
    }

    // isTimerRunning = false;
    addStartButton() {

        startElement.onclick = () => {
            quoteInputElement.disabled = false;
        }
    }

    quoteInputClick() {
        this.startTimer();
    }

