module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '4.4.10',
      skipMD5: true
    },
    autoStart: false
  }
}
