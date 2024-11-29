const nutritionForm = document.getElementById("nutritionForm");
const mealList = document.getElementById("mealList");
const totalCalories = document.getElementById("totalCalories");
const totalProtein = document.getElementById("totalProtein");
const totalCarbs = document.getElementById("totalCarbs");
const totalFats = document.getElementById("totalFats");
const mealType = document.getElementById("mealType");
const foodItemsDiv = document.getElementById("foodItems");

let meals = JSON.parse(localStorage.getItem("meals")) || [];

const foodData = {
    Breakfast: [
        { name: "Eggs", calories: 140, protein: 12, carbs: 1, fats: 9 },
        { name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fats: 3 },
        { name: "Banana", calories: 105, protein: 1, carbs: 27, fats: 0 },
        { name: "Toast", calories: 80, protein: 3, carbs: 15, fats: 1 },
        { name: "Yogurt", calories: 100, protein: 10, carbs: 15, fats: 3 },
        { name: "Smoothie", calories: 200, protein: 4, carbs: 30, fats: 5 },
        { name: "Apple", calories: 95, protein: 0, carbs: 25, fats: 0 },
        { name: "Cottage Cheese", calories: 100, protein: 11, carbs: 3, fats: 4 },
        { name: "Granola", calories: 200, protein: 5, carbs: 30, fats: 7 },
        { name: "Almonds", calories: 160, protein: 6, carbs: 6, fats: 14 }
    ],
    Lunch: [
        { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6 },
        { name: "Salad", calories: 150, protein: 3, carbs: 10, fats: 10 },
        { name: "Rice", calories: 200, protein: 4, carbs: 45, fats: 0.5 },
        { name: "Broccoli", calories: 50, protein: 4, carbs: 10, fats: 0.5 },
        { name: "Pasta", calories: 220, protein: 7, carbs: 42, fats: 1.5 },
        { name: "Quinoa", calories: 222, protein: 8, carbs: 39, fats: 3.5 },
        { name: "Tuna", calories: 120, protein: 26, carbs: 0, fats: 1 },
        { name: "Avocado", calories: 240, protein: 3, carbs: 12, fats: 22 },
        { name: "Sweet Potato", calories: 112, protein: 2, carbs: 26, fats: 0.1 },
        { name: "Hummus", calories: 80, protein: 2, carbs: 8, fats: 5 }
    ],
    Dinner: [
        { name: "Salmon", calories: 232, protein: 25, carbs: 0, fats: 14 },
        { name: "Chicken Thighs", calories: 280, protein: 24, carbs: 0, fats: 20 },
        { name: "Steak", calories: 242, protein: 22, carbs: 0, fats: 17 },
        { name: "Cauliflower", calories: 25, protein: 2, carbs: 5, fats: 0.2 },
        { name: "Zucchini", calories: 33, protein: 2, carbs: 6, fats: 0.2 },
        { name: "Rice", calories: 200, protein: 4, carbs: 45, fats: 0.5 },
        { name: "Spinach", calories: 23, protein: 3, carbs: 4, fats: 0.4 },
        { name: "Tomatoes", calories: 22, protein: 1, carbs: 5, fats: 0.2 },
        { name: "Peas", calories: 62, protein: 4, carbs: 11, fats: 0.4 },
        { name: "Mushrooms", calories: 22, protein: 3, carbs: 4, fats: 0.1 }
    ]
};

nutritionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedMealType = mealType.value;
    const selectedFoodItems = Array.from(document.querySelectorAll(`input[name="foodItem"]:checked`));

    if (selectedFoodItems.length === 0) {
        alert("Please select at least one food item.");
        return;
    }

    const meal = {
        mealType: selectedMealType,
        foods: selectedFoodItems.map(item => ({
            name: item.dataset.name,
            calories: parseInt(item.dataset.calories),
            protein: parseInt(item.dataset.protein),
            carbs: parseInt(item.dataset.carbs),
            fats: parseInt(item.dataset.fats)
        }))
    };

    meals.push(meal);
    updateUI();
    localStorage.setItem("meals", JSON.stringify(meals));
    nutritionForm.reset();
    foodItemsDiv.innerHTML = '';
});

mealType.addEventListener("change", (e) => {
    const selectedMealType = e.target.value;
    displayFoodItems(selectedMealType);
});

function displayFoodItems(mealType) {
    foodItemsDiv.innerHTML = '';
    const foods = foodData[mealType];

    foods.forEach(food => {
        const foodCheckbox = document.createElement("label");
        foodCheckbox.classList.add("food-box");
        foodCheckbox.innerHTML = `
            <input type="checkbox" name="foodItem" data-name="${food.name}" data-calories="${food.calories}" data-protein="${food.protein}" data-carbs="${food.carbs}" data-fats="${food.fats}">
            <div class="food-details">
                <strong>${food.name}</strong><br>
                ${food.calories} kcal, ${food.protein}g Protein, ${food.carbs}g Carbs, ${food.fats}g Fats
            </div>
        `;
        foodItemsDiv.appendChild(foodCheckbox);
    });
}

function updateUI() {
    mealList.innerHTML = "";
    let totalCal = 0, totalProt = 0, totalCarb = 0, totalFat = 0;

    meals.forEach(meal => {
        const mealItem = document.createElement("li");
        mealItem.innerHTML = `
            <strong>${meal.mealType}</strong>:<br>
            ${meal.foods.map(food => `${food.name}`).join(', ')}
        `;
        mealList.appendChild(mealItem);

        meal.foods.forEach(food => {
            totalCal += food.calories;
            totalProt += food.protein;
            totalCarb += food.carbs;
            totalFat += food.fats;
        });
    });

    totalCalories.textContent = totalCal;
    totalProtein.textContent = totalProt;
    totalCarbs.textContent = totalCarb;
    totalFats.textContent = totalFat;

    if (meals.length === 0) {
        const placeholder = document.querySelector(".placeholder");
        if (placeholder) {
            placeholder.style.display = 'block';
        }
    }
}
