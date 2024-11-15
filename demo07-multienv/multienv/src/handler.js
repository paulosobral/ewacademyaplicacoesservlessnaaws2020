const { randomUUID } = require('node:crypto')

class Handler {
    constructor({ 
        dynamoDBSvc 
    }) {
        this.dynamoDBSvc = dynamoDBSvc
        this.dynamoTable = 'Heroes'
    }

    async main(event) {
        const data = event.body

        const params = this.prepareData(data)
        await this.dynamoDBSvc.put(params).promise()

        const insertedItem = await this.dynamoDBSvc.query({
            TableName: this.dynamoTable,
            ExpressionAttributeValues: {
            ':id': params.Item.id
            },
            KeyConditionExpression: 'id = :id'
        }).promise()

        return {
            statusCode: 200,
            body: JSON.stringify(
            insertedItem
            ),
        };
    }

    prepareData(data) {
        return {
            TableName: 'Heroes',
            Item: {
                ...data,
                id: randomUUID(),
                createdAt: new Date().toISOString()
            }
        }
    }
}

module.exports = Handler