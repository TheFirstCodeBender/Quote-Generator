const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newTwitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true
}


//Show New Quote
function getRandomQuote() {
    showLoadingSpinner();
    //Pick a random quote from apiQuotes array if found otherwise use local array
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if (!quote.Text) {
        quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    }
    //If author field is blank replace it with "Unknown"
    if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author
    }
    //Check Quote length to determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text
    removeLoadingSpinner();
}


// Get Quotes From API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        getRandomQuote()
    } catch (error) {
        //Catch Error Here
        console.log(error)
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getRandomQuote);
newTwitterBtn.addEventListener('click', tweetQuote)
// On Load
getQuotes();


