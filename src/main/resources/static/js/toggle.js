class ToggleService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ToggleService();
        }
        return this.#instance;
    }

    header() {
        const header = document.querySelector(".header")
        const loginData = PrincipalApi.getInstance().getPrincipal();
        // console.log(loginData);

        header.innerHTML = `
        ${loginData == null
            ? `
            <nav class="navbar navbar-expand-md bg-dark navbar-dark">
                <a class="navbar-brand" href="#">Typing Game</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/account/login">로그인</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">마이페이지</a>
                        </li>
                    </ul>
                </div>
            </nav>
            `
            : `
            <nav class="navbar navbar-expand-md bg-dark navbar-dark">
                <a class="navbar-brand" href="#">Typing Game</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/account/logout">로그아웃</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">마이페이지</a>
                        </li>
                    </ul>
                </div>
            </nav>
            `
        }
        `
    }

    footer() {
        const footer = document.querySelector(".footer");

        footer.innerHTML = `
            <div class="footer-content">
                <p>footer 영역</p>
            </div>
        `
    }

}