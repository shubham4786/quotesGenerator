
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById('quote');
const authorName = document.getElementById('author');
const loader = document.querySelector("span.loader");
const audioBtn = document.getElementById("audio");
const copyBtn = document.getElementById("copy");
let apiData = [];

// Show Loading
function loading() {
    loader.classList.remove("hide");
    quoteContainer.classList.add("hide");
}

// Hide Loading
function complete() {
    loader.classList.add("hide");
    quoteContainer.classList.remove("hide");
}


function displayQuote() {

    copyBtn.title = "Click to copy";

    const quote = apiData[Math.floor(Math.random() * apiData.length)];

    authorName.textContent = quote.author || "Unknown";

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')
    }

    quoteText.textContent = quote.text;
}


async function fetchData() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiData = await response.json();
        console.log(apiData);
        displayQuote();
        complete();

    } catch (error) {
        console.log(error);
    }
}

audioBtn.addEventListener("click", () => {
    const audio = new SpeechSynthesisUtterance(`${quote.innerText} by ${author.innerText}`);
    speechSynthesis.speak(audio);
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quote.innerText);
    copyBtn.title = "Copied";

});


fetchData();


