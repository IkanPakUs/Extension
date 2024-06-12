window.onload = () => {
    document.querySelector('.loading-wrapper').classList.add('active');
    document.querySelector('#pop-up-wrapper').classList.add('loading');

    browser.tabs.query({ currentWindow: true, active: true }).then( (tabs) => {
        const url = tabs.at(0).url;

        checkPhishing(url).then( (response) => {
            createPopUp(response.is_phishing, response.score);
        });
    })
}

const createPopUp = (is_phishing, score) => {
    const pop_up_modal = document.querySelector('#pop-up-wrapper .pop-up-modal');
    const sitename = document.querySelector('#pop-up-wrapper .sitename');
    const desc = document.querySelector('#pop-up-wrapper .desc');

    document.querySelector('.pop-up-modal .header img').src = browser.runtime.getURL('asset/logo.png')

    score = Number(50 - (score * 50)).toFixed(0);
    trust_score = score * 2;

    if (score > 35) {
        color = '#90FD71';
    } else if (score > 15) {
        color = '#E9FD71';
    } else {
        color = '#C44E4C';
    }

    document.querySelector('#pop-up-wrapper .pop-up-modal .content-modal .circular-progress circle.fg').style.stroke = color;
    document.querySelector('#pop-up-wrapper .pop-up-modal .content-modal .circular-progress').style.setProperty("--progress", score);
    document.querySelector('#pop-up-wrapper .pop-up-modal .content-modal .score').innerHTML = `${trust_score}%`;

    if (is_phishing) {
        pop_up_modal.classList.add('phishing');
    } else {
        pop_up_modal.classList.remove('phishing');
    }

    browser.tabs.query({
        active: true,
        currentWindow: true
    }).then( (tabs) => {
        for (const tab of tabs) {
            const url = new URL(tab.url);
            const domain = url.hostname;

            sitename.innerHTML = domain;
        }
    })

    desc.innerHTML = is_phishing ? 
            '<span style="font-weight: 600;">Phis Dect</span> detected a potential phishing attacks. If you visit this site, attackers could try to steal information like your passwords, emails, or credit card details.' 
            : 
            '<span style="font-weight: 600;">Phis Dect</span> not detected a phishing attacks. This site is secure and you can use this website wisefully.';

    document.querySelector('.loading-wrapper').classList.remove('active');
    document.querySelector('#pop-up-wrapper').classList.remove('loading');
}