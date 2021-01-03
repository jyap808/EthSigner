document.getElementById("eth_sign").addEventListener("submit", function(event) {
    validateSign();
    event.preventDefault();
});

async function validateSign() {
    let message = $("#message").val();
    // if (!message.startsWith("0x")) {
    //     message = "0x" + message;
    // }
    // let hexMessage = parseInt(message, 16);
    // console.log(message + " -> " + hexMessage + " - Number | isHex: " + isHex(message));
    // if (isNaN(hexMessage) || !isHex(message)) {
    //     alert("Invalid Hexadecimal Input. Please try again");
    //     return false;
    // }
    // We're pretty sure the input is a hexadecimal number, proceed with eth_sign
    let formattedMessage = web3.utils.sha3(message);
    let signature = await doEthSign(formattedMessage, coinbase);
    $("#signature").html(signature);
    $("#formResult").show();
}

function isHex(str) {
    regexp = /^0x[0-9a-fA-F]+$/;
    if (regexp.test(str)) {
        return true;
    } else {
        return false;
    }
}

function doEthSign(message, from) {
    return new Promise(resolve => {
        web3.eth.sign(message, from, (error, result) => {
            if (!error) {
                console.log("Signed: " + result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}