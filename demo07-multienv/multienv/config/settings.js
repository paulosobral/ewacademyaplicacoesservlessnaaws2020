const env = require('env-var')
const settings = {
    NODE_ENV: env.get('NODE_ENV').required().asString(),
    APICommitMessageURL: env.get('APICommitMessageURL').required().asString(),
    DbTableName: env.get('DbTableName').required().asString()
}

module.exports = settings