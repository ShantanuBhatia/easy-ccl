import logo from './logo.svg';
import VideoSaver from './components/VideoSaver';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <VideoSaver imagePaths={["a1", "a2"]} musicPath="./media/badboy.mp3"/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
