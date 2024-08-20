document.addEventListener("DOMContentLoaded", () => {
    async function fetchOldGames() {
      const apiUrl = 'https://v2.api.noroff.dev/old-games';
  
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error(`An error has occurred: ${response.status}`);
        }
  
        const result = await response.json();
        
        console.log(result);
        
        if (Array.isArray(result.data)) {
          displayGames(result.data);
        } else {
          console.error('Data is not an array:', result.data);
        }
      } catch (error) {
        console.error('Error fetching old games:', error);
      }
    }
  
    function displayGames(games) {
      const gamesContainer = document.getElementById('games-container');
      
      if (!gamesContainer) {
        console.error('Container element with ID "games-container" not found.');
        return;
      }
      
      games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
  
        gameDiv.innerHTML = `
          <img src="${game.image.url}" alt="${game.image.alt}">
          <div class="game-info">
            <h2>${game.name}</h2>
            <p><strong>Genres:</strong> ${game.genre.join(', ')}</p>
          </div>
        `;
  
        gamesContainer.appendChild(gameDiv);
      });
    }
  
    fetchOldGames();
  });
  