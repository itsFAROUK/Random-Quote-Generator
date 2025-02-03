const quoteText = document.querySelector(".quote")
const author = document.querySelector(".author")
const newQuoteBtn = document.querySelector(".new-btn")
const voiceBtn = document.querySelector(".voice")
const copyBtn = document.querySelector(".copy")
const x_twitterBtn = document.querySelector(".x-twitter")

newQuoteBtn.addEventListener("click", randomQuote)
voiceBtn.addEventListener("click", hearQuote)
copyBtn.addEventListener("click", copyQuote)
x_twitterBtn.addEventListener("click", shareOnXTwitter)

function randomQuote() {
    newQuoteBtn.classList.add("loading")
    newQuoteBtn.innerText = "Loading Quote.."
    fetch("http://api.quotable.io/random").then(res => res.json()).then(result => {
        quoteText.innerText = result.content
        author.innerText = result.author
        newQuoteBtn.innerText = "New Quote"
        newQuoteBtn.classList.remove("loading")
    })
}

function hearQuote() {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${author.innerText}`)
    speechSynthesis.speak(utterance)
}

function copyQuote() {
    navigator.clipboard.writeText(quoteText.innerText)
}

function shareOnXTwitter() {
    let tweetUrl =`https://twitter.com/intent/tweet/?url=${quoteText.innerText}`
    window.open(tweetUrl, "_blank")
}

randomQuote()
