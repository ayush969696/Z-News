const apikey = "30fed301a8ac46279d888feaf8bc8d01";
const url = "https://newsapi.org/v2/everything?q=";
// https://newsapi.org/v2/everything?q=tesla&from=2024-01-16&sortBy=publishedAt&apiKey=30fed301a8ac46279d888feaf8bc8d01
// url + query + apikey

window.addEventListener("load", () => fetchNews("India")); // window will call fetchNews()

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
  // query is simply like what type of news you want
  const res = await fetch(`${url}${query}&apiKey=${apikey}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles); // receiving articles & showing
}

// bindData()
function bindData(articles) {
  const cardscontainer = document.getElementById("cards-container");
  const newsCardTemplates = document.getElementById("template-news-card");

  cardscontainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) {
      return;
    }

    const cardClone = newsCardTemplates.content.cloneNode(true); //it means we want to deep cloning in template

    fillDatainCard(cardClone, article);

    cardscontainer.appendChild(cardClone); // now we just append the card clone to cardcontainer and show to display
  });
}

// fillDatainCard()
function fillDatainCard(cardClone, article) {
  const newsImg = cardClone.querySelector('#news-img');
  const newsTitle = cardClone.querySelector('#news-title');
  const newSource = cardClone.querySelector('#news-source');
  const newsDesc = cardClone.querySelector('#news-desc');

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString('en-US', {
    timeZone: "Asia/Jakarta"
  });

  newSource.innerHTML = `${article.source.name} · ${date}`

  // opening news into a new tab 
  cardClone.firstElementChild.addEventListener('click', () => {
    window.open(article.url, "_blank")
  })
}

// onNavItemClick()
let curSelectedNav = null;
function onNavItemClick(queryid) {
    fetchNews(queryid);
    const navItem = document.getElementById(queryid);
    curSelectedNav?.classList.remove('active'); // it means when you click at new nav item so then remove the active class from previous class
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active')
}

const searchButton = document.getElementById('search-btn');
const searchText = document.getElementById('input-query')

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;

    fetchNews(query);

    // it help to remove the active class form nav items
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;  
})
