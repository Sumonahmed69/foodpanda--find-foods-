const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');

searchBtn.addEventListener('click', getMealList);

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item" id = "${meal.idMeal}">
                        <a onclick="ingredient(${meal.strMeal})"  class = "meal-img">
                            <img id ="img-meal" src = "${meal.strMealThumb}" alt = "food">
                            <h3 id = "mealName" >${meal.strMeal}</h3>
                        </a>
                    </div>
                          `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        });
}
const ingredient = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?i=${name}`
    fetch(url)
    .then(res => res.json())
    .then(data => MealListInfo(data[0]));
}
const MealListInfo = meal => {
    
    const mealInfo = document.getElementById("mealInfo");
    mealInfo.innerHTML = `
    <h1>${meal.ingredient}</h1>
    `

}

