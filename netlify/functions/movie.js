export async function handler(event, context) {
  const API_KEY = process.env.API_KEY;
  const movieName = event.queryStringParameters?.t;

  // Log for debugging
  console.log("Function invoked.");
  console.log("API_KEY is set:", !!API_KEY);
  console.log("Received movieName:", movieName);

  if (!API_KEY) {
    console.error("API_KEY is not set in environment variables.");
    return {
      statusCode: 500,
      body: JSON.stringify({
        Response: "False",
        Error: "Server misconfigured: API_KEY not set",
      }),
    };
  }

  if (!movieName) {
    console.warn("Missing 't' query parameter.");
    return {
      statusCode: 400,
      body: JSON.stringify({
        Response: "False",
        Error: "Missing query parameter: t",
      }),
    };
  }

  try {
    const apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(
      movieName
    )}&apikey=${API_KEY}`;
    console.log("Fetching from OMDb API:", apiUrl);

    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("Received data from OMDb:", data);

    // Forward OMDb response (including error messages like Invalid API key)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("An error occurred:", err);
    return {
      statusCode: 502,
      body: JSON.stringify({
        Response: "False",
        Error: "Upstream request failed",
        details: err.message,
      }),
    };
  }
}