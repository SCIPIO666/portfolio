import { useState, useEffect } from 'react';
import './App.css';
import DevScipioAnimation from './components/DevScipioAnimation';
import SinglePage from './pages/SinglePage';
import Navbar from './components/Navbar';
import LaptopScene from './components/LaptopScene'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return <DevScipioAnimation />;
  }

  return (
    <>
    <Navbar/>
    {/* <div style={{ width: '100%', height: '500px' }}>
      <LaptopScene />
    </div> */}
      <SinglePage/>
    </>
  )

}

export default App;