import React, {useState, useEffect, }from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Home from "./Home";
import './App.css';
import Web3 from 'web3';
import PrizeToken from './abis/PrizeToken.json';
import GameToken from './abis/GameToken.json';
import { Button } from "@material-ui/core";
import { v4 } from "uuid";

function App() {
  
    const [time, setTime] = useState(Date.now());

    const [gameTokens, setGameTokens] = useState(0);

    const [canPlay, setCanPlay] = useState(false);

    // returns a new account and a setAccount fcn reference (callback)
    const [account, setAccount] = useState(null);
    const [prizeToken, setPrizeToken] = useState(null);
    const [gameToken, setGameToken] = useState(null);
    const [tokenURIs, setTokenURIs] = useState([])
    const [totalSupply, setTotalSupply] = useState()
    const [networkId, setNetworkId] = useState()

    useEffect( async () => {

        setInterval(() => {
            setTime(Date.now())
        }, 20)

        await loadWeb3()
        await loadBlockchainData()

        //this.setState({ cardArray: CARD_ARRAY.sort(() => 0.5 - Math.random()) })
    }, [window.location])

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
        console.log(accounts[0]); // logs something to the console
        // Load smart contract
        const networkId = await web3.eth.net.getId()
        setNetworkId(networkId)
        var networkData = PrizeToken.networks[networkId]
        if (networkData) {
        try {
            var address = networkData.address
            var abi = PrizeToken.abi
            var currToken = new web3.eth.Contract(abi, address)
            setPrizeToken(currToken)

            // Setting current total of the blockchain supply
            setTotalSupply(await currToken.methods.totalSupply().call())

            
            // Load Prize Tokens
            let balanceOf = await currToken.methods.balanceOf(accounts[0]).call()
            console.log(balanceOf)
            for (let i = 0; i < balanceOf; i++) {
                console.log(i);
                let id = await currToken.methods.tokenOfOwnerByIndex(accounts[0], i).call()
                let tokenURI = await currToken.methods.tokenURI(id).call()

                // Adding tokenURI to tokenURIs
                if (!tokenURIs.includes(tokenURI)) {
                    setTokenURIs(tokenURIs => [...tokenURIs, tokenURI]);
                }
                
            }


            // set up gametoken
            networkData = GameToken.networks[networkId]
            address = networkData.address
            abi = GameToken.abi
            currToken = new web3.eth.Contract(abi, address)

            // load Game tokens

            refreshGame(currToken, accounts[0]);

            console.log(currToken)

            setGameToken(currToken)

            
        } catch (err) {
            console.log(err)
            alert('Error loading blockchain data')
        }

        } else {
        alert('Smart contract not deployed to detected network.')
        }
        
    }

    const receiveToken = async (GameToken, account) => {

        console.log(account)

        console.log(GameToken)

        try {
            GameToken.methods.buyToken(account, 1)
                .send({from: account})
                .on('transactionHash', (hash) => {
                    console.log("hashed")
                    console.log(hash)
                    setTimeout(() => {
                        refreshGame(GameToken, account);
                    }, 1000)
                    
                })
            
        }
        catch (err) {
            console.log(err)
            alert("No tokens to play")
        }
    }

    const click = async () => {
        const now = Date.now() % 1000;
        console.log(Date.now())
        console.log(now);

        // within 500 of the last millisecond
        if (now >= 450 && now <= 550) {
            console.log('you win')
            var newURI = v4();

            console.log(newURI);

                // remove token
                gameToken.methods.buyGame(account, 1)
                .send({from: account})
                .on('transactionHash', (hash) => {
                    setTimeout(() => {
                        refreshGame(gameToken, account);
                        prizeToken.methods.mint(account, newURI)
                            .send({from: account})
                            .on('transactionHash', (hash) => {
                                setTokenURIs(uris => [...uris, newURI])
                            })

                    }, 1000)
                })
                
        }
        else {
            alert("You lost the game")
        }

        
    }


    const refreshGame = async (GameToken, account) => {
        
        const response = await GameToken.methods.tokenCount(account).call({from: account})

        console.log(response);

        setCanPlay(response.status);

        setGameTokens(response);

    }

    
    return (
        <nav style={{width : "100%", height : "100px", background: "white", margin : "0"}}>
        <h1>Account: { account }</h1>
        <h2>NetworkID: { networkId }</h2>
            <Button disabled={!account} variant="contained" onClick={() => {receiveToken(gameToken, account);}} color="primary">
                Get a token
            </Button>
            <h3>You have {gameTokens} tokens</h3>
            <br/>
            <h3>Your Prizes:</h3>
            {tokenURIs.map((uri) => {
                return (<div key={uri} >
                    <p>- {uri}</p>
                    <br/>
                </div>)
            })}

            {gameTokens > 0 && (<>
            <h2>Time: {(time / 1000).toFixed()}</h2>

            <Button variant="contained" onClick={click} color="primary">
                Click Me to Play!
            </Button>
            </>)}


        </nav>
    );
}

export default App;
