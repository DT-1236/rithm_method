function shuffle(arr) {
    let currentIndex = arr.length;
    let newIndex, currentValue;

    while (currentIndex > 0) {
        newIndex = Math.floor(Math.random() * currentIndex--);
        currentValue = arr[currentIndex];
        arr[currentIndex] = arr[newIndex];
        arr[newIndex] = currentValue;
    }

    return arr;
}

function createCard(cardClass) {
    let card = document.createElement('div');
    card.className = cardClass;

    return card;
}

function createCards(cardClass, setSize) {
    let cards = [];
    for (let i = 0; i < setSize; i++) {
        cards.push(createCard(cardClass + i))
    }

    return cards;
}

function createDeck(sets, setSize) {
    let cards = [];
    for (let i = 0; i < sets; i++) {
        cards.splice(0, 0, ...createCards('card', setSize))
    }

    return shuffle(cards);
}

function setupMemoryGame(sets, setSize)