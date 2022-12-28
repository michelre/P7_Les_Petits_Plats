import {getRecipes} from "../utils/getData.js";
import RecipeCards from "../factories/recipeCards.js";

async function initCards() {
   const recipes = await getRecipes();
   

const cards = new RecipeCards(recipes);
const mainSection = document.querySelector("main");
mainSection.appendChild(cards.renderCards());
 
}

initCards()