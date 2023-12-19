const url2 = 'https://current-affairs-of-india.p.rapidapi.com/today-quiz';
const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ae0cc1874emshef71295615a96cdp1138fcjsnc123ec78923c',
        'X-RapidAPI-Host': 'current-affairs-of-india.p.rapidapi.com'
    }
};

let quiz0 = document.getElementById('quiz0');

async function questionOfTheDay() {
    try {
        const response2 = await fetch(url2, options2);
        const result2 = await response2.text();

        // -----------------TO STORE PREVIOUS DATA IN LOCALSTORAGE-----------------
        let previousQuizzesData = result2.split("{")[1];
        localStorage.setItem("previousQuizzesData", previousQuizzesData);

    } catch (error) {
        console.error(error);
    }
}
questionOfTheDay();

// ------------------------TO RETRIEVE PREVIOUS DATA--------------------------
let retreveQuizzesData = localStorage.getItem("previousQuizzesData");
if (retreveQuizzesData == null)
    retreveQuizzesData = "Today's quiz is being loading...";

quiz0.innerHTML = removeTabsAndNewlines(retreveQuizzesData);

// a function to remove unnecessay tabs, newlines characters etc 
function removeTabsAndNewlines(str) {
    return str.replace(/question|"|:|},|]|}/g, '').replace(/\\/g, '"');
}