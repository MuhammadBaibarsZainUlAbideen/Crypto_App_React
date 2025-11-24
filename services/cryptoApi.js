import { useState, useEffect } from 'react';

const useCryptos = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch('https://coinranking1.p.rapidapi.com/coins', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
          }
        });

        const data = await response.json();
        setCryptos(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cryptos:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  return { cryptos, loading, error };
};

export default useCryptos;
