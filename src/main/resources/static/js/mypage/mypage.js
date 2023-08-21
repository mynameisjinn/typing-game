window.onload = () => {
    MypageService.getInstance().searchResults();
}

class MyPageApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new MyPageApi();
        }
        return this.#instance;
    }

    getResult() {
        let responseDate = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8090/api/typing/result",
            contentType: "json",
            success: response => {
                responseDate = response;
            },
            error: error => {
                console.log(error);
            }
        });

        return responseDate;
    }


}
class MypageService {

    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MypageService();
        }
        return this.#instance;
    }

    searchResults(){
        const resultBtn = document.getElementById('myResultBtn');
        const responseData = MyPageApi.getInstance().getResult();

        resultBtn.addEventListener("click", () => {
            const content = document.createElement('div');

            content.innerHTML = `${responseData}`;

        })
    }
}
