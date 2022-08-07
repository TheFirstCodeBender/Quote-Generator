
let apiQuotes = [];
// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://zenquotes.io/api/quotes/';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes)
    } catch (error) {
        //Catch Error Here
        console.log(error)
    }
}

// On Load
getQuotes();