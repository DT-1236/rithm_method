function getRandomColor() {
    let hexes = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += hexes[Math.floor(Math.random() * 16)];
    }

    return color;
}

function createCard(currentSet, color) {
    let card = document.createElement('div');
    let front = document.createElement('div');
    let back = document.createElement('div');
    let topNum = document.createElement('div');
    let botNum = document.createElement('div');

    card.className = 'card' + currentSet;
    front.className = 'front';
    back.className = 'back';
    topNum.className = 'topNum';
    botNum.className = 'botNum';

    topNum.innerText = currentSet;
    botNum.innerText = currentSet;

    back.style.opacity = '1';
    back.style.background = '#851e3e';
    front.style.background = color;

    front.appendChild(topNum);
    front.appendChild(botNum);

    card.appendChild(front);
    card.appendChild(back);

    return card;
}

function createCards(currentSet, setSize) {
    let cards = [];
    let color = getRandomColor();
    for (let i = 0; i < setSize; i++) {
        cards.push(createCard(currentSet, color))
    }

    return cards;
}

function createDeck(totalSets, setSize) {
    let deck = [];
    for (let currentSet = 0; currentSet < totalSets; currentSet++) {
        deck.splice(0, 0, ...createCards(currentSet, setSize))
    }

    return deck;
}

function determineGridSize(deck) {
    let sizeString = '';
    let rows = Math.ceil(Math.sqrt(deck.length));
    let size = 100 / rows + '% ';
    for (let i = 0; i < rows; i++) {
        sizeString += size;
    }

    return sizeString;
}

function dealDeck(deck) {
    let size = determineGridSize(deck);
    removeDeck();
    document.getElementById('surface').style.gridTemplateColumns = size;
    document.getElementById('surface').style.gridTemplateRows = size;
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

function disableClicks(ms) {
    document.addEventListener("click", disableClicks, true);
    function disableClicks(event){
        event.stopPropagation();
        event.preventDefault();
    }

    setTimeout(function() {
        document.removeEventListener('click', disableClicks, true);
    }, ms);
}

function flipSelectedCards(selected) {
    setTimeout(function() {
        selected.forEach(function(cardBack) {
            cardBack.style.opacity = 1;
        });
    }, 1500);        
}

function checkSuccess(selected) {
    let firstClass = selected[0].parentElement.className;
    return selected.every(function(cardBack) {
        return cardBack.parentElement.className === firstClass;
    });
}

function resolveSelected(selected, revealed) {
    if (checkSuccess(selected)) {
        revealed += selected.length;

    } else {
        disableClicks(1500);
        flipSelectedCards(selected);
    }

    return revealed;
}

function cardValid(card) {
    return (card.className === 'back' && card.style.opacity === '1');
}

function victory(clicks) {
    setTimeout(function() {
        alert("You won in " + clicks + " clicks!\n\n Did you want to play again?");
    }, 1500);
    document.getElementById('menu').style.opacity = 1;
    document.getElementById('menu').style.zIndex = 100;
}

function playGame(sets, setSize) {
    let deck = createDeck(sets, setSize);
    let surface = document.getElementById('surface');
    let selected = [];
    let revealed = 0;
    let clicks = 0;
    document.getElementById('menu').style.opacity = 0;
    setTimeout(function() {
        document.getElementById('menu').style.zIndex = -100;
    }, 2000);
    dealDeck(deck);

    surface.addEventListener('click', function clickHandler(event) {
        let cardBack = event.target;
        
        if (cardValid(cardBack)) {
            document.getElementById('counter').innerText = ++clicks;
            cardBack.style.opacity = 0;
            selected.push(cardBack);
        }

        if (selected.length === setSize) {
            revealed = resolveSelected(selected, revealed);
            selected = [];
        }

        if (revealed === sets * setSize) {
            revealed = 0;
            victory(clicks)
            document.getElementById('counter').innerText = 0;
            localStorage.setItem(sets + '_' + setSize, clicks);
            surface.removeEventListener('click', clickHandler);
        }
    });
}

this.onload = function() {
    document.querySelector('button').addEventListener('click', function(event) {
        let args = document.querySelectorAll('select');
        playGame(Number(args[0].value), Number(args[1].value));
    });

    document.querySelector('form').addEventListener('click', function(event) {
        let args = document.querySelectorAll('select');
        let sets = Number(args[0].value);
        let setSize = Number(args[1].value);
        let score = localStorage.getItem(sets + '_' + setSize);
        if (score === null) {
            document.querySelector('#score p').innerText = "Unchallenged";
        } else {
        let misses = (score - sets * setSize) / setSize;
        score = misses === 0 ? score + ' (Perfect)' : score + ' (missed x' + misses + ')';
        document.querySelector('#score p').innerText = score;
        }
    });

}

console.log('Scripts loaded');
