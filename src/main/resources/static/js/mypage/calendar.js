const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span"),
attButton = document.getElementById("attendance");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

let stamp = false;

attButton.addEventListener("click", () => {
    if (!stamp) { // 이미지를 추가한 적이 없는 경우
        const date = new Date(); // 현재 날짜 가져오기
        const today = date.getDate(); // 오늘 날짜

        const liElements = document.querySelectorAll(".calendar .days li");
        liElements.forEach(li => {
            const dayNumber = parseInt(li.textContent); // li 요소의 텍스트를 숫자로 변환
            const isToday = dayNumber === today;

            if (isToday) {
                // 이미지 요소 생성
                const image = document.createElement("img");
                image.src = "mnz_sticker.png";

                // 이미지 요소 스타일 설정
                image.style.maxWidth = "100%";
                image.style.maxHeight = "100%";
                image.style.display = "block"; // 이미지를 블록 요소로 표시

                // 이미지 컨테이너 생성
                const imageContainer = document.createElement("div");
                imageContainer.className = "image-container";
                imageContainer.style.position = "absolute";
                imageContainer.style.top = 0;
                imageContainer.style.left = 0;

                // 이미지 요소를 이미지 컨테이너에 추가
                imageContainer.appendChild(image);

                // 이미지 컨테이너를 li에 추가
                li.appendChild(imageContainer);
            }
        });

        stamp = true;
    } else {
        alert("오출완");
    }
});







