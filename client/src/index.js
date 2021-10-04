import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// import drizzle functions and contract artifact
import { Drizzle } from "@drizzle/store";
import EscrowFactory from "./contracts/EscrowFactory.json";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [EscrowFactory],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
};

const drizzle = new Drizzle(options);

ReactDOM.render(
  <BrowserRouter>
    <App drizzle={drizzle} />
  </BrowserRouter>,
  document.getElementById('root')
);
