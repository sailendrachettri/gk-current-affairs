const url3 = 'https://current-affairs-of-india.p.rapidapi.com/history-of-today';
const options3 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ae0cc1874emshef71295615a96cdp1138fcjsnc123ec78923c',
        'X-RapidAPI-Host': 'current-affairs-of-india.p.rapidapi.com'
    }
};

let loadingIndicator = document.getElementById('loadingIndicator');

async function historyOfToday() {
    try {
        loadingIndicator.innerHTML = "Auto checking for new updates...";
        const response3 = await fetch(url3, options3);
        const result3 = await response3.text();

        // checking for previous data stored
        let alreadyPresent = false;
        if (localStorage.getItem('previousHistoryData') != null) {
            alreadyPresent = true;
        }

        // ------------------------TO STORE PREVIOUS DATA--------------------------
        // store content
        let previousHistoryData = [];
        for (let i = 0; i < 5; i++) {
            previousHistoryData.push(result3.split("{")[i + 1])
        }

        previousHistoryData = JSON.stringify(previousHistoryData);
        localStorage.setItem("previousHistoryData", previousHistoryData);

        // ----------------------------PAGE LOADING INDICATOR----------------------------
        // idendify todays date
        let getYesterdaysDate = 0;
        let todaysDate = new Date();
        let getTodaysDateOnly = todaysDate.getDate();

        if (alreadyPresent == true) {
            // getting the previous year saved date from local storage
            getYesterdaysDate = localStorage.getItem("previousHistoryData");
            getYesterdaysDate = JSON.parse(getYesterdaysDate);
            getYesterdaysDate = removeNewlinesAndTabs(getYesterdaysDate[0]);

            getYesterdaysDate = (getTodaysDateOnly <= 9) ? getYesterdaysDate[0] : (getYesterdaysDate[0] + getYesterdaysDate[1]);

            // checking if localStorage is null or not - if null then user is serving content for first time
            // if not present then make it false and assume date as zero
            getYesterdaysDate = Number(getYesterdaysDate)
        }

        // if today and yesterday's date is not same the reload the page once
        if (alreadyPresent == false || getTodaysDateOnly != getYesterdaysDate) {
            loadingIndicator.innerHTML = "New information fetched successfully!";
            loadingIndicator.style.color = 'green';
            location.reload();

        } else {
            loadingIndicator.innerHTML = "Already updated successfully";
            loadingIndicator.style.color = 'green';
        }
        setInterval(() => {
            loadingIndicator.style.display = 'none'
        }, 3000);

    } catch (error) {
        console.error(error);
    }
}
historyOfToday();

// ------------------------TO RETRIEVE PREVIOUS DATA--------------------------
let retreveHistoryData = localStorage.getItem("previousHistoryData");
retreveHistoryData = JSON.parse(retreveHistoryData);

for (let i = 0; i < retreveHistoryData.length; i++) {
    let elementId = "history" + i;
    let historyElement = document.getElementById(elementId);
    // return null if there is no such ID
    if (historyElement !== null) {
        historyElement.innerHTML = removeNewlinesAndTabs(retreveHistoryData[i]);
    }
}

// A function to remove new line and tabs - extra unnecessary characters
function removeNewlinesAndTabs(str) {
    return str.replace(/(?:\\[tn])|},|"|date|description|:/g, '').replace(/,/, ' : ').replace(/\\/g, '"');
}