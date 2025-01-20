import "./App.css";
import MainMenu from "./components/MainMenu";
import {HashRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
    return (
        <>
            <HashRouter>
                <MainMenu className="main-menu"/>
                <AppRouter/>
            </HashRouter>
        </>
    );
}

export default App;
