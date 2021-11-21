const sqlConfig = {
    user: "*******",
    password: "***********",
    database: "************",
    server: '*******************************',

    pool: {
        max: 10,
        min: 5,
        idleTimeoutMillis: 30000,
    },
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

module.exports = sqlConfig;
