// VARIABLES
const body = document.querySelector('body');
const main = document.querySelector('main');
const headline = document.querySelector('.headline');
const tagline = document.querySelector('.tagline');
const viewButton = document.getElementById('viewButton');
const viewCheckbox = document.getElementById('viewCheckbox');
const planDiv = document.querySelector('.plan');
const shuffleButton = document.querySelector('.shuffle');
const mealList = document.getElementById('meals');
const meals = []; 
const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];

// *--meal lists courtesy of tasty.co--*
meals.push(
  'Beef with Brocolli',
  'Lemon Garlic Salmon and Asparagus',
  'Tuna and Avocado Wrap',
  'Stuffed Bell Peppers',
  'Kale Caesar Salad',
  'Avocado Toast',
  'Cheese and Crackers',
  'Screambled Eggs on Toast',
  'Omelette with Cherry Tomatoes',
  'Ramen Noodles'
);

// HELPER FUNCTIONS

// animate element
const animate = (element, animation) => {
  element.style.animation = animation;
}

// hide element
const hide = element => element.style.display = 'none';

//show element
const show = element => element.style.display = '';

// get random number ranging from array index
const randomNum = array => Math.floor(Math.random() * array.length);

// get local date day
const getDay = () => {
    const date = new Date();
    const day = date.getDay();
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    return days[day];
};

// get a meal from array
const getRandomMeal = () => meals[randomNum(meals)];

// shuffle meals
const shuffle = () => {
  // remove all meals
  for (let i = 0; i < mealTimes.length; i++) {
    let mealLI = mealList.children[0];
    mealList.removeChild(mealLI);
  }
  // clear meal list
  mealList.innerHTML = '';
  // insert new meals
  displayDailyMealPlan();
}

// insert meals into meal plan
const displayDailyMealPlan = () => {

  // insert a meal for every meal time of the day
  for (let i = 0; i < mealTimes.length; i++) {
    let meal = getRandomMeal();
    let mealLI = document.createElement('LI');
    mealLI.textContent = meal;
    mealList.appendChild(mealLI);
    animate(mealLI, 'slideDown .3s forwards');
  }

  const mealPlans = document.querySelectorAll('#meals li');
  const meal_1 = mealPlans[0].textContent;
  const meal_2 = mealPlans[1].textContent;
  const meal_3 = mealPlans[2].textContent;

  // if any meal is repeated
  if (meal_1 === meal_2 || meal_1 === meal_3 || meal_2 === meal_3) {
    shuffle();
  }
};

// event handler for both 'click' and 'keyup'
const handleEvent = e => {
  const nameInput = document.getElementById('name');
  const nameEnter = document.querySelector('.enter');
  const overlay = document.querySelector('.overlay');
  const popUpMsg = document.querySelector('.popUp p');
  const popUp = document.querySelector('.popUp');

  // if enter button is clicked or enter key is pressed
  if (e.target.className === 'enter' || e.keyCode === 13) {  
    
    // if user input is not empty
    if (nameInput.value.length > 0) {
      // save user input as name
      name = nameInput.value;
      // insert local date day as heading
      headline.textContent = getDay();
      // insert message
      tagline.innerHTML = `Hey ${name}, get ready for a wild set of meal plans!!<br>
                            Click below to see your meal plans.`;
      // fade and hide overlay
      overlay.style.animation = 'fade .1s forwards';
      setTimeout(()=> {
        hide(overlay);
      }, 100);
      show(main);
      animate(main, 'slideDown .5s forwards');
    } else { // else popUp box pulses and text input flashes red border
      popUpMsg.textContent = 'Please type in a name!';
      animate(popUp, 'pulse .05s forwards');
      nameInput.style.border = "1px solid red";
      setTimeout(()=> {
        animate(popUp, 'none')
      }, 100);
    }
  }

  // Don't let first key be a space *-- thanks to Dustin --*
  if (nameInput.value === ' ') {
    nameInput.value = '';
  }

  // if view button is pressed, change message and button text
  if (viewCheckbox.checked) {
    tagline.textContent = "Here's what's planned for today!";
    viewButton.textContent = "Go Back";
    // make heading smaller and move up
    animate(planDiv, 'slideUp .5s forwards');
  } else { // if button is pressed again set initial text and location
    tagline.innerHTML = `Hey ${name}, get ready for a wild set of meal plans!!<br>
    Click below to see your meal plans.`;
    viewButton.textContent = "View Plan";
    animate(planDiv, '');
  }

  if (e.target.textContent === 'Shuffle') {
    shuffle();
  }

}

// EVENT LISTENERS

// on document load
document.addEventListener('DOMContentLoaded', () => {

  // place overlay with prompt for name
  const overlay = document.createElement('DIV');
  hide(main);
  overlay.className = 'overlay';
  overlay.innerHTML = `<div class="popUp">
                        <p>Hi, what's your name?</p>
                        <input type="text" id="name">
                        <button class="enter">Enter</button>
                      </div>`;
  body.insertBefore(overlay, main);
  displayDailyMealPlan();

});

// listen to clicks or keyboard presses
body.addEventListener('click', handleEvent);
body.addEventListener('keyup', handleEvent);

// viewButton.addEventListener('click', () => {
//   animate(viewButton, 'fade .1s forwards');
// });
