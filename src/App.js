import logo from './logo.svg';
import VideoSaver from './components/VideoSaver';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <VideoSaver imagePaths={["irene.jpg", "seulgi.jpg"]} musicPath="./media/badboy.mp3"/>

      </header>
    </div>
  );
}

export default App;
