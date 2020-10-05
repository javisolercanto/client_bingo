'use strict'

import './css/style.css';
import { docReady } from './js/core/core.js';
import './js/controlers/stopball.js';
import './js/card.js';
import Bombo from './js/bombo.js';
import Card from './js/card.js';

let app = (() => {
    let numbers = document.getElementById("numbers");
    let card = document.getElementById("card");
    let bombo = new Bombo();

    let bingoGame = setInterval(game, 1000);

    function game() {
        card.innerHTML = "";
        bombo.pickNumber();
        let number = bombo.getExtractedNumbers()[bombo.getExtractedNumbers().length-1];

        let bingoCard = new Card();
        bingoCard.getCard().map((value) => {
            value.map((_, index) => {
                if (value[index] != -1) card.append(document.createTextNode("  " + value[index] + "  "));
                else card.append(document.createTextNode("X"));
            });

            card.append(document.createElement("br"));
        });

        if (bombo.getExtractedNumbers().length == 90) stopGame();
        else numbers.innerHTML = numbers.innerHTML + " " + number;
    }

    function stopGame() {clearInterval(bingoGame)}
})();

docReady(app);

if (module.hot)       // eslint-disable-line no-undef
    module.hot.accept() // eslint-disable-line no-undef

export { app };