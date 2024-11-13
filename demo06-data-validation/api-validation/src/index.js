'use strict'
const { randomUUID } = require('node:crypto')
const { dynamodb } = require('./factory')
const heroesInsert = async (event) => {
  const data = event.body
  const params = {
    TableName: 'Heroes',
    Item: {
      ...data,
      id: randomUUID,
      createdAt: new Date().toISOString()
    }
  }
  await dynamodb.put(params).promise()

  const insertedItem = dynamodb.query({
    TableName: 'Heroes',
    ExpressionAttributeValues: {
      ':id': params.Item.id
    },
    KeyConditionExpression: 'id = :id'
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      insertedItem,
      null,
      2
    ),
  };
};

const heroesTrigger = async (event) => {
  console.log('***event', event);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports = {
  heroesTrigger,
  heroesInsert
}