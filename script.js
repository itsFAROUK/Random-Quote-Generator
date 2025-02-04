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
    fetch("https://api.api-ninjas.com/v1/quotes", {
        method: "GET",
        headers: {
            "X-Api-key": "SmOtameb9wLcsm0womwmnA==MhzqQvOfBIIcvzKz"
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to fetch quote")
        return res.json()
    })
    .then(result => {
        quoteText.innerText = result[0].quote || "No quote available."
        author.innerText = result[0].author || "Unknown"
    })
    .catch(error => {
        quoteText.innerText = "Failed to load quote. Try again!"
        author.innerText = ""
        console.error(error)
        console.log(error)
    })
    .finally(() => {
        newQuoteBtn.innerText = "New Quote"
        newQuoteBtn.classList.remove("loading")
    })
}

function hearQuote() {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${author.innerText}`);
    speechSynthesis.onvoiceschanged = () => {
        let voices = speechSynthesis.getVoices();
        utterance.voice = voices.find(voice => voice.name.includes("Microsoft Steffan Online (Natural) - English (United States)")) || voices[0];
        speechSynthesis.speak(utterance);
    };

}

function copyQuote() {
    navigator.clipboard.writeText(quoteText.innerText)
}

function shareOnXTwitter() {
    let tweetUrl =`https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.innerText + "-" + author.innerText)}`
    window.open(tweetUrl, "_blank")
}

randomQuote()
