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
let _mainSearchfilteredRecipes = [];
let tagFilteredRecipes = [];

let ingredients = [];
let _ingredients = [];
let filteredIngredients = [];

let appliances = [];
let _appliances = [];
let filteredAppliances = [];

let ustensils = [];
let _ustensils = [];
let filteredUstensils = [];

//Decapitalise all letters except first
function titleCase(string) {
   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

//Capitalise first letter and removes numbers + parenthesis for DOM
function normalizeDOMString(string) {
   return titleCase(string).replace(/[0-9]/g, '').replace(/[{()}]/g, '');
}

//************************** DOM Initialisation **********************/

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
   ingredients = ingredients.map(ingredient => titleCase(ingredient));
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
   ustensils = ustensils.map(word => normalizeDOMString(word));
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

//*************** Global Recipe Filtering *********/
function isFilteredByIngredients(recipe) {
   if (_ingredients.length === 0) {
      return true; //Keep all recipes if not filtered by ingredients
   }
   return recipe.ingredients
      .filter((ingredient) => _ingredients.includes(normalize(ingredient.ingredient)))
      .length === _ingredients.length; //Keep only recipes wich contain all filtered ingredients
}

function isFilteredByUstensils(recipe) {
   if (_ustensils.length === 0) {
      return true;
   }
   return recipe.ustensils
      .filter((ustensil) => _ustensils.includes(normalize(ustensil))).length === _ustensils.length;
}

function isFilteredByAppliances(recipe) {
   if (_appliances.length === 0) {
      return true;
   }
   return _appliances.includes(normalize(recipe.appliance));
}

function isFilteredByMainSearch(recipe) {
   if (_mainSearchfilteredRecipes.length === 0) {
      return true;
   }
   return _mainSearchfilteredRecipes.includes(recipe);
}

function globalFilter() {
   return recipes.filter(recipe => {
      return (
         isFilteredByIngredients(recipe)
         &&
         isFilteredByUstensils(recipe)
         &&
         isFilteredByAppliances(recipe)
         &&
         isFilteredByMainSearch(recipe)
      )
   })
}






//****************************** Main search bar ************************

//Main search bar error message
function displaySearchError() {
   document.querySelector(".search-error-message").style.display = "block";
}

function hideSearchError() {
   document.querySelector(".search-error-message").style.display = "none";
}

//Main search functional programmation algorithm *******************
function mainSearchAlgo(recipesArray, userInput) {
   //create array with matching titles
   const nameMatchArray = recipesArray.filter(recipe => normalize(recipe.name).includes(userInput));

   //create array with maching description
   const descriptionMatchArray = recipesArray.filter(recipe => normalize(recipe.description).includes(userInput));

   //create array with maching ingredients
   const ingredientsMatchArray = recipesArray.filter((recipe) => {
      recipe.ingredients
         .filter((ingredient) => _ingredients.includes(normalize(ingredient.ingredient)))
   });

   //create single array from above ones
   const mainSearchArray = [...nameMatchArray, ...descriptionMatchArray, ...ingredientsMatchArray];
   //Removes duplicates and return array
   return Array.from(new Set(mainSearchArray));
}

// //Main search native loop algorithm ************** 
// function mainSearchAlgo(recipesArray, userInput) {
//    const mainSearchArray = [];
//    for (let i = 0; i < recipesArray.length; i++) {
//       //Check if search input matches title + add
//       if (normalize(recipesArray[i].name).includes(userInput)) {
//          mainSearchArray.push(recipesArray[i]);    
//       }
//       //Check if search input matches description + add
//       if (normalize(recipesArray[i].description).includes(userInput)) {
//          mainSearchArray.push(recipesArray[i]);
//       }
//       //Check if search input matches ingredients + add
//       for (let j = 0; j < recipesArray[i].ingredients.length; j++) {
//          if (normalize(recipesArray[i].ingredients[j].ingredient).includes(userInput)) {
//             mainSearchArray.push(recipesArray[i]);
//          }
//       }
//    }
//    //Removes duplicates and return array
//    return Array.from(new Set(mainSearchArray));
// }


//Main search initialisation
function mainSearch(mainSearchUserinput) {
   if (mainSearchUserinput.length > 2) {
      //Check if any tag selected

      filteredRecipes = mainSearchAlgo(globalFilter(), mainSearchUserinput);


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
      filteredIngredients = filteredIngredients.map(ingredient => titleCase(ingredient));
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
      filteredUstensils = filteredUstensils.map(word => normalizeDOMString(word));
      const ustensilList = new UstensilList(filteredUstensils);
      if (document.querySelector(".ustensils-list")) {
         document.querySelector(".ustensils-list").remove();
      }
      ustensilsDropdown.appendChild(ustensilList.renderList());

      //Set global filtered search
      _mainSearchfilteredRecipes = mainSearchAlgo(globalFilter(), mainSearchUserinput);
   }

   if (mainSearchUserinput.length <= 2 && _mainSearchfilteredRecipes.length === 0) {
      if(document.querySelector(".recipes-section")){
         document.querySelector(".recipes-section").remove();
      }
      if(document.querySelector(".ingredients-list")){
         document.querySelector(".ingredients-list").remove();
      }
      if(document.querySelector(".appliances-list")){
         document.querySelector(".appliances-list").remove();
      }
      if(document.querySelector(".ustensils-list")){
         document.querySelector(".ustensils-list").remove();
      }
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
   mainSearch(mainSearchUserinput);
})
//*********************Tag search **************************/

//Update ingredients list by tags
function updateIngredientsByTags(ingredientSearchUserinput) {
   //Create new filtered by tag ingredient array
   let tagFilteredIngredients = ingredients.filter(ingredient => normalize(ingredient).includes(ingredientSearchUserinput));
   tagFilteredIngredients = tagFilteredIngredients.map(ingredient => titleCase(ingredient));
   tagFilteredIngredients = Array.from(new Set(tagFilteredIngredients));

   //Initialise ingredient list filtered by tag
   if (document.querySelector(".ingredients-list")) {
      document.querySelector(".ingredients-list").remove();
   }
   let filteredByTagingredientList = new IngredientList(tagFilteredIngredients);
   ingredientsDropdown.appendChild(filteredByTagingredientList.renderList());

}

//Ingredient search bar event
const ingredientSearchInput = document.querySelector(".ingredient-search-bar");
let ingredientSearchUserInput;
ingredientSearchInput.addEventListener("input", e => {
   ingredientSearchUserInput = normalize(e.target.value);
   updateIngredientsByTags(ingredientSearchUserInput);
   //Re-Initialise ingredient list when search input empty
   if (ingredientSearchUserInput.length == 0) {
      if (document.querySelector(".ingredients-list")) {
         document.querySelector(".ingredients-list").remove();
      }
      initIngredientList();
   }
})

//Update appliances list by tags
function updateAppliancesByTags(applianceSearchUserinput) {

   //Create new filtered by tag appliance array
   let tagFilteredAppliances = appliances.filter(appliance => normalize(appliance).includes(applianceSearchUserinput));
   tagFilteredAppliances = Array.from(new Set(tagFilteredAppliances));

   //Initialise appliance list filtered by tag
   if (document.querySelector(".appliances-list")) {
      document.querySelector(".appliances-list").remove();
   }
   let filteredByTagApplianceList = new ApplianceList(tagFilteredAppliances);
   appliancesDropdown.appendChild(filteredByTagApplianceList.renderList());
}

//Appliance search bar event
const applianceSearchInput = document.querySelector(".appliance-search-bar");
let applianceSearchUserInput;
applianceSearchInput.addEventListener("input", e => {
   applianceSearchUserInput = normalize(e.target.value);
   updateAppliancesByTags(applianceSearchUserInput);
   //Re-Initialise appliance list when search input empty
   if (applianceSearchUserInput.length == 0) {
      if (document.querySelector(".appliances-list")) {
         document.querySelector(".appliances-list").remove();
      }
      initApplianceList();
   }
})

//Update ustensil list by tags
function updateUstensilsByTags(ustensilsSearchUserinput) {
   //Create new filtered by tag ingredient array
   let tagFilteredUstensils = ustensils.filter(ustensil => normalize(ustensil).includes(ustensilsSearchUserinput));
   tagFilteredUstensils = tagFilteredUstensils.map(ustensil => normalizeDOMString(ustensil));
   tagFilteredUstensils = Array.from(new Set(tagFilteredUstensils));

   //Initialise ustensil list filtered by tag
   if (document.querySelector(".ustensils-list")) {
      document.querySelector(".ustensils-list").remove();
   }
   let filteredByTagUstensilList = new UstensilList(tagFilteredUstensils);
   ustensilsDropdown.appendChild(filteredByTagUstensilList.renderList());
}

//Ustensils search bar
const ustensilSearchInput = document.querySelector(".ustensil-search-bar");
let ustensilsSearchUserInput;
ustensilSearchInput.addEventListener("input", e => {
   ustensilsSearchUserInput = normalize(e.target.value);
   updateUstensilsByTags(ustensilsSearchUserInput);
   //Re-Initialise ustensil list when search input empty
   if (ustensilsSearchUserInput.length == 0) {
      if (document.querySelector(".ustensils-list")) {
         document.querySelector(".ustensils-list").remove();
      }
      initUstensilList();
   }
})

function updateTagLists(recipes) {
   //Update ingredient list
   filteredIngredients = [];
   recipes.forEach((recipe) => {
      recipe.ingredients.forEach(obj => {
         filteredIngredients.push(obj.ingredient);
      })
   })
   filteredIngredients = filteredIngredients.map(ingredient => titleCase(ingredient));
   filteredIngredients = Array.from(new Set(filteredIngredients));

   if (document.querySelector(".ingredients-list")) {
      document.querySelector(".ingredients-list").remove();
   }
   const ingredientList = new IngredientList(filteredIngredients);
   ingredientsDropdown.appendChild(ingredientList.renderList());

   //Update appliance list
   filteredAppliances = [];
   filteredAppliances = recipes.map(recipe => recipe.appliance);
   filteredAppliances = Array.from(new Set(filteredAppliances));
   if (document.querySelector(".appliances-list")) {
      document.querySelector(".appliances-list").remove();
   }
   let filteredApplianceList = new ApplianceList(filteredAppliances);
   appliancesDropdown.appendChild(filteredApplianceList.renderList());

   //Update ustensil list
   filteredUstensils = [];
   recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
         filteredUstensils.push(ustensil);
      })
   })
   filteredUstensils = Array.from(new Set(filteredUstensils));
   filteredUstensils = filteredUstensils.map(word => normalizeDOMString(word));
   const ustensilList = new UstensilList(filteredUstensils);
   if (document.querySelector(".ustensils-list")) {
      document.querySelector(".ustensils-list").remove();
   }
   ustensilsDropdown.appendChild(ustensilList.renderList());
}

