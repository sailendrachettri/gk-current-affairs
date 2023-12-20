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
        
        if (localStorage.getItem('previousHistoryData') != null) {
            let todaysDate = new Date().getDate();

            // getting the previous year saved date from local storage
            getYesterdaysDate = localStorage.getItem("previousHistoryData");
            getYesterdaysDate = JSON.parse(getYesterdaysDate);
            getYesterdaysDate = removeNewlinesAndTabs(getYesterdaysDate[0]);

            getYesterdaysDate = (todaysDate <= 9) ? getYesterdaysDate[0] : (getYesterdaysDate[0] + getYesterdaysDate[1]);
            getYesterdaysDate = Number(getYesterdaysDate);

            if(todaysDate != getYesterdaysDate)
            {
                loadingIndicator.innerHTML = "New information fetched successfully!";
                loadingIndicator.style.color = 'green';
                location.reload();
            } else{
                // if today and yesterday's date is not same the reload the page once
                loadingIndicator.innerHTML = "Already updated successfully";
                loadingIndicator.style.color = 'green';
                setInterval(() => {
                    loadingIndicator.style.display = 'none'
                }, 3000);
            }
        } else{
                loadingIndicator.innerHTML = "New information fetched successfully!";
                loadingIndicator.style.color = 'green';
                setTimeout(() => {
                    location.reload();
                }, 3000);
        }

        let previousHistoryData = [];
        for (let i = 0; i < 5; i++) {
            previousHistoryData.push(result3.split("{")[i + 1])
        }
        previousHistoryData = JSON.stringify(previousHistoryData);
        localStorage.setItem("previousHistoryData", previousHistoryData); 

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