document.addEventListener("DOMContentLoaded", function () {
    // const colors = [
    //     "red",
    //     "green",
    //     "blue",
    //     "yellow",
    //     "orange",
    //     "red",
    //     "green",
    //     "blue",
    //     "yellow",
    //     "orange"
    // ];

    const cards = document.querySelectorAll('.card');

    let locked = false;
    let flippedCard = false;
    let cardOne, cardTwo;

    function flipCard() {
        if (locked) return;
        if (this === cardOne) return;

        this.classList.add('flip');


        if (!flippedCard) {
            flippedCard = true;
            cardOne = this;
        } else {
            flippedCard = false;
            cardTwo = this;

            cardMatch();
        }
    }

    function cardMatch() {
        if (cardOne.dataset.id === cardTwo.dataset.id) {
            disableCard();
        } else {
            flipBack();
        }
    }

    function disableCard() {
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);

        resetCards();
    }

    function flipBack() {
        locked = true;
        setTimeout(() => {
            cardOne.classList.remove('flip');
            cardTwo.classList.remove('flip');

            resetCards();
        }, 1000);
    }

    function resetCards() {
        [flippedCard, locked] = [false, false];
        [cardOne, cardTwo] = [null, null];
    }

    (function shuffle() {
        cards.forEach(card => {
            let random = Math.floor(Math.random() * 10);
            card.style.order = random;
        });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));
});