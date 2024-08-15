import React, { useEffect, useState } from 'react';
import Router from './Router';
import Footer from './components/layout/Footer';
import TopBar from './components/layout/TopBar/TopBar';
import TopButton from './components/common/Button/TopButton';
import useUserStore from './store/useUserStore';
import MusicPlayerFloating from './components/common/MusicPlayer/MusicPlayerFloating';
import SpeedDialButton from './components/common/Button/SpeedDialButton';

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
      <SpeedDialButton />
      <MusicPlayerFloating />
    </div>
  );
}

export default App;
