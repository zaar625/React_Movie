
import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';
import Routes from './config/Router';

import { BrowserRouter, Route } from 'react-router-dom';


function App() {
    return (
        <BrowserRouter>
            <Route render={props => (
                <>
                    <Header {...props}/>
                    <Routes/>
                    <Footer/>    
                </>            
            )}/>
        </BrowserRouter>
    );
}

export default App;
