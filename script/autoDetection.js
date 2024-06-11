const html_format = `
    <div class="backdrop">
        <div class="phishdect-modal">
            <div class="phishdect-top-content">
                <img src="${browser.runtime.getURL('asset/alert.png')}" alt="">
                <h1>WARNING</h1>
            </div>
            <div class="phishdect-bottom-content">
                <div class="phishdect-message">
                    <span style="font-weight: 500;">PhisDect</span> detected a potential <span style="color: #FD263B; font-weight: 500;">phishing attacks</span>. If you visit this site, attackers could try to steal information like
                    your passwords, emails, or credit card details.
                </div>
                <div class="phishdect-message">
                    In order to be <span style="color: #5dba81; font-weight: 500">protected</span> from <span style="color: #FD263B; font-weight: 500;">phishing attacks</span>
                    and fraud please be careful before providing any personal information.
                </div>
                <div class="button-wrapper">
                    <div class="cancel btn">BACK SAFETY</div>
                    <div class="stay btn">ACCEPT RISK</div>
                </div>
            </div>
        </div>
    </div>

    <style>
        @import url('data:text/css;charset=utf-8;base64,QGZvbnQtZmFjZSB7CiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJzsKICBmb250LXN0eWxlOiBub3JtYWw7CiAgZm9udC13ZWlnaHQ6IDQwMDsKICBmb250LWRpc3BsYXk6IHN3YXA7CiAgc3JjOiB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3BvcHBpbnMvdjIwL3B4aUV5cDhrdjhKSGdGVnJGSkEudHRmKSBmb3JtYXQoJ3RydWV0eXBlJyk7Cn0KQGZvbnQtZmFjZSB7CiAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJzsKICBmb250LXN0eWxlOiBub3JtYWw7CiAgZm9udC13ZWlnaHQ6IDUwMDsKICBmb250LWRpc3BsYXk6IHN3YXA7CiAgc3JjOiB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3BvcHBpbnMvdjIwL3B4aUJ5cDhrdjhKSGdGVnJMR1Q5VjFzLnR0ZikgZm9ybWF0KCd0cnVldHlwZScpOwp9CkBmb250LWZhY2UgewogIGZvbnQtZmFtaWx5OiAnUG9wcGlucyc7CiAgZm9udC1zdHlsZTogbm9ybWFsOwogIGZvbnQtd2VpZ2h0OiA2MDA7CiAgZm9udC1kaXNwbGF5OiBzd2FwOwogIHNyYzogdXJsKGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vcy9wb3BwaW5zL3YyMC9weGlCeXA4a3Y4SkhnRlZyTEVqNlYxcy50dGYpIGZvcm1hdCgndHJ1ZXR5cGUnKTsKfQo=');

        body.stop-scrolling {
            overflow: hidden !important;
        }

        #extension-wrapper {
            position: fixed;
            overflow: hidden;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 99999999;
            font-family: 'Poppins', sans-serif;
        }

        #extension-wrapper .backdrop {
            width: 100%;
            height: 100%;
            position: relative;
            background-color: rgba(255, 162, 162, 0.282);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #extension-wrapper .backdrop .phishdect-modal {
            width: 500px;
            height: 750px;
            background-color: #fff;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin: auto auto;
        }

        #extension-wrapper .backdrop .phishdect-modal .phishdect-top-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 45%;
            background-color: #FD263B;
        }

        #extension-wrapper .backdrop .phishdect-modal .phishdect-top-content img {
            width: 200px;
        }

        #extension-wrapper .backdrop .phishdect-modal .phishdect-top-content h1 {
            margin: 0;
            font-size: 36px;
            color: #fff;
            font-weight: bold;
            font-family: 'Poppins', sans-serif;
        }

        #extension-wrapper .backdrop .phishdect-modal .phishdect-bottom-content {
            flex: 1 1 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            padding: 25px;
            box-sizing: border-box;
        }

        #extension-wrapper .backdrop .phishdect-modal .phishdect-bottom-content .phishdect-message {
            text-align: center;
            color: #000;
            font-size: 17px;
            font-family: 'Poppins', sans-serif;
        }

        #extension-wrapper .backdrop .phishdect-modal .phishdect-bottom-content .button-wrapper {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
        }

        #extension-wrapper .phishdect-bottom-content .button-wrapper .btn {
            text-align: center;
            font-size: 14px;
            padding: 6px 25px;
            border-radius: 20px;
            font-weight: 600;
            color: #fff;
            width: 160px;
            font-family: 'Poppins', sans-serif;
            cursor: pointer;
        }

        #extension-wrapper .phishdect-bottom-content .button-wrapper .btn.stay {
            background-color: #FD263B;
        }
        
        #extension-wrapper .phishdect-bottom-content .button-wrapper .btn.cancel {
            background-color: #5dba81;
        }
    </style>
`

document.addEventListener('DOMContentLoaded', () => {
    checkPhishing(window.location.href).then( (response) => {
        let is_phishing = response.is_phishing;

        if (is_phishing) {
            const element_wrapper = document.createElement('div');
    
            element_wrapper.setAttribute('id', 'extension-wrapper');
            element_wrapper.innerHTML = html_format;
    
            document.body.classList.add('stop-scrolling');
            document.body.appendChild(element_wrapper);
    
            document.querySelector('#extension-wrapper .cancel.btn').addEventListener('click', () => {
                back();
            });
    
            document.querySelector('#extension-wrapper .stay.btn').addEventListener('click', () => {
                release();
            });
        };
    });

});

const back = () => {
    release()
    history.go(-1);
}

const release = () => {
    document.body.classList.remove('stop-scrolling');
    document.querySelector('#extension-wrapper').remove();
}