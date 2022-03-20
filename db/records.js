import { MongoClient } from 'mongodb';
import { getRecordsByDateRangeAndCountSumModel } from "./modals/getRecordsByDateRangeAndCountSumModel.js"

export {
    getRecordsByDateRangeAndCountSum
}

/** 
 * Gets the filtered result from data store.
 * Filter criteria works for a date range <startDate(exclusive) & endDate(exclusive)> and count as totalCount 
 * <minCount(exclusive) & maxCount(exclusive)>. Since count field is an Array[numbers] so minCount & maxCount 
 * compares on summation of Array elements.
 * @param data This is an object type parameter having object keys startDate, endDate, minCount and maxCount.
 * @returns A Promise for the completion of the data fetch query. If successful returns records array.
 */
function getRecordsByDateRangeAndCountSum(data) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.CONNECTION_URI, function (err, db) {
            if (err) {
                err.code = 2
                return reject(err);
            }
            try {
                let dbo = db.db(process.env.DB_NAME);
                dbo.collection("records").aggregate(new getRecordsByDateRangeAndCountSumModel(data).query).toArray(function (err, result) {
                    if (err) {
                        err.code = 3;
                        return reject(err);
                    }
                    db.close();
                    return resolve(result);
                });
            } catch (err) {
                err.code = 4;
                return reject(err);
            }

        })
    })
}



