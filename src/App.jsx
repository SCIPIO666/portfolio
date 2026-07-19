import { useState, useEffect } from 'react';
import './App.css'
import DevScipioAnimation from './components/DevScipioAnimation';


function App() {
const [isVisible, setIsVisible] = useState(false);

   const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); 
  }, []);

  if (loading) {
    return <DevScipioAnimation />;
  }
  return (
    <>

     <p className='bg-indigo-600 shadow-card text-mono rounded-card'>Portfolio</p>
     
    </>
  )
}

export default App
