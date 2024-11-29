document.addEventListener("DOMContentLoaded", () => {
    // Data for Activity Trends
    const ctx = document.getElementById("activity-chart").getContext("2d");
    const activityChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: "Calories Burned",
            data: [400, 500, 450, 600, 700, 800, 750],
            backgroundColor: "rgba(69, 255, 202, 0.2)",
            borderColor: "rgba(69, 255, 202, 1)",
            borderWidth: 2,
          },
          {
            label: "Hydration (L)",
            data: [2.5, 3, 3.5, 3, 3.8, 4, 3.6],
            backgroundColor: "rgba(45, 150, 200, 0.2)",
            borderColor: "rgba(45, 150, 200, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "white" },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
          },
          y: {
            ticks: { color: "white" },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
          },
        },
      },
    });
  });