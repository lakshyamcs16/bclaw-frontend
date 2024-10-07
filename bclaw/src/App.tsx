import React from 'react';
import './App.css';
import './css/Search.css';
import "@bcgov/bc-sans/css/BC_Sans.css";
import { Footer, Header } from '@bcgov/design-system-react-components';
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      {/* BC Header component with Navigation */}
      <Header/>

      {/* Single page app - Search page*/}
      <Search/>

      {/* BC Footer component */}
      <Footer/>
    </div>
  );
}

export default App;


// TODO:
// ARIA
// CHECKS