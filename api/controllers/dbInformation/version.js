const dbUtils = require('../../../services/database/utils')
const dbInformation = new dbUtils.DbInformation()

const versionController = (req, res) => {
  dbInformation.version()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
}

module.exports = versionController
