
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('foodForm');
    const foodCardsContainer = document.getElementById('foodCards');
    let foodItems = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('foodName').value.trim();
        const desc = document.getElementById('foodDesc').value.trim();
        const imgUrl = document.getElementById('foodImg').value.trim();
        const rank = parseInt(document.getElementById('foodRank').value);

        if (!name || !desc || !imgUrl || isNaN(rank) || rank < 1) {
            alert('Please enter valid inputs. Rank must be a positive number.');
            return;
        }

        if (foodItems.some(food => food.rank === rank)) {
            alert('Rank must be unique. Please choose a different rank.');
            return;
        }

        const foodItem = { name, desc, imgUrl, rank };
        foodItems.push(foodItem);
        foodItems.sort((a, b) => a.rank - b.rank);

        renderFoodCards();
        form.reset();
    });

    function renderFoodCards() {
        foodCardsContainer.innerHTML = '';

        foodItems.forEach((food) => {
            const card = document.createElement('div');
            card.classList.add('food-card');

            card.innerHTML = `
                <div class="rank-box">${food.rank}</div>
                <img src="${food.imgUrl}" alt="${food.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/150';">
                <h3>${food.name}</h3>
                <p>${food.desc}</p>
                <button class="delete-btn" data-rank="${food.rank}">Delete</button>
            `;

            foodCardsContainer.appendChild(card);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const rankToDelete = parseInt(event.target.dataset.rank);
                foodItems = foodItems.filter(food => food.rank !== rankToDelete);
                renderFoodCards();
            });
        });
    }
});
