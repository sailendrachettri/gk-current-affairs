let todayDateTime = document.getElementById("todayDateTime");
function updateDateTime() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const year = currentDate.getFullYear();
    let hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    let second = currentDate.getSeconds();

    const suffix = (hour >= 12) ? 'pm' : 'am';
    hour = (hour > 12) ? hour - 12 : hour;
    hour = (hour === 0) ? 12 : hour;

    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}, ${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second} ${suffix}`;
    todayDateTime.innerHTML = formattedDate;
    setTimeout(updateDateTime, 1000); // Update every second
}

function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}
updateDateTime();
