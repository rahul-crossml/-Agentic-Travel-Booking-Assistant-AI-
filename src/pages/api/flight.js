// pages/api/flights.js
import axios from "axios";

export default async function handler(req, res) {
  const { departure, arrival, outbound_date, return_date } = req.query;

  const serpApiUrl = `https://serpapi.com/search?engine=google_flights&api_key=7b6e25e4f4e25cae848a2f1cd950295ae0304c86f77583a762cc3b3fde4c02e0&departure_id=${departure}&arrival_id=${arrival}&outbound_date=${outbound_date}&return_date=${return_date}&currency=INR&hl=en&deep_search=true`;

  try {
    const response = await axios.get(serpApiUrl);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("SerpApi fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
}
