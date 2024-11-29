const activityCalorieRates = {
  Running: 10,
  Cycling: 7,
  Swimming: 8,
  Yoga: 3,
  Weightlifting: 8
};

const activityForm = document.getElementById("activityForm");
const activitySelect = document.getElementById("activitySelect");
const durationInput = document.getElementById("duration");
const caloriesBurnedInput = document.getElementById("caloriesBurned");
const totalDurationElement = document.getElementById("totalDuration");
const totalCaloriesElement = document.getElementById("totalCalories");
const activityTable = document.getElementById("activityTable");

let totalDuration = 0;
let totalCalories = 0;
let activities = JSON.parse(localStorage.getItem("activities")) || [];

// Load saved activities on page load
window.addEventListener("load", () => {
  activities.forEach(activity => {
    addActivityRow(activity);
    totalDuration += activity.duration;
    totalCalories += activity.caloriesBurned;
  });
  updateSummary();
});

// Auto-calculate calories burned when activity and duration are provided
durationInput.addEventListener("input", () => {
  const selectedActivity = activitySelect.value;
  const duration = parseInt(durationInput.value);

  if (selectedActivity && duration > 0) {
    const caloriesBurned = duration * activityCalorieRates[selectedActivity];
    caloriesBurnedInput.value = caloriesBurned;
  } else {
    caloriesBurnedInput.value = ""; // Clear if invalid
  }
});

activityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedActivity = activitySelect.value;
  const duration = parseInt(durationInput.value);

  if (!selectedActivity || isNaN(duration) || duration <= 0) {
    alert("Please select a valid activity and enter a positive duration.");
    return;
  }

  const caloriesBurned = duration * activityCalorieRates[selectedActivity];

  const activity = {
    name: selectedActivity,
    duration,
    caloriesBurned
  };

  activities.push(activity);
  totalDuration += duration;
  totalCalories += caloriesBurned;

  addActivityRow(activity);
  updateSummary();

  saveActivitiesToLocalStorage();

  activityForm.reset();
});

function addActivityRow(activity) {
  const tableBody = activityTable.querySelector("tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${activity.name}</td>
    <td>${activity.duration}</td>
    <td>${activity.caloriesBurned}</td>
  `;
  tableBody.appendChild(newRow);
}

function updateSummary() {
  totalDurationElement.textContent = totalDuration;
  totalCaloriesElement.textContent = totalCalories;
}

function saveActivitiesToLocalStorage() {
  localStorage.setItem("activities", JSON.stringify(activities));
}
