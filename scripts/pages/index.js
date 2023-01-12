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
let mainSearchFilter = [];
let ingredientsFilter = [];
let appliancesFilter = [];
let ustensilsFilter = [];

let tagFilteredRecipes = [];
let filteredIngredients = [];
let filteredAppliances = [];
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
   let ingredients = [];
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

      if (appliancesDropdown.style.display === "block" || ustensilsDropdown.style.display === "block" && window.innerWidth > 992) {
         document.querySelectorAll(".tag-list").forEach(tagList => tagList.style.gridTemplateColumns = "1fr");
      }

   } else {
      ingredientsDropdown.style.display = "none";
      ingredientsButton.style.display = "block";
      if (window.innerWidth > 992) {
         document.querySelectorAll(".tag-list").forEach(tagList => tagList.style.gridTemplateColumns = "1fr 1fr 0.5fr");
      }
   }

}

ingredientsButton.addEventListener("click", toggleIngredients);
ingredientsDropdownClose.addEventListener("click", toggleIngredients);

//Initialise appliances list
async function initApplianceList() {
   recipes = await getRecipes();
   let appliances = [];
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

      if (ingredientsDropdown.style.display === "block" || ustensilsDropdown.style.display === "block" && window.innerWidth > 992) {
         document.querySelectorAll(".tag-list").forEach(tagList => tagList.style.gridTemplateColumns = "1fr");
      }

   } else {
      appliancesDropdown.style.display = "none";
      appliancesButton.style.display = "block";

      if (window.innerWidth > 992 && ingredientsDropdown.style.display === "none") {
         document.querySelectorAll(".tag-list").forEach(tagList => tagList.style.gridTemplateColumns = "1fr 1fr 0.5fr");
      }
   }
}

appliancesButton.addEventListener("click", toggleAppliances);
appliancesDropdownClose.addEventListener("click", toggleAppliances);

//Initialise ustensils list
async function initUstensilList() {
   recipes = await getRecipes();
   let ustensils = [];
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

//Ustensils Dropdown open/close
function toggleUstensils() {
   if (ustensilsDropdown.style.display == "none") {
      ustensilsDropdown.style.display = "block";
      ustensilsButton.style.display = "none";

      if (ingredientsDropdown.style.display === "block" || appliancesDropdown.style.display === "block" && window.innerWidth > 992) {
         document.querySelectorAll(".tag-list").forEach(tagList => tagList.style.gridTemplateColumns = "1fr");
      }

   } else {
      ustensilsDropdown.style.display = "none";
      ustensilsButton.style.display = "block";
      if (window.innerWidth > 992 && ingredientsDropdown.style.display === "none") {
         document.querySelectorAll(".tag-list").forEach(tagList => tagList.style.gridTemplateColumns = "1fr 1fr 0.5fr");
      }
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
   if (ingredientsFilter.length === 0) {
      return true; //Keep all recipes if not filtered by ingredients
   }
   return recipe.ingredients
      .filter((ingredient) => ingredientsFilter.includes(normalize(ingredient.ingredient)))
      .length === ingredientsFilter.length; //Keep only recipes wich contain all filtered ingredients
}

function isFilteredByUstensils(recipe) {
   if (ustensilsFilter.length === 0) {
      return true;
   }
   return recipe.ustensils
      .filter((ustensil) => ustensilsFilter.includes(normalize(ustensil))).length === ustensilsFilter.length;
}

function isFilteredByAppliances(recipe) {
   if (appliancesFilter.length === 0) {
      return true;
   }
   return appliancesFilter.includes(normalize(recipe.appliance));
}

function isFilteredByMainSearch(recipe) {
   if (mainSearchFilter.length === 0) {
      return true;
   }
   return mainSearchFilter.includes(recipe);
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

function updateRecipesFromGlobal() {
   updateTagLists(globalFilter());
   let filteredCards = new RecipeCards(globalFilter());
   if (document.querySelector(".recipes-section")) {
      document.querySelector(".recipes-section").remove();
   }
   mainSection.appendChild(filteredCards.renderCards());
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
         .filter((ingredient) => ingredientsFilter.includes(normalize(ingredient.ingredient)))
   });

   //create single array from above ones
   const mainSearchArray = [...nameMatchArray, ...descriptionMatchArray, ...ingredientsMatchArray];
   //Removes duplicates and return array
   return Array.from(new Set(mainSearchArray));
}

//Main search initialisation
function mainSearch(mainSearchUserinput) {
   if (mainSearchUserinput.length > 2) {
      //Check if any tag selected

      let filteredRecipes = mainSearchAlgo(globalFilter(), mainSearchUserinput);

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

      updateTagLists(filteredRecipes);

      //Set global filtered search
      mainSearchFilter = mainSearchAlgo(globalFilter(), mainSearchUserinput);
   }

   if (mainSearchUserinput.length <= 2 && ingredientsFilter.length === 0 && appliancesFilter.length === 0 && ustensilsFilter.length === 0) {
      if (document.querySelector(".recipes-section")) {
         document.querySelector(".recipes-section").remove();
      }
      if (document.querySelector(".ingredients-list")) {
         document.querySelector(".ingredients-list").remove();
      }
      if (document.querySelector(".appliances-list")) {
         document.querySelector(".appliances-list").remove();
      }
      if (document.querySelector(".ustensils-list")) {
         document.querySelector(".ustensils-list").remove();
      }
      mainSearchFilter = [];
      updateRecipesFromGlobal();
      hideSearchError();
   }

   if (mainSearchUserinput.length <= 2 && globalFilter().length > 0) {
      hideSearchError();
      updateRecipesFromGlobal();
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
function updateIngredientsByTags(userSearch) {

   let ingredientsTemp = [];
   for (let i = 0; i < globalFilter().length; i++) {
      for (let j = 0; j < globalFilter()[i].ingredients.length; j++) {
         ingredientsTemp.push(globalFilter()[i].ingredients[j].ingredient);
      }
   }

   //Create new filtered by tag ingredient array
   let tagFilteredIngredients = ingredientsTemp.filter(ingredient => normalize(ingredient).includes(userSearch));
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
   if (ingredientSearchUserInput.length == 0 && mainSearchFilter.length === 0 && ingredientsFilter.length === 0 && appliancesFilter.length === 0 && ustensilsFilter.length === 0) {
      if (document.querySelector(".ingredients-list")) {
         document.querySelector(".ingredients-list").remove();
      }
      initIngredientList();
   }
})

//Update appliances list by tags
function updateAppliancesByTags(applianceSearchUserinput) {

   let appliancesTemp = globalFilter().map(recipe => recipe.appliance);
   appliancesTemp = Array.from(new Set(appliancesTemp));

   //Create new filtered by tag appliance array
   let tagFilteredAppliances = appliancesTemp.filter(appliance => normalize(appliance).includes(applianceSearchUserinput));
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
   if (applianceSearchUserInput.length == 0 && mainSearchFilter.length === 0 && ingredientsFilter.length === 0 && appliancesFilter.length === 0 && ustensilsFilter.length === 0) {
      if (document.querySelector(".appliances-list")) {
         document.querySelector(".appliances-list").remove();
      }
      initApplianceList();
   }
})

//Update ustensil list by tags
function updateUstensilsByTags(ustensilsSearchUserinput) {
   //Create new filtered by tag ingredient array
   let ustensilsTemp = [];
   for (let i = 0; i < globalFilter().length; i++) {
      for (let j = 0; j < globalFilter()[i].ustensils.length; j++) {
         ustensilsTemp.push(globalFilter()[i].ustensils[j]);
      }
   }

   let tagFilteredUstensils = ustensilsTemp.filter(ustensil => normalize(ustensil).includes(ustensilsSearchUserinput));
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
   if (ustensilsSearchUserInput.length == 0 && mainSearchFilter.length === 0 && ingredientsFilter.length === 0 && appliancesFilter.length === 0 && ustensilsFilter.length === 0) {
      if (document.querySelector(".ustensils-list")) {
         document.querySelector(".ustensils-list").remove();
      }
      initUstensilList();
   }
})

