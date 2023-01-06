import { getRecipes } from "../utils/getData.js";
import RecipeCards from "../factories/recipeCards.js";
import IngredientList from "../factories/ingredientLists.js";
import ApplianceList from "../factories/applianceLists.js";
import UstensilList from "../factories/ustensilLists.js";

const ingredientsDropdown = document.querySelector(".ingredients-dropdown");
const ingredientsButton = document.querySelector(".filter-button-ingredients");
const ingredientsDropdownClose = document.querySelector(".ingredients-dropdown i");
const appliancesDropdown = document.querySelector(".appliances-dropdown");
const appliancesButton = document.querySelector(".filter-button-appliances");
const appliancesDropdownClose = document.querySelector(".appliances-dropdown i");
const ustensilsDropdown = document.querySelector(".ustensils-dropdown");
const ustensilsButton = document.querySelector(".filter-button-ustensils");
const ustensilsDropdownClose = document.querySelector(".ustensils-dropdown i");
const mainSection = document.querySelector("main");
let recipes = [];
let filteredRecipes = [];
let ingredients = [];
let filteredIngredients = [];
let appliances = [];
let filteredAppliances = [];
let ustensils = [];
let filteredUstensils = [];

//Initialise recipe cards
async function initCards() {
   recipes = await getRecipes();
   const cards = new RecipeCards(recipes);
   mainSection.appendChild(cards.renderCards());
}

initCards();

//Initialise ingredients list

async function initIngredientList() {
   recipes = await getRecipes();
   for (let i = 0; i < recipes.length; i++) {
      for (let j = 0; j < recipes[i].ingredients.length; j++) {
         ingredients.push(recipes[i].ingredients[j].ingredient);
      }
   }
   ingredients = Array.from(new Set(ingredients));
   const ingredientList = new IngredientList(ingredients);
   ingredientsDropdown.appendChild(ingredientList.renderList());
}

initIngredientList();

//Ingredients Dropdown open/close
function toggleIngredients() {
   if (ingredientsDropdown.style.display == "none") {
      ingredientsDropdown.style.display = "block";
      ingredientsButton.style.display = "none";
   } else {
      ingredientsDropdown.style.display = "none";
      ingredientsButton.style.display = "block";
   }
}

ingredientsButton.addEventListener("click", toggleIngredients);
ingredientsDropdownClose.addEventListener("click", toggleIngredients);

//Initialise appliances list
async function initApplianceList() {
   recipes = await getRecipes();
   appliances = recipes.map(recipe => recipe.appliance);
   appliances = Array.from(new Set(appliances));

   const applianceList = new ApplianceList(appliances);
   appliancesDropdown.appendChild(applianceList.renderList());
}

initApplianceList();

//Appliances Dropdown open/close
function toggleAppliances() {
   if (appliancesDropdown.style.display == "none") {
      appliancesDropdown.style.display = "block";
      appliancesButton.style.display = "none";
   } else {
      appliancesDropdown.style.display = "none";
      appliancesButton.style.display = "block";
   }
}

appliancesButton.addEventListener("click", toggleAppliances);
appliancesDropdownClose.addEventListener("click", toggleAppliances);

//Initialise ustensils list
async function initUstensilList() {
   recipes = await getRecipes();
   for (let i = 0; i < recipes.length; i++) {
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
         ustensils.push(recipes[i].ustensils[j]);
      }
   }
   ustensils = Array.from(new Set(ustensils));
   //Capitalize first Letter
   ustensils = ustensils.map(word => {
      const firstLetter = word.charAt(0).toUpperCase();
      const rest = word.slice(1).toLowerCase();
      return firstLetter + rest;
   });
   //Remove numbers
   ustensils = ustensils.map(word => word.replace(/[0-9]/g, ''));
   //Remove brackets
   ustensils = ustensils.map(word => word.replace(/[{()}]/g, ''));
   const ustensilList = new UstensilList(ustensils);
   ustensilsDropdown.appendChild(ustensilList.renderList());
}

initUstensilList();

//Appliances Dropdown open/close
function toggleUstensils() {
   if (ustensilsDropdown.style.display == "none") {
      ustensilsDropdown.style.display = "block";
      ustensilsButton.style.display = "none";
   } else {
      ustensilsDropdown.style.display = "none";
      ustensilsButton.style.display = "block";
   }
}

ustensilsButton.addEventListener("click", toggleUstensils);
ustensilsDropdownClose.addEventListener("click", toggleUstensils);