function updateRecipesByingredientTag(recipes, SelectedTagValue) {

   //Create recipes array with maching ingredients
   tagFilteredRecipes = [];
   recipes.forEach((recipe) => {
      recipe.ingredients.forEach(obj => {
         if (normalize(obj.ingredient).includes(SelectedTagValue)) {
            tagFilteredRecipes.push(recipe);
         }
      })
   })

   updateTagLists(tagFilteredRecipes);

   //Initialise Recipes cards
   let filteredCards = new RecipeCards(tagFilteredRecipes);
   if (document.querySelector(".recipes-section")) {
      document.querySelector(".recipes-section").remove();
   }
   mainSection.appendChild(filteredCards.renderCards());
}


//Ingredient tag list item event Listener
document.addEventListener("click", (e) => {
   if (e.target.getAttribute('data-ingredient')) {
      let ingredientTagValue = normalize(e.target.textContent);

      _ingredients.push(ingredientTagValue);
      updateRecipesByingredientTag(globalFilter(), ingredientTagValue);

      document.querySelector(".ingredient-search-bar").value = "";

   }
})

function updateRecipesByApplianceTag(recipes, SelectedTagValue) {

   //Create recipes array with matching appliances
   tagFilteredRecipes = recipes.filter(recipe => normalize(recipe.appliance).includes(SelectedTagValue));

   updateTagLists(tagFilteredRecipes);

   //Initialise Recipes cards
   let filteredCards = new RecipeCards(tagFilteredRecipes);
   if (document.querySelector(".recipes-section")) {
      document.querySelector(".recipes-section").remove();
   }
   mainSection.appendChild(filteredCards.renderCards());

}

