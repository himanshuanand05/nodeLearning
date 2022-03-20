import express from "express"
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { getRecordsByDateRangeAndCountSum } from "./db/records.js.js"

dotenv.config();
const app = express();
app.listen(process.env.PORT, () => {
    console.log("Started server on " + process.env.PORT);
});

//get body data as json
app.use(bodyParser.json());

app.post('/', function (req, res) {
    try {
        if (!req.body.startDate || !req.body.endDate || !req.body.minCount || !req.body.maxCount) throw new Error("Params missing.");
        getRecordsByDateRangeAndCountSum(req.body)
            .then(result => res.json(
                {
                    code: 0,
                    msg: "Success",
                    records: result
                }
            )
            )
            .catch(err => {
                res.status(500).json({
                    code: err.code,
                    msg: err.message
                })
            }
            )
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
