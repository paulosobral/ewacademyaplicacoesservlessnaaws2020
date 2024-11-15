module.exports = {
    hello: function (event) {
        console.log('env', proccess.env)
        return {
            statusCode: 200
        }
    }
}
// TODO: 11:12 https://play.ewacademy.com.br/area/produto/item/2981338