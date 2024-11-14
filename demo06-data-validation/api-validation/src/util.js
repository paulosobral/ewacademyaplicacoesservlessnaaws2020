// fn é o main
// schema é a validacao
// argtype = body, queryString
const decoratorValidator = (fn, schema, argType) => {
    return async function (event) {
        const data = JSON.parse(event[argType])
        const { error, value } = await schema.validate(
            data,
            { 
                // mostra todos os erros na tela!
                abortEarly: false 
            }
        )
        // faz com que o event.body ja venha como objeto ao invés de string
        // isso tabem altera o arguments (transformando o body)
        event[argType] = value
        if(!error) return fn.apply(this, arguments)
        
        return {
            statusCode: 422, // unprocessable entity
            body: error.message
        }
    }
}

module.exports = {
    decoratorValidator
}