import { useState, useEffect } from 'react';
import './App.css';
import DevScipioAnimation from './components/DevScipioAnimation';
import SinglePage from './pages/SinglePage';
import Navbar from './components/Navbar';
import useLenis from './hooks/useLenis';
function App() {
  const [loading, setLoading] = useState(true);
  useLenis();

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
      <SinglePage/>
    </>
  )

}

export default App;