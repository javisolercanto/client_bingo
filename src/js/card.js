export default class Card {
    constructor() {
        let card = [];
        let row1 = Array.from({length:9},(_,i) => i + 1);
        let row2 = Array.from({length:9},(_,i) => i + 1);
        let row3 = Array.from({length:9},(_,i) => i + 1);

        let getRandomNumber = (max, min) => {
            return Math.floor(Math.random() * (max - min) + min);
        }
        
        let fillNumbers = () => {
            row1.map((_, index) => {
                let numbers = getRandomCol([], index).sort();
                row1[index] = numbers[0];
                row2[index] = numbers[1];
                row3[index] = numbers[2];
            });
        }

        let getRandomCol = (numbers, index) => {
            let min = index * 10;
            let max = min + 9;

            if (index == 0) min = 1;
            if (index == 8) max++;

            let random = getRandomNumber(max, min);

            if (numbers.indexOf(random) < 0) numbers.push(random);

            if (numbers.length < 3) return getRandomCol(numbers, index);

            return numbers;
        }

        let getGaps = (row, accounter) => {
            if (accounter < 4) {
                let random = getRandomNumber(8, 0);
                if (row[random] !== -1) {
                    row[random] = -1;
                    return getGaps(row, accounter+1);
                } else return getGaps(row, accounter);
            } return row;
        }

        let getLastLineGaps = (row1, row2, finalRow, accounter) => {
            if (accounter < 4) {
                let random = getRandomNumber(8, 0);
                if ((row1[random] != -1 || row2[random] != -1) && finalRow[random] != -1) {
                    finalRow[random] = -1;
                    return getLastLineGaps(row1, row2, finalRow, accounter+1);
                } else return getLastLineGaps(row1, row2, finalRow, accounter);
            } return finalRow;
        }

        this.getCard = () => card;

        fillNumbers();

        card.push(getGaps(row1, 0));
        card.push(getGaps(row2, 0));
        card.push(getLastLineGaps(card[0], card[1], row3, 0));
    }
}