const axios = require('axios');
const qs = require('qs');
const fs = require('fs');

const apiData = qs.stringify({
    'grant_type': 'client_credentials',
    'scope': 'admin contacts messages' 
})

const config = {
    method: 'post',
    url: 'https://account-demo.marketvision.com/connect/token',
    headers: { 
        'Authorization': 'Basic '+ Buffer.from('omicron_demo_client:demosecret', 'utf8').toString('base64'),  
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : apiData
}

const getMvAccessToken = async () => {

    try {
        const response = await axios(config)
        return JSON.stringify(response.data)
    }catch (err) {
        return null
    }
}

const saveMvTokenToFile = async () => {
    const data = await getMvAccessToken()
    if(data) {
        fs.writeFileSync('token.json', data)
    }
}

const getMvTokenFromFile = async (req, res) => {
    if(!fs.existsSync('token.json')) {
        await saveMvTokenToFile()
        console.log('token file created')
    }
    const data = fs.readFileSync('token.json')
    res.json(JSON.parse(data))
}

module.exports = {
    saveMvTokenToFile,
    getMvTokenFromFile
}
