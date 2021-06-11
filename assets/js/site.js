// document.addEventListener("DOMContentLoaded", function(event) {
// });

var siteForm = document.querySelector("#mensagem-form form");
siteForm.onsubmit = postRDStation;

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return null;
}

function exibirModal(){
    var mensagemForm = new bootstrap.Modal(document.getElementById('mensagem-form'), {
    });
    mensagemForm.show();
}

function postRDStation(e){
    e.preventDefault();

    var email = document.querySelector("#mensagem-form form input").value;
    if(email.length === 0){ alert("Por favor, preencha o campo Email"); return; }

    var website = getQueryVariable('website');

    var token_publico = '341f9b54cf5f563bdbde420860f76148';
    var identificador = 'LP1_Nativa_vRDI';
    var url_proxpassos = 'https://serv.autordapropriasaude.com/proximospassos';

    var data_array = [
        { name: 'email', value: email },
        { name: 'identificador', value: identificador },
        { name: 'token_rdstation', value: token_publico },
        { name: 'website', value: website },
        { name: 'available_for_mailing', value: true }
    ];

    try{
        RdIntegration.post(data_array);
        setTimeout(function(){
            window.open(url_proxpassos, '_self');
        }, 500);
    }
    catch(erro){
        alert('Ops! Falha ao fazer o cadastro. Erro: ' + erro);
    }
    finally{};
}
