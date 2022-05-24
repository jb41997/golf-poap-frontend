import { useState, useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import './styles/App.css'
import polygonLogo from './assets/polygonlogo.png';
import ethLogo from './assets/eth-diamond-purple.png';
import { networks } from './utils/networks'
import Navbar from './components/Navbar/Navbar'
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator'
import Footer from './components/Footer/Footer'
import { ethers } from "ethers";


function App(props) {
	const [network, setNetwork] = useState('');

	const location = useLocation().pathname;
	//console.log(`Route: ${location}`);

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask -> https://metamask.io/");
				return;
			}

			// Fancy method to request access to account.
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		
			// Boom! This should print out public address once we authorize Metamask.
			console.log("Connected", accounts[0]);
			props.setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error)
		}
	}

	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log('Make sure you have metamask!');
			return;
		} else {
			console.log('We have the ethereum object', ethereum);
		}
		
		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			props.setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}
		
		// This is the new part, we check the user's network chain ID
		const chainId = await ethereum.request({ method: 'eth_chainId' });
		setNetwork(networks[chainId]);

		ethereum.on('chainChanged', handleChainChanged);
		
		// Reload the page when they change networks
		function handleChainChanged(_chainId) {
			window.location.reload();
		}
	};


	const renderNotConnectedContainer = () => {
		return(
		<div className="login--container">
			<div className="welcome--container">
				<div className="left--welcome">
					<h1>Welcome to <span className="brand--wrap"><i>Club <span className="brand--accent">Divot</span></i></span></h1>
					<h3>Collect POAPs from all your favorite golf courses!</h3>
					<button onClick={connectWallet} className="btn btn--connect">
					Connect With Metamask🦊
					</button>
				</div>
				<div className="right--welcome">
				</div>
			</div>
		</div>
	)};

	const renderConnectedContainer = () => {
		return(
		<div className="login--container">
			<div className="welcome--container">
				<div className="left--welcome">
					<h1>Welcome to <span className="brand--wrap"><i>Club <span className="brand--accent">Divot</span></i></span></h1>
					<Link to="/trophies" onClick={() => console.log("Going to trophycase!")}>Trophycase!</Link>
					<Link to="/events" onClick={() => console.log("Going to events!")}>All Events</Link>
				</div>
				<div className="right--welcome">
				</div>				
			</div>
		</div>
	)};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []) 

	return (
		<div id='top' className="App">
			<Navbar/>
			<LoadingIndicator trigger={props.loading}></LoadingIndicator>
			<div className={location==='/' ? "main--container back--image" : "main--container"}>
				<div className="account--container">
				<img alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} />
				{ props.currentAccount ? <p> Wallet: {props.currentAccount.slice(0, 6)}...{props.currentAccount.slice(-4)} </p> : <p> Not connected </p> }
				</div>
				{location==='/' ? !props.currentAccount ? renderNotConnectedContainer() : renderConnectedContainer() : ""}
				<Outlet/>
			</div>
			{/* <Footer /> */}
		</div>
	);
}

export default App;
