import React, {useEffect, useState} from "react";
import { ethers } from "ethers";
// const { ethers } = require("ethers");


const TestPage = () => {
    //To keep the data of the provider, signer and contract .. For easy accessing
    const [state, setstate] = useState({
        provider: null,
        signer: null
    }); 

    const [Account, setacount] = useState("Not Connected"); //For Account details

// In this use effect my purpose is to implement is the wallet is connected before reload the page then the account should be connected after the page reload
    // useEffect (() =>{
    //     const provider = new ethers.BrowserProvider(window.ethereum);
    //         .....
    // }, []);


    //To connect Metamask wallet
    const handleClick = async () => {

        //Will further be needed to communicate with the contract
        // const contractAddres="";
        // const contractABI="";

        ////Metamask part
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // console.log(provider);
            const accounts = await provider.send("eth_requestAccounts", []);
            window.ethereum.on("accountsChanged", async ()=>{
                const accounts = await provider.send("eth_requestAccounts", []);
                const account = accounts[0];
                setacount(account);
                alert("Account is Changed");
            });
            const account = accounts[0];
            setacount(account);
            console.log(provider);

            const signer = provider.getSigner();
            // console.log(signer);
            setstate({provider, signer});
            alert("Account is Connected")

        } catch (error) {
            console.log(error);
        }
        
        // console.log (state);
    }

    return (
        <div className="items-center text-center mt-10 flex flex-col">
            <button
                className="p-4 mt-4 text-sm bg-gray-500 text-white rounded-sm border-2 hover:bg-gray-400"
                onClick={handleClick}
            >
                Connect to Metamask
            </button> <br></br>
            <h1>The Wallet is: {Account} </h1>
        </div>
    )
}

export default TestPage;