//Appliance tag list item event Listener
document.addEventListener("click", (e) => {
   if (e.target.getAttribute('data-appliance')) {
      let applianceTagValue = normalize(e.target.textContent);

      _appliances.push(applianceTagValue);
      updateRecipesByApplianceTag(globalFilter(), applianceTagValue);

      document.querySelector(".appliance-search-bar").value = "";
   }
})


function updateRecipesByUstensilsTag(recipes, SelectedTagValue) {

   //Create recipes array with matching ustensils
   tagFilteredRecipes = [];
   recipes.forEach((recipe) => {
      recipe.ustensils.forEach(ustensil => {
         if (normalize(ustensil).includes(SelectedTagValue)) {
            tagFilteredRecipes.push(recipe);
         }
      })
   })

   updateTagLists(tagFilteredRecipes);

   //Initialise Recipes cards
   let filteredCards = new RecipeCards(tagFilteredRecipes);
   if (document.querySelector(".recipes-section")) {
      document.querySelector(".recipes-section").remove();
   }
   mainSection.appendChild(filteredCards.renderCards());

}

//Ustensil tag list item event Listener
document.addEventListener("click", (e) => {
   if (e.target.getAttribute('data-ustensil')) {
      let ustensilTagValue = normalize(e.target.textContent);

      _ustensils.push(ustensilTagValue);
      updateRecipesByUstensilsTag(globalFilter(), ustensilTagValue);

      document.querySelector(".ustensil-search-bar").value = "";
   }
})