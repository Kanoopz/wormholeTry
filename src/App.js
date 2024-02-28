import logo from './logo.svg';
import './App.css';

import { useState } from 'react';

import axios from 'axios';
// import { QueryRequest, PerChainQueryRequest, EthCallQueryRequest, QueryProxyMock } from '@wormhole-foundation/wormhole-query-sdk';
// import { QueryRequest, PerChainQueryRequest, EthCallQueryRequest, QueryProxyMock } from './wormhole/sdk/js-query/src/mock/index.ts';


// import { QueryRequest } from './wormhole/sdk/js-query/src';
// import { PerChainQueryRequest } from './wormhole/sdk/js-query/src';
// import { EthCallQueryRequest } from './wormhole/sdk/js-query/src';
// import { QueryProxyMock } from './wormhole/sdk/js-query/src';

// import { QueryRequest } from './wormhole/sdk/js-query/src/query/request.ts';



function App() {

  const [queryNonce, setQueryNonce] = useState(0);

  async function getData()
  {
    const rpc = "https://arbitrum-sepolia.infura.io/v3/408559c55ba7479b9f3adee094af9d80";
    
    const latestBlock = (await axios.post(rpc, {method: "eth_getBlockByNumber", params: ["latest", false], id: 1, jsonrpc: "2.0",})).data?.result?.number;

    console.log("hexLasBlock");
    console.log(latestBlock);

    const decimalLastBlock = parseInt(latestBlock);
    console.log("decimalLasBlock");
    console.log(decimalLastBlock);




    const callData = 
    {
      to: "0x04cB38f73e954f8BB5C7a1E3aA6E986aE0a03CcD",
      data: "0x18160ddd",
    };

    const request = new QueryRequest(queryNonce, [new PerChainQueryRequest(10003, new EthCallQueryRequest(latestBlock, [callData])),]);
    console.log(JSON.stringify(request, undefined, 2));




    const mock = new QueryProxyMock({ 10003:rpc });
    const mockData = await mock.mock(request);
    console.log(mockData);
    // {
    //   signatures: ['...'],
    //   bytes: '...'
    // }
  }



  return (
    <div className="App">
      <header className="App-header">
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

        <button onClick={getData}>getQueryResult</button>
      </header>
    </div>
  );
}

export default App;
