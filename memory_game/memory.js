/*
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
*/

function createCard(cardNumber) {
    let card = document.createElement('div');
    let front = document.createElement('div');
    let back = document.createElement('div');
    let topNum = document.createElement('div');
    let botNum = document.createElement('div');

    card.className = 'card' + cardNumber;
    front.className = 'front';
    back.className = 'back';
    topNum.className = 'topNum';
    botNum.className = 'botNum';

    topNum.innerText = cardNumber;
    botNum.innerText = cardNumber;

    back.style.opacity = 1;
    back.style.background = 'Olive';

    front.appendChild(topNum);
    front.appendChild(botNum);
    card.appendChild(front);
    card.appendChild(back);

    return card;
}

function createCards(setSize) {
    let cards = [];
    for (let i = 0; i < setSize; i++) {
        cards.push(createCard(i))
    }

    return cards;
}

function createDeck(sets, setSize) {
    let deck = [];
    for (let i = 0; i < setSize; i++) {
        // Create a card for each set
        deck.splice(0, 0, ...createCards(sets))
    }

    return deck;
}

function dealDeck(deck) {
    removeDeck();
    let surface = document.getElementById('surface');
    for (let i = 0; i < deck.length; i++) {
        deck[i].style.order = Math.floor(Math.random() * deck.length);
        surface.appendChild(deck[i]);
    }
}

function removeDeck() {
    let surface = document.getElementById("surface");
    while (surface.lastChild) {
        surface.removeChild(surface.lastChild);
    }
}

function revealCard(cardBack, selected) {
    if (cardBack.style.opacity === 1) {
        cardback.style.opacity = 0;
        selected.push(cardBack);
    }

    return selected;
}

function selectionFailure() {
    // Disables clicks for 1.5 seconds
    document.addEventListener("click", clicker, true);
    function clicker(e){
        e.stopPropagation();
        e.preventDefault();
    }

    setTimeout(function() {document.removeEventListener('click', clicker, true);}, 1500);
}

function checkSuccess(selected) {
    return selected.every(function(cardBack) {
        return cardBack.parentElement.className === selected[0].parentElement.className;
    });
}

function resolveSelected(selected, revealed) {
    if (!checkSuccess(selected)) {
        selectionFailure();
        setTimeout(function() {
            selected.forEach(function(cardBack) {
                cardBack.style.opacity = 1;
            });
        }, 1500);
        
    } else {
        revealed += selected.length;
    }

    return revealed;
}

function cardValid(card) {
    return (card.className === 'back' && card.style.opacity === '1');
}

function victory(clicks) {
    let newGame = setTimeout(function() {
        confirm("You've won!\nIt took you " + clicks + " clicks\n\n Did you want to play again?");
    }, 1500);
    console.log(newGame);
}

function playGame(sets, setSize) {
    let deck = createDeck(sets, setSize);
    let surface = document.getElementById('surface');
    let selected = [];
    let revealed = 0;
    let clicks = 0;
    dealDeck(deck);
    surface.addEventListener('click', function(event) {
        clicks++;
        let cardBack = event.target;

        if (cardValid(cardBack)) {
            cardBack.style.opacity = 0;
            selected.push(cardBack);
        }

        if (selected.length === setSize) {
            revealed = resolveSelected(selected, revealed);
            selected = [];

        }

        if (revealed === sets * setSize) {
            victory(clicks);
        }
    });
}

console.log('Scripts loaded');
// document.getElementById("myElement").onclick = function() { return false; } 