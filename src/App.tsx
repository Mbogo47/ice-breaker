import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'

function App() {
  const [icebreaker, setIcebreaker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fade, setFade] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const fetchIcebreaker = async () => {
    setLoading(true);
    setError(null);
     setFade(false);

    try {
      const response = await axios.get('/icebreaker.json');

      const icebreakers = response.data.icebreakers;
      const randomIndex = Math.floor(Math.random() * icebreakers.length);

      await new Promise((resolve) => setTimeout(resolve, 800));

      setIcebreaker(icebreakers[randomIndex]);
      setFade(true);

    } catch (e) {
      setError("Failed to fetch icebreaker. Please try again.");
    } finally {
       setLoading(false);
      setFirstLoad(false); 
    }
  };

  useEffect(() => {
    fetchIcebreaker();
  }, []);

  return (
    <div className="container">
      <h2>Icebreaker of the Day</h2>

      {loading && firstLoad ? (
        <div className="welcome-loader">
          <p className="welcome">Welcome! Loading your icebreaker...</p>
          <Hourglass />
        </div>
        ) :loading ? (
        <div className="loader">
          <Hourglass />
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
         <div className={`icebreaker-box ${fade ? 'fade-in' : ''}`}>
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
