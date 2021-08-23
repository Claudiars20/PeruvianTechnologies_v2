import logo from './logo.svg';
import './App.css';
import Login from './login'
import HomeMenu from './Components/login_choose';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <HomeMenu/>
      </header>
    </div>
  );
}

export default App;
