class ApplianceList {
    constructor(recipes) {
        this.recipes = recipes;
    }

    renderList() {

        const appliancesList = document.createElement("ul");
        appliancesList.classList.add("tag-list");
        appliancesList.classList.add("appliances-list");

        for (let i = 0; i < this.recipes.length; i++) {
           
                const applianceListItem = document.createElement("li");
                applianceListItem.textContent = this.recipes[i].appliance;
                appliancesList.appendChild(applianceListItem);     

        }

        return appliancesList;

    }
}

export default ApplianceList;