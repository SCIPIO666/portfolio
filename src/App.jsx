import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import DevScipioAnimation from './components/DevScipioAnimation';
import { router } from './router';
import AboutPage from './pages/AboutPage'
import ExperiencePage from './pages/ExperiencePage'
import ContactPage from './pages/ContactPage'
import WorkPage from './pages/WorkPage'
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return <DevScipioAnimation />;
  }

  return <RouterProvider router={router} />;
}

export default App;