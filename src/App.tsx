import './App.css';
import MainMenu from './components/MainMenu';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <>
      <BrowserRouter>
        <MainMenu className="main-menu" />
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
