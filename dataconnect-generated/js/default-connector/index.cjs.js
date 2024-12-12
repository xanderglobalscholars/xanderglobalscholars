const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'xander-global-scholars',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

