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

//Initialise recipe cards
async function initCards() {
   const recipes = await getRecipes();
   const cards = new RecipeCards(recipes);
   const mainSection = document.querySelector("main");
   mainSection.appendChild(cards.renderCards());

}

initCards();

//Initialise ingredients list

async function initIngredientList() {
   const recipes = await getRecipes();
   let ingredients = [];
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
   const recipes = await getRecipes();
   let appliances = recipes.map(recipe => recipe.appliance);
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
   const recipes = await getRecipes();
let ustensils = [];
for (let i = 0; i < recipes.length; i++) {
   for (let j = 0; j < recipes[i].ustensils.length; j++) {
      ustensils.push(recipes[i].ustensils[j]);
   }
}
ustensils = Array.from(new Set(ustensils));
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
