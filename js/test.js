fetch("https://api.insurance.kg/crm_test/api_business/territories/", {

    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(response + " yaa");
    }
    return response.json();
})
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    })