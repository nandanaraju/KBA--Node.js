const recipes = [
    {
        name: "Chicken Curry",
        ingredients: ["chicken", "oil", "tomato", "onion", "garlic"]
    },
    {
        name: "Biriyani",
        ingredients: ["rice", "chicken", "Garam masala", "vegetables", "Ginger-garlic paste"]
    },
    {
        name: "Fish Curry",
        ingredients: ["fish", "oil", "chilli powder", "ginger", "garlic"]
    },

];

document.getElementById('ingredient-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    let ingredientInput = document.getElementById('ingredient-input');
    let ingredients = ingredientInput.value.trim().split(',').map(function(ing) {
        return ing.trim().toLowerCase();
    });

    if (ingredients.length === 0) {
        alert('Please enter at least one ingredient');
        return;
    }

    displayRecipes(searchRecipes(ingredients));
});

function searchRecipes(ingredients) {
    return recipes.filter(function(recipe) {
        return ingredients.every(function(ing) {
            return recipe.ingredients.some(function(recipeIng) {
                return recipeIng.toLowerCase() === ing;
            });
        });
    });
}

function displayRecipes(foundRecipes) {
    var recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    foundRecipes.forEach(function(recipe) {
        var li = document.createElement('li');
        li.textContent = recipe.name;

        var favButton = document.createElement('button');
        favButton.textContent = 'Add to Favorites';
        favButton.addEventListener('click', function() {
            addToFavorites(recipe);
        });
        li.appendChild(favButton);

        recipeList.appendChild(li);
    });
}

function addToFavorites(recipe) {
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    var favoriteRecipe = {
        name: recipe.name,
        ingredients: recipe.ingredients.slice() // Create a copy of the ingredients array
    };

    if (!favorites.some(function(fav) {
        return fav.name === recipe.name;
    })) {
        favorites.push(favoriteRecipe);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    }
}

function displayFavorites() {
    var favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';

    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites.forEach(function(favorite) {
        var li = document.createElement('li');
        li.textContent = favorite.name;

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            removeFromFavorites(favorite);
        });
        li.appendChild(removeButton);

        favoritesList.appendChild(li);
    });
}

function removeFromFavorites(recipe) {
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites = favorites.filter(function(fav) {
        return fav.name !== recipe.name;
    });

    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

// Initialize favorites list on page load
document.addEventListener('DOMContentLoaded', displayFavorites);