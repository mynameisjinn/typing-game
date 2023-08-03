window.onload = () => {
    PrincipalService.getInstance().loadLogin();

    quoteInputElement.disabled = true;
    MainPageService.getInstance().getRandomQuote();
    MainPageService.getInstance().addEventInput();
    MainPageService.getInstance().quoteInputClick();
    MainPageService.getInstance().addReloadButton();
}

const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const reloadElement = document.getElementById('reload');


class MainPageApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
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
            },
            error: error => {
                console.log(error);
            }
        })

        return responseData;
    }

    addResult(speed, quotesId) {

        let responseData = null;

        $.ajax({
            async: false,
            type: "post",
            url: "http://localhost:8090/api/typing/result/{quotesId}",
            dataType: "json",
            success: response => {
                responseData = response;
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
        if (this.#instance == null) {
            this.#instance = new MainPageService();
        }
        return this.#instance;
    }

    getRandomQuote() {
        quoteDisplayElement.innerHTML = '';

        const responseData = MainPageApi.getInstance().searchQuotes();
        const randomIndex = Math.floor(Math.random() * responseData.length);
        const randomQuote = responseData[randomIndex];
        const randomQuoteContentKo = randomQuote.contentKo;

        // 값 받기 test
        const principal =  PrincipalApi.getInstance().getPrincipal();

        console.log(randomQuote.quotesId);
        console.log(principal.user.userId);

//        const resultData = MainPageApi.getInstance().addResult();
//        console.log(resultData);

        // 랜덤 인용구를 <span> 태그로 나눈다
        randomQuoteContentKo.split('').forEach(character => {
            const characterSpan = document.createElement('span')
            characterSpan.innerText = character
            quoteDisplayElement.appendChild(characterSpan)
        })
        quoteInputElement.value = null;
    }

    addEventInput() {
        quoteInputElement.addEventListener('input', () => {
            const arrayQoute = quoteDisplayElement.querySelectorAll('span')
            const arrayValue = quoteInputElement.value.split('')

            const addResult =  MainPageApi.getInstance().addResult()
//            const quotesId = this.randomQuote.quotesId;

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

            if (correct) {
                const totalTimeTaken = this.timeInSeconds;
                const quoteText = quoteDisplayElement.innerText.trim();
                const totalCharacters = quoteText.length;
                const typingSpeed = this.calculateTypingSpeed(totalCharacters, totalTimeTaken);

                const handleInput = this.handleInput();
                quoteInputElement.removeEventListener('input', handleInput);

                quoteInputElement.disabled = true;

                this.stopTimer();

                Swal.fire({
                    title: '게임이 끝났습니다! 결과를 저장하시겠습니까?',
                    html: `타자 속도: ${typingSpeed} CPM \n`,
                    showDenyButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't save`,
                }).then((result) => {
                    if (result.isConfirmed) {
                         addResult(`${typingSpeed}`, quotesId);
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
        return charactersPerMinute.toFixed(2);
    }

    handleInput() {
        this.charactersTyped++;
        const totalTimeTaken = this.getTimerTime();
        const cpm = this.calculateTypingSpeed(this.charactersTyped, totalTimeTaken);
    }

    constructor() {
        this.startTime = null;
        this.isTimerRunning = false;
        this.timeInSeconds = 0;
        this.timerInterval = false;
    }

    getTimerTime() {
        this.timeInSeconds = Math.floor((new Date() - this.startTime) / 1000);

        if (this.timeInSeconds < 60) {
            return this.timeInSeconds + ' 초';
        } else {
            const minutes = Math.floor(this.timeInSeconds / 60);
            const seconds = this.timeInSeconds % 60;

            if (seconds === 0) {
                return minutes + ' 분';
            } else {
                return minutes + ' 분 ' + seconds + ' 초';
            }
        }
    }

    startTimer() {
        timerElement.innerText = 0;
        this.startTime = new Date();
        this.isTimerRunning = true;
        this.timerInterval = setInterval(() => {
            timerElement.innerText = this.getTimerTime();
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.isTimerRunning = false;
    }

    addReloadButton() {
        reloadElement.onclick = () => {
//            clearInterval(this.timerInterval);
//            this.getRandomQuote();
//            this.isTimerRunning = true
            location.reload();
        }
    }


    quoteInputClick() {
        if (quoteInputElement.disabled == true) {
            const handleKeyDown = () => {
                this.startTimer();
                quoteInputElement.removeEventListener('keydown',handleKeyDown);
            };
            quoteInputElement.addEventListener('keydown',handleKeyDown);
            quoteInputElement.disabled = false;
        }


    }
}