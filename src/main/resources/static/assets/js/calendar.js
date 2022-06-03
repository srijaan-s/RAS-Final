const date = new Date();

/* const for arrows (months)*/
const renderCalendar = () => {
    /* const for days*/
    date.setDate(1);
    console.log(date.getDate())

    const monthDays = document.querySelector(".days");

    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

    const prevLastDay = new Date(date.getFullYear(), date.getMonth(),0).getDate();

    const firstDayIndex = date.getDay()

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    /* tells us the current month */
    document.querySelector('.date h1').innerHTML = months[date.getMonth()];

    /* tells us the current day*/
    document.querySelector('.date p').innerHTML = new Date().toDateString();

    /* for displaying the days, use a loop */
    let days = "";

    for(let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for(let i=1; i <= lastDay; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today"> ${i} </div>`;
        } else {
            days += `<div> ${i} </div>`;
        }
    }

    for(let j=1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
    }

    monthDays.innerHTML = days;
}


/* arrows to change months */
document.querySelector('.prev').addEventListener('click', ()=>{
    date.setMonth(date.getMonth()-1);
    renderCalendar();
});

document.querySelector('.next').addEventListener('click', ()=>{
    date.setMonth(date.getMonth()+1);
    renderCalendar();
});

/* call calendar on global scope */
renderCalendar();