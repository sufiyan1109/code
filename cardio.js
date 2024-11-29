document.addEventListener("DOMContentLoaded", () => {
    const activityForm = document.getElementById("activity-form");
    const logList = document.getElementById("log-list");
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");
    const dateInput = document.getElementById("date");
    const dayInput = document.getElementById("day");
  
    const dailyGoal = 120; // Daily goal in minutes
    const weeklyData = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };
  
    let activities = [];
  
    // Initialize Chart.js
    const ctx = document.getElementById("progress-chart").getContext("2d");
    const progressChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(weeklyData),
        datasets: [{
          label: "Minutes of Activity",
          data: Object.values(weeklyData),
          backgroundColor: "rgba(69, 255, 202, 0.6)",
          borderColor: "rgba(69, 255, 202, 1)",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  
    const updateProgress = () => {
      const selectedDay = dayInput.value;
      const totalDuration = weeklyData[selectedDay];
      const progressPercent = Math.min((totalDuration / dailyGoal) * 100, 100);
      progressFill.style.width = `${progressPercent}%`; // Fixed string interpolation
      progressText.textContent = `${totalDuration} / ${dailyGoal} mins (Goal)`; // Fixed string interpolation
  
      // Update the chart
      progressChart.data.datasets[0].data = Object.values(weeklyData);
      progressChart.update();
    };
  
    const renderActivities = () => {
      const selectedDate = dateInput.value;
      logList.innerHTML = '';
      const filteredActivities = activities.filter(activity => activity.date === selectedDate);
  
      filteredActivities.forEach(activity => {
        const logItem = document.createElement("li");
        logItem.textContent = `${activity.name} - ${activity.duration} min`; // Fixed string interpolation
        logList.appendChild(logItem);
      });
  
      updateProgress();
    };
  
    activityForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const activityName = document.getElementById("activity").value;
      const duration = parseInt(document.getElementById("duration").value, 10);
      const date = dateInput.value;
      const day = dayInput.value;
  
      if (activityName && duration && date && day) {
        activities.push({ name: activityName, duration, date });
        weeklyData[day] += duration;
        renderActivities();
        activityForm.reset();
      } else {
        alert("Please fill out all fields!");
      }
    });
  
    dateInput.addEventListener("change", renderActivities);
    dayInput.addEventListener("change", updateProgress);
  });
  