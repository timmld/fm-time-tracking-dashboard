const allTimeSelectors = document.querySelectorAll(".t-grid__controls li");
const allTimeDivs = document.querySelectorAll(".t-grid__category-stats > div:not(.t-grid__category-stats__header)");

const allDailyCurrentStats = document.querySelectorAll(".t-grid__category-stats__daily .t-grid__category-stats__current");
const allDailyPreviousStats = document.querySelectorAll(".t-grid__category-stats__daily .t-grid__category-stats__previous");
const allWeeklyCurrentStats = document.querySelectorAll(".t-grid__category-stats__weekly .t-grid__category-stats__current");
const allWeeklyPreviousStats = document.querySelectorAll(".t-grid__category-stats__weekly .t-grid__category-stats__previous");
const allMonthlyCurrentStats = document.querySelectorAll(".t-grid__category-stats__monthly .t-grid__category-stats__current");
const allMonthlyPreviousStats = document.querySelectorAll(".t-grid__category-stats__monthly .t-grid__category-stats__previous");

// On click
allTimeSelectors.forEach((timeSelector) => {
    timeSelector.addEventListener("click", (event) => {
        let selectedTimeSelector = event.target;
        if (!selectedTimeSelector.classList.contains("t-control--active")) {
            // Highlight active
            allTimeSelectors.forEach((selectorItem) => {
                selectorItem.classList.remove("t-control--active");
            });
            selectedTimeSelector.classList.add("t-control--active");
            // Hide & Show divs
            allTimeDivs.forEach((timeDiv) => {
                let timeGranularity = selectedTimeSelector.classList[0].match(/(daily|weekly|monthly)/g)[0];
                if (timeDiv.classList[0].includes(timeGranularity)) {
                    timeDiv.classList.remove("t-hidden");
                } else {
                    timeDiv.classList.add("t-hidden");
                };
            });
        };
    });
});

// Fetch on load
fetch("./data/data.json")
    .then(response => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            allDailyCurrentStats[i].textContent = `${data[i].timeframes.daily.current}hrs`;
            allDailyPreviousStats[i].textContent = `Last Day - ${data[i].timeframes.daily.previous}hrs`;
            allWeeklyCurrentStats[i].textContent = `${data[i].timeframes.weekly.current}hrs`;
            allWeeklyPreviousStats[i].textContent = `Last Week - ${data[i].timeframes.weekly.previous}hrs`;
            allMonthlyCurrentStats[i].textContent = `${data[i].timeframes.monthly.current}hrs`;
            allMonthlyPreviousStats[i].textContent = `Last Month - ${data[i].timeframes.monthly.previous}hrs`;
        };
    });