const gameBoard = document.getElementById('gameBoard');
const attemptsDisplay = document.getElementById('attempts');
const restartBtn = document.getElementById('restart');

restartBtn.addEventListener('click', () =>{
  window.location.reload();
});
        const symbols = [
          '🍇', '🍉', '🚗', '🍌', '🏠', '🥭', '🍎', '🐯',
          '🍒', '🍓', '🐵', '🥝', '🍿', '🏀', '🎱', '🐻',
          '🍜', '🍢', '🎓', '🍤', '🦀', '🍦', '🍩', '🎂',
          '🍫', '🍭', '🍼', '🪔', '🍺', '🐱', '🐶', '🦁','😍',
          '🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪',
          '🤨','🧐','🤓','😎','🥸','🤩','🥳','🙂‍↕️','😏','😒',
          '🙂‍↔️','😞','😔','😟','😕','🙁','☹️','😣','😖'
      ];

      let attempts = 0;
      let activeTiles = [];
      let matches = 0;
      let selectedSymbols = [];
      const tilesPerPage = 16;
      

      const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());

      const selectRandomSymbols = (symbolsArray, count) => {
          const shuffled = shuffleArray(symbolsArray);
          return shuffled.slice(0, count / 2).concat(shuffled.slice(0, count / 2));
      };

      const setupGame = () => {
          attempts = 0;
          matches = 0;
          activeTiles = [];
          attemptsDisplay.textContent = `Attempts: ${attempts}`;
          gameBoard.innerHTML = '';

          selectedSymbols = shuffleArray(selectRandomSymbols(symbols, tilesPerPage));

          selectedSymbols.forEach((symbol, index) => {
              const tileContainer = document.createElement('div');
              tileContainer.className = 'tile-container';

              const tile = document.createElement('div');
              tile.className = 'tile';
              tile.dataset.index = index;

              const front = document.createElement('div');
              front.className = 'front';
              front.textContent = '❓'; 

              const back = document.createElement('div');
              back.className = 'back';
              back.textContent = symbol;

              tile.appendChild(front);
              tile.appendChild(back);
              tileContainer.appendChild(tile);
              gameBoard.appendChild(tileContainer);

              tile.addEventListener('click', () => handleTileClick(tile, index));
          });
      };

      const handleTileClick = (tile, index) => {
          if (tile.classList.contains('matched') || activeTiles.length === 2 || tile.classList.contains('flipped')) return;

          tile.classList.add('flipped');
          activeTiles.push(tile);

          if (activeTiles.length === 2) {
              attempts++;
              attemptsDisplay.textContent = `Attempts: ${attempts}`;

              const [firstTile, secondTile] = activeTiles;

              if (selectedSymbols[firstTile.dataset.index] === selectedSymbols[secondTile.dataset.index]) {
                  firstTile.classList.add('matched');
                  secondTile.classList.add('matched');
                  matches++;

                  if (matches === selectedSymbols.length / 2) {
                      setTimeout(() => alert("Congratulations 🎉, You Won!"), 500);
                  }
              } else {
                  setTimeout(() => {
                      firstTile.classList.remove('flipped');
                      secondTile.classList.remove('flipped');
                  }, 1000);
              }

              activeTiles = [];
          }
      };
      setupGame();