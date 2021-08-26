import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const applicationRoot = document.getElementById('app');


const Main = () => (
  <App />
);

ReactDOM.render(<Main />, applicationRoot);
