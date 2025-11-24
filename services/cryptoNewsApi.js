import { useState, useEffect } from 'react';

const useNews = () => {
  const [news, setnews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchnews = async () => {
      try {
        const response = await fetch('https://cryptocurrency-news2.p.rapidapi.com/v1/cryptodaily', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.NEWS_API_KEY,
            'x-rapidapi-host': "cryptocurrency-news2.p.rapidapi.com"
          }
        });

        const data = await response.json();
        setnews(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cryptos:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchnews();
  }, []);

  return { news, loading, error };
};

export default useNews;