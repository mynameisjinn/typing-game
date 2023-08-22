//window.onload = () => {
//    PrincipalService.getInstance().loadLogin();
//}

class PrincipalApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new PrincipalApi();
        }
        return this.#instance;
    }

    getPrincipal() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8090/api/account/principal",
            dataType: "json",
            success: response => {
                responseData = response;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }
}

class PrincipalService {
    static #instance = null;
    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new PrincipalService();
        }
        return this.#instance;
    }

    loadLogin() {
        const userInfoElement = document.getElementById("user-info");
        const principal =  PrincipalApi.getInstance().getPrincipal();

        userInfoElement.innerHTML = `
            <a href="/mypage" class="user-name" id="user-name">${principal.user.name} 님</a>
            <span class="user-email" id="user-email">${principal.user.username}</span>
            <a class="logout" id="logout" href="/account/logout">Logout</a>
        `
    }
}