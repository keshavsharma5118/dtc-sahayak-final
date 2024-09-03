function updateDateTime() {
    const dateTimeElements = document.querySelectorAll("#datetime");
    const now = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-GB', options);
    const formattedTime = now.toTimeString().split(' ')[0].slice(0, 8);  // Includes HH:MM:SS

    dateTimeElements.forEach(element => {
        element.textContent = `${formattedDate.replace(/ /g, '-')} || ${formattedTime}`;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);  // Update every second
});
