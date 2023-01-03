class UstensilList {
    constructor(recipes) {
        this.recipes = recipes;
    }

    renderList() {

        const ustensilsList = document.createElement("ul");
        ustensilsList.classList.add("tag-list");
        ustensilsList.classList.add("ustensils-list");

        for (let i = 0; i < this.recipes.length; i++) {

            for (let j = 0; j < this.recipes[i].ustensils.length; j++) {
                const ustensilListItem = document.createElement("li");
                ustensilListItem.textContent = this.recipes[i].ustensils[j];
                ustensilsList.appendChild(ustensilListItem);
            }

        }

        return ustensilsList;

    }
}

export default UstensilList;
