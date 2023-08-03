window.onload = () => {
    PrincipalService.getInstance().loadLogin();
}

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
//        const loginUserElement = document.getElementById("user-email");
//        const loginUserElement = document.getElementById("user-email");
        const principal =  PrincipalApi.getInstance().getPrincipal();

        userInfoElement.innerHTML = `
            <span class="user-name" id="user-name">${principal.user.name} 님</span>
            <span class="user-email" id="user-email">${principal.user.username}</span>
            <a class="logout" id="logout" href="/logout">Logout</a>
        `
    }
}