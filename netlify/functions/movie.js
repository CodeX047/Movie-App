export async function handler(event, context) {
  const API_KEY = process.env.API_KEY;
  const movieName = event.queryStringParameters.t;

  const response = await fetch(
    `https://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`
  );
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
