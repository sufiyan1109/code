document.addEventListener("DOMContentLoaded", () => {
    const workoutForm = document.getElementById("workout-form");
    const exerciseList = document.getElementById("exercise-list");
    const weeklyPlan = document.getElementById("weekly-plan");
    let selectedExercises = [];

    // Handle Form Submission
    workoutForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const goal = document.getElementById("goal").value;
        const fitnessLevel = document.getElementById("fitness-level").value;
        const duration = document.getElementById("duration").value;
        const daysPerWeek = document.getElementById("days-per-week").value;
        const intensity = document.getElementById("intensity").value;

        alert(`Your plan: Goal - ${goal}, Level - ${fitnessLevel}, Duration - ${duration} mins, Days per week - ${daysPerWeek}, Intensity - ${intensity}`);

        // Create Weekly Plan
        generateWeeklyPlan(daysPerWeek);
    });

    // Generate Weekly Plan
    function generateWeeklyPlan(days) {
        weeklyPlan.innerHTML = ""; // Clear previous plan
        const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        for (let i = 0; i < days; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = daysOfWeek[i];
            dayDiv.classList.add("day-slot");
            dayDiv.addEventListener("click", () => addExerciseToDay(dayDiv));
            weeklyPlan.appendChild(dayDiv);
        }
    }

    // Add Exercise to Selected Day
    function addExerciseToDay(dayDiv) {
        if (selectedExercises.length === 0) {
            alert("Please select exercises first!");
            return;
        }

        const randomExercise = selectedExercises[Math.floor(Math.random() * selectedExercises.length)];
        const exerciseText = document.createElement("p");
        exerciseText.textContent = randomExercise;
        dayDiv.appendChild(exerciseText);
    }

    // Exercise Library Selection
    exerciseList.addEventListener("click", function (e) {
        if (e.target.classList.contains("exercise-item")) {
            const exerciseName = e.target.getAttribute("data-name");
            if (!selectedExercises.includes(exerciseName)) {
                selectedExercises.push(exerciseName);
                e.target.style.backgroundColor = "#d4edda"; // Highlight selected exercise
            } else {
                selectedExercises = selectedExercises.filter(item => item !== exerciseName);
                e.target.style.backgroundColor = "#fff"; // Remove highlight
            }
        }
    });
});
