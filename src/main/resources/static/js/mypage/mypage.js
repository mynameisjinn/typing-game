window.onload = () => {
    PrincipalApi.getInstance().getPrincipal();
    MypageService.getInstance().searchResults();
}

const searchObj = {

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
            data: searchObj,
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
//        const principal = PrincipalApi.getInstance().getPrincipal();

        resultBtn.addEventListener("click", () => {

            console.log("ok");
            console.log(responseData);

        })
    }
}