//Remove accents and decapitalise
function normalize(string) {
   return string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

//-------------------------Main search bar----------------------------

//Main search bar error message
function displaySearchError() {
   document.querySelector(".search-error-message").style.display = "block";
}

function hideSearchError() {
   document.querySelector(".search-error-message").style.display = "none";
}

function mainSearch(recipesArray, userInput) {
   //create array with matching titles
   const nameMatchArray = recipesArray.filter(recipe => normalize(recipe.name).includes(userInput));

   //create array with maching description
   const descriptionMatchArray = recipesArray.filter(recipe => normalize(recipe.description).includes(userInput));

   //create array with maching ingredients
   const ingredientsMatchArray = [];
   recipesArray.forEach((recipe) => {
      recipe.ingredients.forEach(obj => {
         if (normalize(obj.ingredient).includes(userInput)) {
            ingredientsMatchArray.push(recipe);
         }
      })
   })

   //create single array from above ones
   const mainSearchArray = [...nameMatchArray, ...descriptionMatchArray, ...ingredientsMatchArray];
   //Removes duplicates and return array
   return Array.from(new Set(mainSearchArray));
}

//Main search functional programmation algorithm
function mainSearchAlgo(mainSearchUserinput) {
   if (mainSearchUserinput.length > 2) {
       filteredRecipes = mainSearch(recipes, mainSearchUserinput);
   
       if (filteredRecipes.length == 0) {
          displaySearchError();
       } else {
          hideSearchError();
       }
   
       //Initialise filtered recipe cards
       let filteredCards = new RecipeCards(filteredRecipes);
       if (document.querySelector(".recipes-section")) {
          document.querySelector(".recipes-section").remove();
       }
   
       mainSection.appendChild(filteredCards.renderCards());
   
       //Initialise filtered ingredients tag list
       filteredIngredients = [];
       filteredRecipes.forEach((recipe) => {
          recipe.ingredients.forEach(obj => {
             filteredIngredients.push(obj.ingredient);
          })
       })
   
       filteredIngredients = Array.from(new Set(filteredIngredients));
   
       if (document.querySelector(".ingredients-list")) {
          document.querySelector(".ingredients-list").remove();
       }
       const ingredientList = new IngredientList(filteredIngredients);
       ingredientsDropdown.appendChild(ingredientList.renderList());
   
       //Initialise filtered appliances list
       filteredAppliances = [];
       filteredAppliances = filteredRecipes.map(recipe => recipe.appliance);
       filteredAppliances = Array.from(new Set(filteredAppliances));
       if (document.querySelector(".appliances-list")) {
          document.querySelector(".appliances-list").remove();
       }
       let filteredApplianceList = new ApplianceList(filteredAppliances);
       appliancesDropdown.appendChild(filteredApplianceList.renderList());
   
       //Initialise filtered ustensils list
       filteredUstensils = [];
       filteredRecipes.forEach((recipe) => {
          recipe.ustensils.forEach((ustensil) => {
             filteredUstensils.push(ustensil);
          })
       })
   
       filteredUstensils = Array.from(new Set(filteredUstensils));
       filteredUstensils = filteredUstensils.map(word => {
          const firstLetter = word.charAt(0).toUpperCase();
          const rest = word.slice(1).toLowerCase();
          return firstLetter + rest;
       });
       filteredUstensils = filteredUstensils.map(word => word.replace(/[0-9]/g, ''));
       filteredUstensils = filteredUstensils.map(word => word.replace(/[{()}]/g, ''));
       const ustensilList = new UstensilList(filteredUstensils);
       if (document.querySelector(".ustensils-list")) {
          document.querySelector(".ustensils-list").remove();
       }
       ustensilsDropdown.appendChild(ustensilList.renderList());
    }
   
    if (mainSearchUserinput.length <= 2) {
       document.querySelector(".recipes-section").remove();
       document.querySelector(".ingredients-list").remove();
       document.querySelector(".appliances-list").remove();
       document.querySelector(".ustensils-list").remove();
       initCards();
       initIngredientList();
       initApplianceList();
       initUstensilList();
       hideSearchError();
    }
   }

//Main search bar event listener
const mainSearchInput = document.getElementById("search");
let mainSearchUserinput;
mainSearchInput.addEventListener("input", e => {
   mainSearchUserinput = normalize(e.target.value);
   mainSearchAlgo(mainSearchUserinput);
   
})


let tagFilteredIngredients = [];
let tagFilteredRecipes = [];


//Ingredient search bar
const ingredientSearchInput = document.querySelector(".ingredient-search-bar");
let ingredientSearchUserinput;
ingredientSearchInput.addEventListener("input", e => {
   ingredientSearchUserinput = normalize(e.target.value);

   if(document.querySelector(".ingredients-list")){
   document.querySelector(".ingredients-list").remove();



      

}

if (ingredientSearchUserinput.length == 0) {
   initIngredientList();
}
   console.log(ingredientSearchUserinput);
})

//Appliance search bar
const applianceSearchInput = document.querySelector(".appliance-search-bar");
applianceSearchInput.addEventListener("input", e => {
   const userInput = e.target.value;
   console.log(userInput);
})

//Ustensils search bar
const ustensilSearchInput = document.querySelector(".ustensil-search-bar");
ustensilSearchInput.addEventListener("input", e => {
   const userInput = e.target.value;
   console.log(userInput);
})
