class ApplianceList {
    constructor(appliances) {
        this.appliances = appliances;
    }

    renderList() {

        const appliancesList = document.createElement("ul");
        appliancesList.classList.add("tag-list");
        appliancesList.classList.add("appliances-list");

        for (let i = 0; i < this.appliances.length; i++) {
           
                const applianceListItem = document.createElement("li");
                applianceListItem.textContent = this.appliances[i];
                appliancesList.appendChild(applianceListItem);     

        }

        return appliancesList;

    }
}

export default ApplianceList;