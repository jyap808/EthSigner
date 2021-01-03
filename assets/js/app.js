// Inject our version of web3.js into the DApp.
window.addEventListener('load', async() => {
    // $('#main-popup').modal('show');
    console.log("Welcome to EthSigner");
    await connectWallet();
});
let coinbase;
async function connectWallet() {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            let accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(`Accounts:\n${accounts.join('\n')}`);
            coinbase = await getCoinbase();
            document.getElementById('walletStatus').innerHTML = "Connected";
        } catch (error) {
            // User denied account access...
            console.log("User denied account access");
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. Install MetaMask to continue!');
    }
}

function getCoinbase() {
    return new Promise(resolve => {
        web3.eth.getCoinbase((error, result) => {
            if (!error) {
                console.log("Coinbase: " + result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}