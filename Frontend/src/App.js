// Written by Shlomi Ben-Shushan.

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Lobby from "./pages/Lobby";
import CodeBlock from "./pages/CodeBlock";
import Error from "./pages/Error";

// For credit.
const linkedin = <a href='https://www.linkedin.com/in/shlomibs93/' className='App-link'>Linkedin</a>;
const github = <a href='https://github.com/shlomi1993/' className='App-link'>Github</a>;

// The app is divided to three visual parts - the header, the body and the footer.
function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <div className="App-Title">
            <img src={require('./assets/logo.png')} className='App-Logo'/>
            <h1>Online Code Blocks</h1>
          </div>
          <hr style={{
            color: 'white',
            background: 'white',
            height: '1px',
            width: '100%'
          }}/>
        </header>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/codeblock" element={<CodeBlock />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <div className="App-footer">
          <p>Built by Shlomi Ben Shushan ● {linkedin} ● {github}</p>
        </div>
      </Router>
    </div>
  );
}

export default App;
