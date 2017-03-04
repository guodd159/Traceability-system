module.exports = {
  port: 3000,
  session: {
    secret: 'traceability',
    key: 'traceability',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://127.0.0.1:27017/traceability'
};