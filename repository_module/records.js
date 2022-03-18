import MongoClient from 'mongodb';

export {
    getRecordsByDateRangeAndCountSum
}

function getRecordsByDateRangeAndCountSum(data) {
    return new Promise((resolve, reject)=>{
        MongoClient.MongoClient.connect(process.env.CONNECTION_URI, function(err, db){
            if(err) reject(err);
            let dbo = db.db(process.env.DB_NAME);
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
                if (err) reject(err);
                db.close();
                resolve(result);
            });
        })
    })
}



