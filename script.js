document.addEventListener("DOMContentLoaded", function() {
    const jokeTextElement = document.getElementById("joke-text");
    const generateJokeBtn = document.getElementById("generate-joke-btn");
    const copyJokeBtn = document.getElementById("copy-joke-btn");
  
    generateJokeBtn.addEventListener("click", generateJoke);
    copyJokeBtn.addEventListener("click", copyJokeToClipboard);
  
    function generateJoke() {
      const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
  
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const joke = data.type === 'twopart'
          ? `${data.setup} ${data.delivery}`
          : data.joke;
  
        jokeTextElement.textContent = joke;
      })
      .catch(error => {
        console.error('Error fetching data from JokeAPI:', error);
      });
    }
  
    function copyJokeToClipboard() {
      const jokeToCopy = jokeTextElement.textContent;
  
      // Create a temporary textarea element to copy text to clipboard
      const textarea = document.createElement("textarea");
      textarea.value = jokeToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
  
      // Optionally, you can provide user feedback (e.g., a tooltip)
      copyJokeBtn.innerText = "Copied!";
      setTimeout(() => {
        copyJokeBtn.innerText = "Copy Joke";
      }, 1500);
    }
  });
  

  document.addEventListener("DOMContentLoaded", function() {
    const newsContainer = document.querySelector(".news-container"); // Updated class name
  
    // Replace 'YOUR_API_KEY' with your actual NewsAPI key
    const apiKey = 'jkxyadhtStAbocLpY50Qr0ICuu2B7Gbo';
    const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=jkxyadhtStAbocLpY50Qr0ICuu2B7Gbo`;
  
    // Call NewsAPI to get latest news
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayNews(data.articles);
      })
      .catch(error => {
        console.error('Error fetching data from NewsAPI:', error);
      });
  
    function displayNews(articles) {
      articles.forEach(article => {
        const newsArticle = document.createElement("div");
        newsArticle.classList.add("news-article");
  
        const title = document.createElement("div");
        title.classList.add("news-title");
        title.textContent = article.title;
  
        const description = document.createElement("div");
        description.classList.add("news-description");
        description.textContent = article.description;
  
        newsArticle.appendChild(title);
        newsArticle.appendChild(description);
        newsContainer.appendChild(newsArticle);
      });
    }
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    const photosContainer = document.getElementById("photos-container");
  
    // Unsplash API endpoint for trending photos
    const apiUrl = 'https://api.unsplash.com/photos?per_page=6&order_by=popular&client_id=0CJ63gGVckzi849moPhgNea5AMQlMYd5RKlquhKSpgQ';
  
    // Call Unsplash API to get trending photos
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayPhotos(data);
      })
      .catch(error => {
        console.error('Error fetching data from Unsplash API:', error);
      });
  
    function displayPhotos(photos) {
      photos.forEach(photo => {
        const photoCard = document.createElement("div");
        photoCard.classList.add("photo-card");
  
        const photoImage = document.createElement("img");
        photoImage.classList.add("photo-image");
        photoImage.src = photo.urls.regular;
        photoImage.alt = photo.alt_description;
  
        photoCard.appendChild(photoImage);
        photosContainer.appendChild(photoCard);
      });
    }
  });
  

  document.addEventListener("DOMContentLoaded", function() {
    const songsContainer = document.getElementById("songs-container");
  
    // Use the Last.fm API or another music-related API to fetch new songs
    // Replace 'YOUR_LASTFM_API_KEY' with your actual API key
    const apiUrl = 'https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=8b1a29d1c99ed3858b44e713c0bc9224&format=json&limit=6';
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displaySongs(data.tracks.track);
      })
      .catch(error => {
        console.error('Error fetching data from Last.fm API:', error);
      });
  
    function displaySongs(songs) {
      songs.forEach(song => {
        const songCard = document.createElement("div");
        songCard.classList.add("song-card");
  
        const songTitle = document.createElement("div");
        songTitle.textContent = song.name;
  
        const artistName = document.createElement("div");
        artistName.classList.add("song-info");
        artistName.textContent = `Artist: ${song.artist.name}`;
  
        const playCount = document.createElement("div");
        playCount.classList.add("song-info");
        playCount.textContent = `Play Count: ${song.playcount}`;
  
        songCard.appendChild(songTitle);
        songCard.appendChild(artistName);
        songCard.appendChild(playCount);
        songsContainer.appendChild(songCard);
      });
    }
  });
  
  const API_KEY = "jkxyadhtStAbocLpY50Qr0ICuu2B7Gbo"; // Replace with your actual API key
const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const articles = data.results;
    const articlesContainer = document.getElementById("articles");

    articles.forEach(article => {
      const articleElement = document.createElement("div");
      articleElement.classList.add("article");

      const titleElement = document.createElement("h2");
      titleElement.textContent = article.title;
      articleElement.appendChild(titleElement);

      const summaryElement = document.createElement("p");
      summaryElement.textContent = article.abstract;
      articleElement.appendChild(summaryElement);

      // Check if the article has an image URL before creating the image element
      if (article.multimedia && article.multimedia.length > 0) {
        const imageUrl = article.multimedia[0].url;
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.alt = article.title;
        articleElement.appendChild(imageElement);
      }

      const linkElement = document.createElement("a");
      linkElement.href = article.url;
      linkElement.textContent = "Read More";
      articleElement.appendChild(linkElement);

      articlesContainer.appendChild(articleElement);
    });
  })

  .catch(error => console.error(error));

function searchAlbums() {
    const apiKey = '846391b8a6e46e1bd22cca156a202fef'; // Replace with your Last.fm API key
    const searchInput = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (searchInput.trim() === '') {
        alert('Please enter an artist name.');
        return;
    }

    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${searchInput}&api_key=${apiKey}&format=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error fetching Data From Sun Please try again.');
                return;
            }

            const albums = data.topalbums.album;

            if (albums.length === 0) {
                resultsContainer.innerHTML = 'No albums found for the specified artist.';
            } else {
                albums.forEach(album => {
                    const albumName = album.name;
                    const imageUrl = album.image[2]['#text']; // Use a medium-sized image

                    const albumElement = document.createElement('div');
                    albumElement.classList.add('album');
                    albumElement.innerHTML = `<img src="${imageUrl}" alt="${albumName}">
                                            <p>${albumName}</p>`;

                    resultsContainer.appendChild(albumElement);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching data. Please try again.');
        });
}
