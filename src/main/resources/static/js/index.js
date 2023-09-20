window.onload = () => {
    console.log("index.js 실행됨");

    ToggleService.getInstance().header();
    ToggleService.getInstance().footer();

    quoteInputElement.disabled = true;
    MainPageService.getInstance().getRandomQuote();
    MainPageService.getInstance().addEventInput();
    MainPageService.getInstance().quoteInputClick();
    MainPageService.getInstance().addReloadButton();

}