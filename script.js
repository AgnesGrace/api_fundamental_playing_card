
let appScore = 0
let myScore = 0
const newDeck = document.getElementById("new-deck")
const clickMe = document.getElementById("click-me")
const card1 = document.getElementById("card1")
const card2 = document.getElementById("card2")
let title = document.getElementById("title")
const app = document.getElementById("app")
const individual = document.getElementById("individual")
let availableCards = document.getElementById("availableCards")
let deckId = ""
const getCards = () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(response => response.json())
    .then(data => {
        availableCards.textContent = `Remaining cards: ${data.remaining}`
        console.log(data)
        deckId = data.deck_id

        
    })
}
newDeck.addEventListener("click", getCards)


clickMe.addEventListener("click", () =>{
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(response => response.json())
    .then(data => {
        availableCards.textContent = `Remaining cards: ${data.remaining}`
        console.log(data)
              card1.innerHTML = `<img src="${data.cards[0].image}"/>`
              card2.innerHTML = `<img src="${data.cards[1].image}"/>`


            const titleText = myCardWinner(data.cards[0], data.cards[1])
            title.textContent = titleText
            
            if (data.remaining === 0) {
                drawCardBtn.disabled = true
                if (appScore > myScore) {
                    title.textContent = "Heeey App won the game!"
                } else if (myScore > appScore) {
                    
                    title.textContent = "You won the game!"
                } else {
                    
                    title.textContent = "It's a tie game!"
                }
            }


                            
                
    })
    

})

function myCardWinner(card1, card2) {
    const playingCards = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = playingCards.indexOf(card1.value)
    const card2ValueIndex = playingCards.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        appScore++
        app.textContent = `App score: ${appScore}`
        return "APP wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        individual.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}
