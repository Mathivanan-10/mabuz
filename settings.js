module.exports = {
    uiPort: process.env.PORT || 1880,
    httpAdminRoot: '/',
    httpNodeRoot: '/',
    userDir: '/data',
    flowFile: 'flows.json',
    credentialSecret: process.env.CREDENTIAL_SECRET || "neuroflow-secret-change-in-prod",

    // Set adminAuth to enable login (recommended for production)
    adminAuth: null,
    // adminAuth: {
    //     type: "credentials",
    //     users: [{
    //         username: "admin",
    //         password: "$2b$08$<bcrypt-hash>",  // use node-red admin password hash tool
    //         permissions: "*"
    //     }]
    // },

    functionGlobalContext: {},
    debugMaxLength: 1000,
    mqttReconnectTime: 5000,
    serialReconnectTime: 5000,
    logging: {
        console: {
            level: process.env.LOG_LEVEL || "info",
            metrics: false,
            audit: false
        }
    },
    editorTheme: {
        projects: { enabled: false },
        palette: {
            categories: ['subflows', 'common', 'function', 'network', 'sequence', 'parser', 'storage', 'dashboard']
        }
    }
};
