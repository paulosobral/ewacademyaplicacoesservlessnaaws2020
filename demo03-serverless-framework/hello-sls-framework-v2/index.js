module.exports.handler = async (event) => {
  console.log('Ja chegou o disco voador!!')
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Aaaaai simmmmm",
      },
      null,
      2
    ),
  };
};