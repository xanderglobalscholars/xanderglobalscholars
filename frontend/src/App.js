import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            hello
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.data.hello))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Xander Global Scholars</h1>
      <p>GraphQL Response: {message}</p>
    </div>
  );
}

export default App;
