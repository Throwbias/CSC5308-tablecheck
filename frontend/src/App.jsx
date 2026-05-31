import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import MapLegend from './components/MapLegend';
import axios from 'axios';

function App() {
  // 1. Storage box for live data starts empty
  const [tables, setTables] = useState([]);

  // 2. useEffect requires an arrow function: () => { ... }
  useEffect(() => { 
    axios.get('http://localhost:5000/api/tables')
      .then((response) => { // 3. .then() also requires an arrow function
        setTables(response.data);
      })
      .catch((error) => { // Good practice: catch any connection errors!
        console.error("Error fetching live table data:", error);
      });
  }, []); // 4. Do not forget this empty array!

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>TableLogic Customer Map</h1>
      <MapLegend />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
        {/* 5. Change mockTables to tables right here */}
        {tables.map(table => (
          <Table key={table.id} {...table} />
        ))}
      </div>
    </div>
  );
}

export default App;