//Ingredient tag list item event Listener
document.addEventListener("click", (e) => {
   if (e.target.getAttribute('data-ingredient') && !ingredientsFilter.includes(normalize(e.target.getAttribute('data-ingredient')))) {

      let ingredientTagValue = normalize(e.target.textContent);
      ingredientsFilter.push(ingredientTagValue);
      updateRecipesByingredientTag(globalFilter(), ingredientTagValue);
      document.querySelector(".ingredient-search-bar").value = "";

   }
})

//Ingredient active tag button close
document.addEventListener("click", (e) => {
   if (e.target.parentNode.getAttribute('data-ingredient-active-tag')) {
      let ingredientTagValue = normalize(e.target.parentNode.getAttribute('data-ingredient-active-tag'));
      ingredientsFilter = ingredientsFilter.filter((ingredient) => {
         return ingredient !== ingredientTagValue;
      })
      updateRecipesFromGlobal();
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
   if (e.target.getAttribute('data-appliance') && !appliancesFilter.includes(normalize(e.target.getAttribute('data-appliance')))) {
      let applianceTagValue = normalize(e.target.textContent);
      appliancesFilter.push(applianceTagValue);
      updateRecipesByApplianceTag(globalFilter(), applianceTagValue);
      document.querySelector(".appliance-search-bar").value = "";
   }
})

//Appliance active tag button close
document.addEventListener("click", (e) => {
   if (e.target.parentNode.getAttribute('data-appliance-active-tag')) {
      let applianceTagValue = normalize(e.target.parentNode.getAttribute('data-appliance-active-tag'));
      appliancesFilter = appliancesFilter.filter((appliance) => {
         return appliance !== applianceTagValue;
      })
      updateRecipesFromGlobal();
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
   if (e.target.getAttribute('data-ustensil') && !ustensilsFilter.includes(normalize(e.target.getAttribute('data-ustensil')))) {
      let ustensilTagValue = normalize(e.target.textContent);
      ustensilsFilter.push(ustensilTagValue);
      updateRecipesByUstensilsTag(globalFilter(), ustensilTagValue);
      document.querySelector(".ustensil-search-bar").value = "";
   }
})

//Ustensil active tag button close
document.addEventListener("click", (e) => {
   if (e.target.parentNode.getAttribute('data-ustensil-active-tag')) {
      let ustensilTagValue = normalize(e.target.parentNode.getAttribute('data-ustensil-active-tag'));
      ustensilsFilter = ustensilsFilter.filter((ustensil) => {
         return ustensil !== ustensilTagValue;
      })
      updateRecipesFromGlobal();
      document.querySelector(".ustensil-search-bar").value = "";
   }
})