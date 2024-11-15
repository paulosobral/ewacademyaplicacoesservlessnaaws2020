module.exports = {
    hello: function (event) {
        console.log('env', process.env)
        return {
            statusCode: 200
        }
    }
}
// TODO: 11:40 https://play.ewacademy.com.br/area/produto/item/2981338