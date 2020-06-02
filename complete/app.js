// VARIABLES
const main = document.querySelector('main');
const headline = document.querySelector('.headline');
const tagline = document.querySelector('.tagline');
const startButton = document.getElementById('startButton');
const planDiv = document.querySelector('.plan');
const mealList = document.getElementById('meals');
const name = 'Jamie';
const meals = {
  'Fancy': [
    'Sweet potato and chicken traybake',
    'Green biryani with crispy onions',
    'Stuffed butternut squash',
    'Salmon hash',
    'Saag aloo pancakes',
    'Tomato and pesto spaghetti',
    'Fish and veggie parcels with couscous',
    'Spicy corn and chickpea burgers',
    'Chilli beef and bean stir fry',
    'Charred corn and halloumi pancakes',
    'Cauliflower and bean chilli',
    'Kitchiri',
    'Baked cod with a tangy topping',
    'Lemon-roasted Greek cheese and broccoli with orzo',
    'Salt and pepper tofu',
    'Roasted plaice with fennel and tomatoes',
    'Masala fish and chips with mushy peas',
    'Carrot and feta burgers',
    'One-put Southwest chicken',
    'Smoky Mexican chicken traybake',
    'Slow-Cooked Caribbean Pot Roast',
    'Golden Summer Peach Gazpacho',
    'Chicken Florentine Meatballs'
  ],
  'Cheap': [
    'Tuna with Whole-Wheat or Multigrain Pasta or Jacket Potato',
    'Tortilla wraps or Burritos with avocado, salsa and black beans',
    'Pilau rice with brocolli, ',
    'Marinated Kale salad with cherry tomatoes and pepitas',
    'Chili con carne',
    'Spinach and Brocolli Enchiladas',
    'Seasoned Tilapia Fillets',
    'Egg Roll Noodle Bowl',
    'Asparagus Ham Dinner'
  ]
};

// HELPER FUNCTIONS
const getDay = () => {
  const weekDay = new Array(7);
  weekDay[0] = 'Sunday';
  weekDay[1] = 'Monday';
  weekDay[2] = 'Tuesday';
  weekDay[3] = 'Wednesday';
  weekDay[4] = 'Thursday';
  weekDay[5] = 'Friday';
  weekDay[6] = 'Saturday';
  weekDay[7] = 'Sunday';
  return weekDay[new Date().getDay()];
};

const getRandomWeeklyMeals = () => {
  const cheapMeals = meals.Cheap.sort(() => 0.5 - Math.random()).slice(0, 6);
  const fancyMeal = meals.Fancy[ Math.floor( Math.random() * meals.Fancy.length ) ];
  const selectedMeals = cheapMeals.concat(fancyMeal);
  return selectedMeals;
}

const getRandomMeals = (arr, amount) => {
  const meals = arr.sort(() => 0.5 - Math.random());
  let selectedMeals = meals.slice(0, amount);
  return selectedMeals;
}

const displayWeeklyMealPlan = arr => {
  arr.forEach(meal => {
    const li = document.createElement('li');
    li.textContent = meal;
    mealList.appendChild(li);
  });
}

const randomMeals = getRandomWeeklyMeals();

const showPlan = () => {
  displayWeeklyMealPlan(randomMeals);
  headline.classList.add('slideUp');
  headline.style = 'margin-bottom: 0; font-size: 3em';
  tagline.style.marginTop = 0;
  tagline.textContent = `Here's your weekly meal plan!`;
  planDiv.classList.remove('hidden');
  main.removeChild(startButton);
}

headline.textContent = getDay();
tagline.textContent = `Hey ${name}, click the button below to see your weekly meal planner.`;

startButton.addEventListener('click', showPlan);


