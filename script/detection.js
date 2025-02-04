const checkPhishing = async (url) => {
    const host = 'https://phisdect.azurewebsites.net/api/classify/'
    const body = JSON.stringify({
        website_uri: url
    })

    return new Promise( (resolve, reject) => {
        fetch(host, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: body
        }).then( (response) => {
            console.log(response);
            resolve(response.json())
        }).catch( (err) => {
            console.log(err)
            reject(err);
        })
    })
};
