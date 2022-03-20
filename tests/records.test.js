import { app } from "../server.js";
import request  from 'supertest'

test('Successful request', async () => {
    const response = await request(app).post('/').send({
        "startDate": "2016-12-28",
        "endDate": "2017-12-02",
        "minCount": 300,
        "maxCount": 900
        }).expect(200)
    expect(response.body).toEqual({
        code: 0,
        msg: "Success",
        records: [
            {
                "key": "TAKwGc6Jr4i8Z487",
                "createdAt": "2017-01-28T01:22:14.398Z",
                "totalCount": 310
            }
        ]
    })
}, 15000)


