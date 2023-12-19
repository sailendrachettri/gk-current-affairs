const url = 'https://current-affairs-of-india.p.rapidapi.com/recent';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ae0cc1874emshef71295615a96cdp1138fcjsnc123ec78923c',
        'X-RapidAPI-Host': 'current-affairs-of-india.p.rapidapi.com'
    }
};

async function fetchData() {

    try {
        const response = await fetch(url, options);
        const result = await response.text();

        // -----------------------TO STORE PREVIOUS DATA-----------------------
        let previousCurrentAffairs = [];
        previousCurrentAffairs.push(result.split('"')[1])
        previousCurrentAffairs.push(result.split('"')[3])
        previousCurrentAffairs.push(result.split('"')[5])
        previousCurrentAffairs.push(result.split('"')[7])
        previousCurrentAffairs.push(result.split('"')[9])
        previousCurrentAffairs.push(result.split('"')[11])

        previousCurrentAffairs = JSON.stringify(previousCurrentAffairs);
        localStorage.setItem("previousCurrentAffairs", previousCurrentAffairs);

    } catch (error) {
        console.error(error);
    }
}
fetchData();

// --------------------------RETRIVE PREVIOUS UEAR DATA--------------------------
let previousCurrentAffairs = localStorage.getItem("previousCurrentAffairs");
previousCurrentAffairs = JSON.parse(previousCurrentAffairs);

for (let i = 0; i < previousCurrentAffairs.length; i++) {
    let elementId = "currentAffair" + i;
    let quizElement = document.getElementById(elementId);
    // return null if there is no such ID
    if (quizElement !== null) {
        // console.log(previousCurrentAffairs[i]);
        quizElement.innerHTML = (previousCurrentAffairs[i]);
    }
}