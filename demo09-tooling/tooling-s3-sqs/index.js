module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello!',
      },
      null,
      2
    ),
  };
};
// TODO: 06:25 https://play.ewacademy.com.br/area/produto/item/2979171