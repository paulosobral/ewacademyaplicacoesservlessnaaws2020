'use strict'
const { dynamoDB } = require('./factory')
const Handler = require('./handler')
const { decoratorValidator } = require('./util')
const handler = new Handler({
  dynamoDBSvc: dynamoDB
})

const heroesInsert = decoratorValidator(
  handler.main.bind(handler), // o .bind garante que a variavel this seja o conteudo do handler
  Handler.validator(),
  'body'
)

const heroesTrigger = async (event) => {
  console.log('***event', JSON.stringify(event));

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