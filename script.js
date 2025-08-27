// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Get references to all the necessary DOM elements
  let movieInput = document.getElementById("movie-input");
  let movieBtn = document.getElementById("get-movie-btn");
  let movieInfo = document.getElementById("movie-info"); // Container for movie details
  let img = document.getElementById("img"); // Movie poster image
  let movieNameDisplay = document.getElementById("show-movie-name"); // Movie title
  let ratingDisplay = document.getElementById("movie-rating"); // IMDB rating
  let yearDisplay = document.getElementById("year"); // Release year
  let genreDisplay = document.getElementById("genre"); // Movie genre
  let descriptionDisplay = document.getElementById("description");
  let errorMessage = document.getElementById("error-message"); // Error message display
  let loader = document.getElementById("loader"); // Loading spinner


  movieBtn.addEventListener('click', async () => {
    let movieName = movieInput.value.trim();
    if (!movieName) return; // Do nothing if the input is empty

    loader.classList.remove('hidden');
    movieInfo.classList.add('hidden');
    movieInfo.classList.remove('visible');
    errorMessage.classList.add('hidden');

    try {
      // Fetch movie data from the API
      let data = await getMovieData(movieName);
      // Display the fetched movie data
      displayData(data);
    } catch (error) {
      // Show an error message if fetching fails
      showError();
    } finally {
      loader.classList.add('hidden');
    }
  })

  async function getMovieData(movieName) {
    const url = `/.netlify/functions/movie?t=${movieName}`;

    let response = await fetch(url);
    if (!response.ok) {
      // checks HTTP status
      throw new Error(`Network error: ${response.status}`);
    }

    let data = await response.json();
    if (data.Response === "False") {
      throw new Error(data.Error || "Movie not Found!");
    }
    return data;
  }

  function displayData(data) {
    // Set the movie poster, or a placeholder if not available
    img.src = data.Poster !== "N/A" ? data.Poster : "placeholder.jpg";
    // Display movie details
    movieNameDisplay.textContent = data.Title;
    ratingDisplay.innerHTML = `<b>IMDB:</b> ${data.imdbRating}`;
    yearDisplay.innerHTML = `<b>Year:</b> ${data.Year}`;
    genreDisplay.innerHTML = `<b>Genre:</b> ${data.Genre}`;
    descriptionDisplay.innerHTML = `<span class="line"><b>Plot:</b> ${data.Plot}</span>`;

    // Show the movie info container and hide the error message
    movieInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  /**
   * Shows an error message when movie data can't be fetched.
   */
  function showError() {
    // Show the error message container and hide the movie info container
    errorMessage.classList.remove('hidden');
    movieInfo.classList.add('hidden');
    movieInfo.classList.remove('visible');
  }

  // Add an event listener for the 'Enter' key on the input field
  movieInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      movieBtn.click(); // Trigger the button click event
    }
  });
});