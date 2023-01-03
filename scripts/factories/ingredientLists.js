class IngredientList {
    constructor(recipes) {
        this.recipes = recipes;
    }

    renderList() {

        const ingredientsList = document.createElement("ul");
        ingredientsList.classList.add("tag-list");
        ingredientsList.classList.add("ingredients-list");

        for (let i = 0; i < this.recipes.length; i++) {

            for (let j = 0; j < this.recipes[i].ingredients.length; j++) {
                const ingredientListItem = document.createElement("li");
                ingredientListItem.textContent = this.recipes[i].ingredients[j].ingredient;
                ingredientsList.appendChild(ingredientListItem);
            }

        }

        return ingredientsList;

    }
}

export default IngredientList;
