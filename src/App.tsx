import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'

function App() {
  const [icebreaker, setIcebreaker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchIcebreaker = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/icebreaker.json');

      const icebreakers = response.data.icebreakers;
      const randomIndex = Math.floor(Math.random() * icebreakers.length);

      setIcebreaker(icebreakers[randomIndex]);
    } catch (e) {
      setError("Failed to fetch icebreaker. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIcebreaker();
  }, []);

  return (
    <div className="container">
      <h2>Icebreaker of the Day</h2>

      {loading ? (
        <div className="loader">
          <Hourglass />
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="icebreaker-box">
          <p className="icebreaker">"{icebreaker}"</p>
          <button onClick={fetchIcebreaker} className="btn">
            Get New Icebreaker
          </button>
        </div>
      )}
    </div>
  )
}

export default App;
