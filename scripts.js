const moodButtons = document.querySelectorAll(".mood-button");
const moodLists = document.getElementById("mood-list");

// Load stored moods on page load
document.addEventListener("DOMContentLoaded", function () {
    let moods = JSON.parse(localStorage.getItem("moodHistory")) || [];
    moods.forEach(entry => {
        addMoodToHistory(entry.mood, entry.date, entry.time, false);
    });
});

moodButtons.forEach(button => {
    button.addEventListener("click", () => {
        const mood = button.getAttribute("data-mood");
        addMoodToHistory(mood);
    });
});

function addMoodToHistory(mood, storedDate = null, storedTime = null, saveToStorage = true) {
    const moodItem = document.createElement('li');
    const now = new Date();
    const date = storedDate || now.toLocaleDateString();
    const time = storedTime || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    moodItem.innerHTML = `<span>${mood}</span> <span>${date} ${time}</span>`;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", function () {
        moodLists.removeChild(moodItem);
        removeMoodFromLocalStorage(mood, date, time);
    });

    moodItem.appendChild(deleteBtn);
    moodLists.appendChild(moodItem);

    // Save to LocalStorage if it's a new mood entry
    if (saveToStorage) {
        saveMoodToLocalStorage(mood, date, time);
    }
}

function saveMoodToLocalStorage(mood, date, time) {
    let moods = JSON.parse(localStorage.getItem("moodHistory")) || [];
    moods.push({ mood, date, time });
    localStorage.setItem("moodHistory", JSON.stringify(moods));
}

function removeMoodFromLocalStorage(mood, date, time) {
    let moods = JSON.parse(localStorage.getItem("moodHistory")) || [];
    moods = moods.filter(entry => !(entry.mood === mood && entry.date === date && entry.time === time));
    localStorage.setItem("moodHistory", JSON.stringify(moods));
}
