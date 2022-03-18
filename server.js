import express from "express"
import bodyParser from "body-parser";

import { getRecordsByDateRangeAndCountSum } from "./repository_module/records.js"

const app = express();
app.listen(3000, () => {
    console.log("Started server on 3000");
});

//get body data as json
app.use(bodyParser.json());

app.post('/', function (req, res, next) {
    getRecordsByDateRangeAndCountSum(req.body)
        .then(result=>res.json(result))
        .catch(err=>next(err))
})

