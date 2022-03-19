import MongoClient from 'mongodb';

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
    return new Promise((resolve, reject)=>{
        MongoClient.MongoClient.connect(process.env.CONNECTION_URI, function(err, db){
            if(err) {
                err.code = 2
                return reject(err);
            }
            let dbo = db.db(process.env.DB_NAME);
            //query to fetch record on createdAt and count
            let query = [
                {
                    $match: {
                        $and: [
                            { createdAt: { $gt: new Date(data.startDate) } },
                            { createdAt: { $lt: new Date(data.endDate) } }
                        ]
                    }
                },
                {
                    $addFields: {
                        totalCount: { $sum: "$counts" }
                    }
                },
                {
                    $match: {
                        $and: [
                            { totalCount: { $gt: data.minCount} },
                            { totalCount: { $lt: data.maxCount} }
                        ]
                    }
                },
                {
                    $unset: ["value", "counts", "_id"]
                }
            ]

            dbo.collection("records").aggregate(query).toArray(function (err, result) {
                if (err) {
                    err.code = 3;
                    return reject(err);
                }
                db.close();
                return resolve(result);
            });
        })
    })
}



