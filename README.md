# Movie Search App

A responsive movie search application that uses a serverless backend to securely query the OMDb API.

This project is built with plain HTML, CSS, and JavaScript for the frontend, and a Netlify Function (written in JavaScript) for the backend. This architecture ensures that the OMDb API key is never exposed to the client.

## Live Demo

[View the deployed application here](https://movie-search-app-codex047.netlify.app/)

## Features

-   **Secure API Requests**: Uses a Netlify serverless function to proxy requests to the OMDb API, keeping the API key safe.
-   **Movie Details**: Search for movies by title and view details like the poster, plot, rating, year, and genre.
-   **Responsive Design**: A clean, mobile-first interface that works on all screen sizes.
-   **Dynamic UI**: Shows loading states and clear error messages.
-   **Zero Dependencies**: Built with vanilla HTML, CSS, and JavaScript. No frameworks or build steps required for the frontend.

## Project Structure

```
.
├── index.html          # Main HTML file for the user interface
├── style.css           # All styles for the application
├── script.js           # Frontend logic for user interaction and API calls
├── netlify/
│   └── functions/
│       └── movie.js    # Serverless function to fetch data from OMDb
└── netlify.toml        # Netlify configuration file
```

## How It Works

1.  The user enters a movie title in the frontend (`index.html`) and clicks the search button.
2.  The frontend JavaScript (`script.js`) calls the Netlify serverless function at `/.netlify/functions/movie`, passing the movie title as a query parameter.
3.  The `movie.js` serverless function receives the request, retrieves the `API_KEY` from Netlify's environment variables, and makes a secure request to the OMDb API.
4.  The function returns the JSON response from the OMDb API to the frontend.
5.  The frontend JavaScript parses the response and dynamically updates the DOM to display the movie information or an error message.

## Local Development

To run this project locally, you will need the [Netlify CLI](https://docs.netlify.com/cli/get-started/).

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/CodeX047/Movie-App
    cd Movie-App
    ```

2.  **Get an OMDb API Key:**
    You need a free API key from OMDb. You can get one at [omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx).

3.  **Set up Environment Variables:**
    The Netlify CLI uses a `.env` file for local development. Create a file named `.env` in the root of your project and add your API key to it.

    ```
    API_KEY=your_omdb_api_key
    ```
    *Note: The `.gitignore` file is already configured to ignore `.env` files, so you won't accidentally commit your key.*

4.  **Run the development server:**
    Use the Netlify CLI to start a local server that can run your frontend and the serverless function.

    ```bash
    netlify dev
    ```
    This will start a server, typically at `http://localhost:8888`.

## Deployment

This project is configured for easy deployment on [Netlify](https://www.netlify.com/).

1.  **Push your code to a Git provider** (like GitHub, GitLab, or Bitbucket).

2.  **Create a new site on Netlify** and link it to your repository. The build settings are already configured in `netlify.toml`.

3.  **Set the `API_KEY` environment variable in the Netlify UI:**
    -   Go to **Site settings > Build & deploy > Environment**.
    -   Add a new environment variable:
        -   **Key**: `API_KEY`
        -   **Value**: `your_omdb_api_key`
    -   Redeploy your site to apply the variable.