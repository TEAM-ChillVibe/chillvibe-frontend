import Router from './Router';
import Footer from './components/layout/Footer';
import TopBar from './components/layout/TopBar/TopBar';
import TopButton from './components/common/Button/TopButton';
import MusicPlayer from './components/common/MusicPlayer/MusicPlayer';

function App() {
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
