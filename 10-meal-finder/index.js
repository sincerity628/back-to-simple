const submit = document.getElementById('submit'),
  search = document.getElementById('search'),
  randomBtn = document.getElementById('random'),
  resultHeading = document.getElementById('result-heading'),
  mealsEl = document.getElementById('meals'),
  singleMealEl = document.getElementById('single-meal');

// function
function searchMeal(e) {
  e.preventDefault();

  // clear the single meal element
  singleMealEl.innerHTML = '';

  const term = search.value;
  if(!term) return;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => {
      resultHeading.innerHTML = `
        <h2>Search results for '${term}': </h2>
      `;

      if(!data.meals) {
        resultHeading.innerHTML = `
          <p>There is no result, try again.</p>
        `;
        mealsEl.innerHTML = '';
      } else {
        mealsEl.innerHTML = `
          ${ data.meals
            .map(meal => `
              <div class="meal">
                <img src=${meal.strMealThumb} alt=${meal.strMeal} />
                <div class="meal-info" data-mealid=${meal.idMeal}>
                  <h3>${ meal.strMeal }</h3>
                </div>
              </div>
            `)
            .join('')
          }
        `;
      }

      // clear the input value
      search.value = '';
    })
}

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    })
}

// get a random meal from API
function randomMeal() {
  // clear the meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    })
}

function addMealToDOM(meal) {
  const ingredients = [];

  for(let i = 1; i <= 20; i++) {
    if(!meal[`strIngredient${i}`]) break;
    ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
  }

  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${ meal.strMeal }</h1>
      <img src=${meal.strMealThumb} alt=${meal.strMeal} />
      <div class="single-meal-info">
        ${ meal.strCategory? `<p>Category: ${ meal.strCategory }</p>` : '' }
        ${ meal.strArea? `<p>Area: ${ meal.strArea }</p>` : '' }
      </div>
      <div class="main">
        <p>${ meal.strInstructions }</p>
        <h2>Ingredients</h2>
        <ul>
          ${ ingredients.map(ing => `<li>${ ing }</li>`).join('') }
        </ul>
      </div>
    </div>
  `;
}

// event listener
submit.addEventListener('submit', searchMeal);
randomBtn.addEventListener('click', randomMeal);

mealsEl.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if(item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if(mealInfo) {
    const mealId = mealInfo.getAttribute('data-mealid');
    getMealById(mealId);
  }
});
