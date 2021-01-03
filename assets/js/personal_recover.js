document.getElementById("personal_recover").addEventListener("submit", function(event) {
    validateRecover();
    event.preventDefault();
});

async function validateRecover() {
    let message = $("#message").val();
    let signature = $("#signature").val();
    let account = await doPersonalSign(message, signature);
    $("#account").html(account);
    $("#formResult").show();
}

function doPersonalSign(message, signature) {
    return new Promise(resolve => {
        web3.eth.personal.ecRecover(message, signature, (error, result) => {
            if (!error) {
                console.log("Signed By: " + result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}