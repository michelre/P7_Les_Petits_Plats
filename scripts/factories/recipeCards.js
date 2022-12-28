class RecipeCards {
    constructor(recipes) {
        this.recipes = recipes;
    }

    renderCards() {

        const recipesSection = document.createElement("section");
        recipesSection.classList.add("recipes-section");

        for (let i = 0; i < this.recipes.length; i++) {
            const card = document.createElement("div");
            card.classList.add("card");

            const cardImage = document.createElement("img");
            cardImage.setAttribute("src", "assets/placeholderCardImg.jpg");
            cardImage.setAttribute("alt", "Placeholder image");
            cardImage.classList.add("card-img-top");
            card.appendChild(cardImage);

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardBodyTop = document.createElement("div");
            cardBodyTop.classList.add("card-body-top");
            cardBody.appendChild(cardBodyTop);

            const cardTitle = document.createElement("h2");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = this.recipes[i].name;
            cardBodyTop.appendChild(cardTitle);

            const cardTime = document.createElement("div");
            cardTime.classList.add("card-time");
            cardBodyTop.appendChild(cardTime);

            const cardTimeIcon = document.createElement("i");
            cardTimeIcon.classList.add("fa-regular");
            cardTimeIcon.classList.add("fa-clock");
            cardTime.appendChild(cardTimeIcon);

            const cardTimeValue = document.createElement("p");
            cardTimeValue.classList.add("card-time-value");
            cardTimeValue.textContent = `${this.recipes[i].time} min`;
            cardTime.appendChild(cardTimeValue);

            const cardMainText = document.createElement("div");
            cardMainText.classList.add("card-main-text");
            cardBody.appendChild(cardMainText);

            const cardBodyLeft = document.createElement("div");
            cardBodyLeft.classList.add("card-body-left");
            cardMainText.appendChild(cardBodyLeft);

            const cardIngredients = document.createElement("div");
            cardIngredients.classList.add("card-ingredients");
            cardBodyLeft.appendChild(cardIngredients);

            //iterate through ingredients
            for (let j = 0; j < this.recipes[i].ingredients.length; j++) {
                const ingredients = document.createElement("p");
                ingredients.classList.add("card-text");
                const ingredient = document.createElement("span");
                ingredient.classList.add("ingredient");
                ingredients.appendChild(ingredient);

                //check if quanity specified and add element accordingly
                if (this.recipes[i].ingredients[j].quantity) {
                    const ingredientQuantity = document.createElement("span");
                    ingredientQuantity.classList.add("ingredient-quantity");
                    ingredients.appendChild(ingredientQuantity);
                    ingredientQuantity.textContent = `${this.recipes[i].ingredients[j].quantity}`;
                    ingredient.textContent = `${this.recipes[i].ingredients[j].ingredient}: `;
                } else {
                    ingredient.textContent = `${this.recipes[i].ingredients[j].ingredient}`;
                }
                //check if unit specified and add element accordingly
                if (this.recipes[i].ingredients[j].unit) {
                    const quantityUnit = document.createElement("span");
                    ingredients.appendChild(quantityUnit);

                    //Add space between quantity and unit text if full word
                    if (Object.keys(this.recipes[i].ingredients[j].unit).length > 2) {
                        quantityUnit.textContent = ` ${this.recipes[i].ingredients[j].unit}`
                    }
                    else {
                        quantityUnit.textContent = `${this.recipes[i].ingredients[j].unit}`;
                    }
                }
                
                cardIngredients.appendChild(ingredients);

            }

            const carBodyRight = document.createElement("div");
            carBodyRight.classList.add("card-body-right");
            cardMainText.appendChild(carBodyRight);


            const cardInstructions = document.createElement("p");
            cardInstructions.classList.add("card-instructions");
            cardInstructions.classList.add("card-text");
            cardInstructions.textContent = `${this.recipes[i].description}`;
            carBodyRight.appendChild(cardInstructions);

            card.appendChild(cardBody);
            recipesSection.appendChild(card);

        }

        return recipesSection;

    }

}

export default RecipeCards;