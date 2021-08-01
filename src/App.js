import React, {useState, useEffect, }from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Home from "./Home";
import GameContainer from "./containers/GameContainer"
import './App.css';
import Web3 from 'web3';
import PrizeToken from './abis/PrizeToken.json';

//var hist = createBrowserHistory();


function App() {
  
  // returns a new account and a setAccount fcn reference (callback)
  const [account, setAccount] = useState(0);

  const [token, setToken] = useState("");

  const [tokenURIs, setTokenURIs] = useState([])

  const [totalSupply, setTotalSupply] = useState()

  const [networkId, setNetworkId] = useState()

  useEffect( async () => {
    await loadWeb3()
    await loadBlockchainData()
    //this.setState({ cardArray: CARD_ARRAY.sort(() => 0.5 - Math.random()) })
  }, [])

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    //console.log(accounts[0]); // logs something to the console
    // Load smart contract
    const networkId = await web3.eth.net.getId()
    setNetworkId(networkId)
    const networkData = PrizeToken.networks[networkId]
    if (networkData) {
      try {
        const abi = PrizeToken.abi
        const address = networkData.address
        const currToken = new web3.eth.Contract(abi, address)
        setToken(currToken)

        // Setting current total of the blockchain supply
        setTotalSupply(await currToken.methods.totalSupply().call())

        // Load Tokens
        let balanceOf = await currToken.methods.balanceOf(accounts[0]).call()
        for (let i = 0; i < balanceOf; i++) {
          let id = await currToken.methods.tokenOfOwnerByIndex(accounts[0], i).call()
          let tokenURI = await currToken.methods.tokenURI(id).call()

          // Adding tokenURI to tokenURIs
          setTokenURIs(tokenURIs => [...tokenURIs, tokenURI]);
        }
      } catch {
        alert('Error loading blockchain data')
      }

    } else {
      alert('Smart contract not deployed to detected network.')
    }
    
  }
  

  return (
    <nav style={{width : "100%", height : "100px", background: "white", margin : "0"}}>
      <h1>Account: { account }</h1>
      <h2>NetworkID: { networkId }</h2>
      <BrowserRouter>
        <Switch>
            <Route path="/game" component={GameContainer}/>
            <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </nav>
  );
}

export default App;
