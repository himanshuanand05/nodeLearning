import express from "express"
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import fyers from "fyers-api-v2"
import { getRecordsByDateRangeAndCountSum } from "./db/records.js"

dotenv.config();
const app = express();
app.listen(process.env.PORT, () => {
    console.log("Started server on " + process.env.PORT);
});

//get body data as json
app.use(bodyParser.json());

//INSTALLATION : use node version 14.17.0 and above

//npm install fyers-api-v2 --save (this will install particular 
//npm package into your system environment)


// fyers.setRedirectUrl('http://localhost:4500/token')

// fyers.generateAuthCode().then(res => console.log(res))


/*Response Structure:
This will print a url on which by clicking you will get the authorization code.

https://api.fyers.in/api/v2/generate-authcode?client_id=TXXXXXXXX4-101&redirect_uri=https://trade.fyers.in/api-login/redirect-uri/index.html&response_type=code&state=sample_state*/

/*auth_code : “This will be the response of the generateAuthCode method once you click on the redirect_url you will be provided with the auth_code”*/

async function getHistory() {
    let history = new fyers.history()
    let result = await history.setSymbol('NSE:SBIN-EQ')
        .setResolution('D')
        .setDateFormat(0)
        .setRangeFrom('1622097600')
        .setRangeTo('1622097685')
        .getHistory()
    console.log(result)
}


let reqBody;
app.get('/token', function (req, res) {
    try {
        reqBody = {
            auth_code: req.query.auth_code,
            secret_key: 'WSMU4NOC4X'
        }
        fyers.setAppId('R7RM8A4MFC-100')

        fyers.generate_access_token(reqBody).then((response) => {
            console.log(response)
            fyers.setAccessToken(response.access_token)
            fyers.get_profile().then((response) => {
                console.log(response)
            })
            getHistory();
        })
        /*Copy the access token and paste it here. NOTE : Make sure for running 
        any api 
        fyers.setAccessToken and setAppId is set or it will throw error. */



    } catch (err) {
        res.status(400).json({
            code: 1,
            msg: err.message
        })
    }
    res.send("done")

})


app.post('/token', function (req, res) {
    try {
        getHistory();
    } catch (err) {
        res.status(400).json({
            code: 1,
            msg: err.message
        })
    }
})

export {
    app
}
