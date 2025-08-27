export async function handler(event, context) {
  const API_KEY = process.env.API_KEY;
  const movieName = event.queryStringParameters?.t;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        Response: "False",
        Error: "Server misconfigured: API_KEY not set",
      }),
    };
  }

  if (!movieName) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        Response: "False",
        Error: "Missing query parameter: t",
      }),
    };
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(
        movieName
      )}&apikey=${API_KEY}`
    );
    const data = await response.json();

    // Forward OMDb response (including error messages like Invalid API key)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
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
