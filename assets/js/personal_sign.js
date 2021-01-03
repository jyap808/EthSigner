document.getElementById("personal_sign").addEventListener("submit", function(event) {
    validateSign();
    event.preventDefault();
});

async function validateSign() {
    let message = $("#message").val();
    let passphrase = $("#passphrase").val();
    let formattedMessage = web3.utils.utf8ToHex(message);
    let signature = await doPersonalSign(formattedMessage, coinbase, passphrase);
    $("#signature").html(signature);
    $("#formResult").show();
}

function doPersonalSign(formattedMessage, from, passphrase) {
    return new Promise(resolve => {
        web3.eth.personal.sign(formattedMessage, from, passphrase, (error, result) => {
            if (!error) {
                console.log("Signed: " + result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

$(".toggle-password").click(function() {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});