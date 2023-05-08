const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function completed() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick A Random Quote From API Quotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author feild is blanck and replace it with 'Unknown'
    if(!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }
    // Set Quote, Hide Loader
    completed();
    quoteText.textContent = quote.text;
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        // Catch Error Here
        alert(error);
    }
}


// Tween Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// On Load
getQuotes();
