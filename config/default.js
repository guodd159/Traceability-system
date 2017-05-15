module.exports = {


    port: 1000,
    session: {
        secret: 'traceability',
        key: 'traceability',
        maxAge: 2592000000
    },
    // mongodb: 'mongodb://guodd159:guodd159@ds141209.mlab.com:41209/traceability'
    mongodb: 'mongodb://127.0.0.1:27017/traceability'
};