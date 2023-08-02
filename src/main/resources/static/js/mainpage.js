window.onload = () => {

    MainPageService.getInstance().loadQuotes();

}

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
                console.log(response);
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

    loadQuotes() {
        const quoteDisplayElement = document.getElementById('quoteDisplay');
        const quoteInputElement = document.getElementById('quoteInput');
        const responseData = MainPageApi.getInstance().searchQuotes();
        console.log(responseData);

        quoteDisplayElement.innerHTML = `
            <div>${responseData[0].contentKo}<div>
        `
    }




}