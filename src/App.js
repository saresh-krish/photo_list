
import './App.css';
import HomeComponent from './pages/home';
import FooterComponent from './Components/footer';
import HeaderComponent from './Components/header';
import "antd/dist/antd.css";
import React from 'react';
function App() {
  return (
    <React.Fragment>
      
      <HeaderComponent />
      <HomeComponent />
      <FooterComponent />
    </React.Fragment>
  );
}

export default App;
