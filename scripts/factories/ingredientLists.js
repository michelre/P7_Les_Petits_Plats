class IngredientList {
    constructor(ingredients) {
        this.ingredients = ingredients;
    }

    renderList() {

        const ingredientsList = document.createElement("ul");
        ingredientsList.classList.add("tag-list");
        ingredientsList.classList.add("ingredients-list");

        for (let i = 0; i < this.ingredients.length; i++) {

            //create tag list
            const ingredientListItem = document.createElement("li");
            ingredientListItem.textContent = this.ingredients[i];
            ingredientsList.appendChild(ingredientListItem);

            //Create  active tags
            const activeTags = document.querySelector(".active-tags");
            const tagButton = document.createElement("div");
            tagButton.classList.add("tag-button");
            tagButton.classList.add("ingredient-tag");
            const tagButtonText = document.createElement("p");
            tagButton.textContent = this.ingredients[i];
            tagButtonText.classList.add("tag-button-text");
            tagButton.appendChild(tagButtonText);
            const tagButtonClose = document.createElement("i");
            tagButtonClose.classList.add("fa-regular");
            tagButtonClose.classList.add("fa-circle-xmark");
            tagButtonClose.classList.add("tag-button-close");
            tagButton.appendChild(tagButtonClose);

            function displayTag() {
                    activeTags.appendChild(tagButton);
            }

            tagButtonClose.addEventListener("click", (e) => e.target.parentNode.remove());
            ingredientListItem.addEventListener("click", displayTag);
        }

        return ingredientsList;

    }
}

export default IngredientList;
