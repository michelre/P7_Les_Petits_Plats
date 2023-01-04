class ApplianceList {
    constructor(appliances) {
        this.appliances = appliances;
    }

    renderList() {

        const appliancesList = document.createElement("ul");
        appliancesList.classList.add("tag-list");
        appliancesList.classList.add("appliances-list");

        for (let i = 0; i < this.appliances.length; i++) {
            //Create tag list
            const applianceListItem = document.createElement("li");
            applianceListItem.textContent = this.appliances[i];
            appliancesList.appendChild(applianceListItem);

            //Create active tags
            const activeTags = document.querySelector(".active-tags");
            const tagButton = document.createElement("div");
            tagButton.classList.add("tag-button");
            tagButton.classList.add("appliance-tag");
            const tagButtonText = document.createElement("p");
            tagButton.textContent = this.appliances[i];
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

            applianceListItem.addEventListener("click", displayTag);
        }

        return appliancesList;

    }
}

export default ApplianceList;