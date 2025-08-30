import React, { useEffect, useState } from 'react';
import RFQList from './components/RFQList';
import POList from './components/POList';

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#rfqs');

  useEffect(() => {
    const handleHash = () => setRoute(window.location.hash || '#rfqs');
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="mb-4 flex gap-4">
        <a href="#rfqs" className="text-blue-500">RFQs</a>
        <a href="#pos" className="text-blue-500">POs</a>
      </nav>
      {route === '#pos' ? <POList /> : <RFQList />}
    </div>
  );
}
