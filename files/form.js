
document.addEventListener('DOMContentLoaded', () => {

    // Will get the form and its container where the food cards will be displayed
    const form = document.getElementById('foodForm');
    const foodCardsContainer = document.getElementById('foodCards');
    let foodItems = []; // An array to store food items

    // For form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gets the user input values from the form
        const name = document.getElementById('foodName').value.trim();
        const desc = document.getElementById('foodDesc').value.trim();
        const imgUrl = document.getElementById('foodImg').value.trim();
        const rank = parseInt(document.getElementById('foodRank').value);


        // To validate the input fields
        if (!name || !desc || !imgUrl || isNaN(rank) || rank < 1) {
            alert('Please enter valid inputs. Rank must be a positive number.');
            return;
        }

        // To ensure that the rank is unique
        if (foodItems.some(food => food.rank === rank)) {
            alert('Rank must be unique. Please choose a different rank.');
            return;
        }

        // To create a new food item
        const foodItem = { name, desc, imgUrl, rank };
        foodItems.push(foodItem);
        foodItems.sort((a, b) => a.rank - b.rank); // To sort the food items based on its rank 

        renderFoodCards(); // To update the Ui in order to display the food cards
        form.reset(); // Resets the form after successful submission
    });

    // A function to render the food cards dynamically
    function renderFoodCards() {
        foodCardsContainer.innerHTML = ''; // Will clear the existing food cards before rendering

        foodItems.forEach((food) => { // Will create a food card container
            const card = document.createElement('div');
            card.classList.add('food-card');


            // The structure of the food card
            card.innerHTML = `
                <div class="rank-box">${food.rank}</div>
                <img src="${food.imgUrl}" alt="${food.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/150';">
                <h3>${food.name}</h3>
                <p>${food.desc}</p>
                <button class="delete-btn" data-rank="${food.rank}">Delete</button>
            `;

            foodCardsContainer.appendChild(card); // Will append the card to the container
        });

        // Add event listeners to all delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const rankToDelete = parseInt(event.target.dataset.rank);
                foodItems = foodItems.filter(food => food.rank !== rankToDelete);
                renderFoodCards();
            });
        });
    }
});
