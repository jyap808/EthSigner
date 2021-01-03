document.getElementById("signTypedData_v1").addEventListener("submit", function(event) {
    validateSign();
    event.preventDefault();
});

async function validateSign() {
    let msgParams = [{
            type: 'string',
            name: $("#input1").val(),
            value: $("#value1").val()
        },
        {
            type: 'string',
            name: $("#input2").val(),
            value: $("#value2").val()
        }
    ];
    console.dir(msgParams)
    let method = 'eth_signTypedData';
    let signature = await dosignTypedData(method, msgParams, coinbase);
    $("#signature").html(signature);
    $("#formResult").show();
}

function dosignTypedData(method, msgParams, from) {
    return new Promise(resolve => {
        web3.currentProvider.sendAsync({ method: 'eth_signTypedData', params: [msgParams, from], from: from }, (error, result) => {
            if (error) {
                console.error(error);
                resolve(error);
            } else if (result.error) {
                console.error(result.error.message);
                resolve(result.error.message);
            } else {
                console.log("Signature: " + result.result);
                resolve(result.result);
            }
        });
    });
}