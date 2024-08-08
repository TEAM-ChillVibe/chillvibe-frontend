import React, { useEffect, useState } from 'react';
import Router from './Router';
import Footer from './components/layout/Footer';
import TopBar from './components/layout/TopBar/TopBar';
import TopButton from './components/common/Button/TopButton';
import MusicPlayer from './components/common/MusicPlayer/MusicPlayer';
import useUserStore from './store/useUserStore';

function App() {
  const initialize = useUserStore(state => state.initialize);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initialize();
      } finally {
        setIsInitialized(true);
      }
    };

    init();
  }, [initialize]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <TopBar />
      <Router />
      <Footer />
      <TopButton />
      <MusicPlayer />
    </div>
  );
}

export default App;
