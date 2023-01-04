class IngredientList {
    constructor(ingredients) {
        this.ingredients = ingredients;
    }

    renderList() {

        const ingredientsList = document.createElement("ul");
        ingredientsList.classList.add("tag-list");
        ingredientsList.classList.add("ingredients-list");

        for (let i = 0; i < this.ingredients.length; i++) {
                const ingredientListItem = document.createElement("li");
                ingredientListItem.textContent = this.ingredients[i];
                ingredientsList.appendChild(ingredientListItem);
                
        }

        return ingredientsList;

    }
}

export default IngredientList;
