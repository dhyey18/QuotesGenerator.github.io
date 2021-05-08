const quoteText = document.getElementById("quote");
const author = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitter = document.getElementById("twitter");
const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");

let apiQuotes = [];

// Show new Quotes
function newQuote() {
  loading();
  // Pick a random quotes from apiQuotes array
  const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (quotes.author === null) {
    author.textContent = "Unknown";
  } else {
    author.textContent = quotes.author;
  }

  // if Quote length is biger
  if (quotes.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Remove loader when we get our text
  quoteText.textContent = quotes.text;
  compelete();
}

// Get quotes from API
async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch error
  }
}

// Loading function
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function compelete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const authors = author.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${authors}`;
  window.open(twitterUrl, "_blank");
}

// Event handler
newQuoteBtn.addEventListener("click", newQuote);
twitter.addEventListener("click", tweetQuote);

getQuotes();
