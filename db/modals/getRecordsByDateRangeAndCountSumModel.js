export class getRecordsByDateRangeAndCountSumModel {
    constructor({startDate, endDate, minCount, maxCount}){
        this.data = {}
        this.data.startDate = !isNaN(new Date(startDate)) ? new Date(startDate) : (()=>{throw new Error( "Constructor Failed: startDate missing or invalid")})();
        this.data.endDate = !isNaN(new Date(endDate)) ? new Date(endDate) : (()=>{throw new Error( "Constructor Failed: endDate missing or invalid")})();
        this.data.minCount = !isNaN(minCount) ? minCount : (()=>{throw new Error( "Constructor Failed: minCount missing or invalid")})();
        this.data.maxCount = !isNaN(maxCount) ? maxCount : (()=>{throw new Error( "Constructor Failed: maxCount missing or invalid")})();
    }

    get query() {
        return [
            {
                $match: {
                    $and: [
                        { createdAt: { $gt: new Date(this.data.startDate) } },
                        { createdAt: { $lt: new Date(this.data.endDate) } }
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
                        { totalCount: { $gt: this.data.minCount} },
                        { totalCount: { $lt: this.data.maxCount} }
                    ]
                }
            },
            {
                $unset: ["value", "counts", "_id"]
            }
        ]
    } 
}

