// Get recipes data from json file as array of objects
function getRecipes() {

    return fetch("../../data/recipes.json")
        .then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('Request failed!');
        }, networkError => { console.log(networkError.message) }
        )
        .then((jsonResponse) => jsonResponse.recipes)
        .catch(error => {
            console.log(error);
        });

}

export {getRecipes}