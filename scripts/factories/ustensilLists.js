class UstensilList {
    constructor(ustensils) {
        this.ustensils = ustensils;
    }

    renderList() {

        const ustensilsList = document.createElement("ul");
        ustensilsList.classList.add("tag-list");
        ustensilsList.classList.add("ustensils-list");

        for (let i = 0; i < this.ustensils.length; i++) {
                const ustensilListItem = document.createElement("li");
                ustensilListItem.textContent = this.ustensils[i];
                ustensilsList.appendChild(ustensilListItem);      
        }

        return ustensilsList;

    }
}

export default UstensilList;
