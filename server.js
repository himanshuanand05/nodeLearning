import express from "express"
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { getRecordsByDateRangeAndCountSum } from "./repository_module/records.js"

dotenv.config();
const app = express();
app.listen(process.env.PORT, () => {
    console.log("Started server on "+process.env.PORT);
});

//get body data as json
app.use(bodyParser.json());

app.post('/', function (req, res, next) {
    getRecordsByDateRangeAndCountSum(req.body)
        .then(result=>res.json(
            {
                code:0,
                msg:"Success",
                records:result
            }
            )
        )
        .catch(err=>{
            next({code:1,
                msg:err})
            }
        )
        

})

