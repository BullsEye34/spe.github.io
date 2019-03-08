

function submitit(){
    const url = 'https://vrmapi.victronenergy.com';
    var Http = new XMLHttpRequest();
    Http.open("POST", url + '/v2/auth/login');
    var installElement = document.getElementById('installations');
    var userElement = document.getElementById('username');
    var passwordElement = document.getElementById('password');
    //var bodyElement = document.getElementById('bodyFull');
    
    Http.setRequestHeader("Content-Type", "application/json");
    Http.onload = function(){
        var tok = JSON.parse(Http.response);
        var token = tok["token"];

        var idUser = tok.idUser;




        console.log(Http.response);


        if(tok.token){

            window.location.replace("installations.html");

           var vag = new XMLHttpRequest();
            vag.open("GET", url + '/v2/users/' + idUser + '/installations?extended=1');
            vag.setRequestHeader("Content-Type", "application/json");
            vag.setRequestHeader('X-Authorization', 'Bearer ' + token);
            vag.onload = function(){
                var gav = JSON.parse(vag.response);
                var records = [ gav["records"] ];
                //console.log(vag);
                console.log(gav);
                

                //bodyElement.innerHTML = "<p style=\" font-size: 11px;\"> Hi" + " \" " + gav.records[0].name + " \" " + "</p>";  
                installElement.innerHTML = "<style>.demo-list-action {width:300px;}.demo-list-item {width: 300px; }html{background: #fff; /*padding-top: 50%;*/ overflow: hidden;} ul li{display: block; background-color: #000;} @media only screen and (min-width: 600px){ul li{display:block; background-color: #000;}/*html{align-content: center; padding:10em; padding-left: 38%; padding-top: 15%;}*/.demo-list-item {width: 600px;}}</style><meta name=\"viewport\" content=\"initial-scale=1.0, user-scalable=no\" /><center><img src=\"logo-1.png\"><h3>Your Installations</h3></center><hr><div class=\"demo-list-action mdl-list\"><ul class=\"demo-list-item mdl-list\">";
                for (let index = 0; index < gav.records.length; index++) {
                    installElement.innerHTML += "<div class=\"mdl-list__item\"><span class=\"mdl-list__item-primary-content\"><li style=\" background: #D1D1D1; \" class=\"mdl-list__item\">" + gav.records[index].name + "</li></div>";
                }
                   installElement.innerHTML += "</ul></div>";   
                   console.log(gav.records.length);                      
            }
            vag.send();
            //bodyElement.innerHTML = vag.response;
                      
            
    }else{
        /*installElement.innerHTML = */alert('Invalid username or password!!!'+ ' '+'Try again or contact us');
    }
}
var sendObject = JSON.stringify({
username: userElement.value,
password: passwordElement.value
});

//console.log('going to send', sendObject);

Http.send(sendObject);


}