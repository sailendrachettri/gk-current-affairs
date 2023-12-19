function deleteCachingData() {
    let choice = confirm("You are going to delete previous content and reload!");
    if (choice) {
        localStorage.clear();
        location.reload();
    }
}