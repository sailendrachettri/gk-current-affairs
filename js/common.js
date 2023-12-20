function deleteCachingData() {
    let choice = confirm("You are going to delete previous content and reload!");
    if (choice) {
        localStorage.removeItem('previousHistoryData');
        localStorage.removeItem('previousQuizzesData');
        localStorage.removeItem('previousCurrentAffairs');
        location.reload();
    }
}