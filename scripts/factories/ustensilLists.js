class UstensilList {
    constructor(ustensils) {
        this.ustensils = ustensils;
    }

    renderList() {

        const ustensilsList = document.createElement("ul");
        ustensilsList.classList.add("tag-list");
        ustensilsList.classList.add("ustensils-list");

        for (let i = 0; i < this.ustensils.length; i++) {
            //Create tag list
                const ustensilListItem = document.createElement("li");
                ustensilListItem.textContent = this.ustensils[i];
                ustensilListItem.dataset.ustensil = this.ustensils[i];
                ustensilsList.appendChild(ustensilListItem);  
                
                //Create  active tags
            const activeTags = document.querySelector(".active-tags");
            const tagButton = document.createElement("div");
            tagButton.classList.add("tag-button");
            tagButton.classList.add("ustensil-tag");
            const tagButtonText = document.createElement("p");
            tagButton.textContent = this.ustensils[i];
            tagButtonText.classList.add("tag-button-text");
            tagButton.appendChild(tagButtonText);
            tagButton.dataset.ustensilActiveTag = this.ustensils[i];
            const tagButtonClose = document.createElement("i");
            tagButtonClose.classList.add("fa-regular");
            tagButtonClose.classList.add("fa-circle-xmark");
            tagButtonClose.classList.add("tag-button-close");
            tagButton.appendChild(tagButtonClose);

            function displayTag() {
                    activeTags.appendChild(tagButton);
            }

            tagButtonClose.addEventListener("click", (e) => e.target.parentNode.remove());
            ustensilListItem.addEventListener("click", displayTag);
        }

        return ustensilsList;

    }
}

export default UstensilList;
