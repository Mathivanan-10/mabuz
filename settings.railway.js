// settings.railway.js — Node-RED config for Railway.app deployment
module.exports = {
    uiPort: process.env.PORT || 1880,
    httpAdminRoot: '/',
    httpNodeRoot: '/',
    userDir: '/data',
    flowFile: 'flows.json',
    credentialSecret: process.env.CREDENTIAL_SECRET || "neuroflow-railway-secret",

    // No auth for portfolio/demo use. Enable for production:
    adminAuth: null,

    functionGlobalContext: {},
    debugMaxLength: 1000,

    // Disable MQTT reconnect noise (no broker on Railway unless you add one)
    mqttReconnectTime: 60000,
    serialReconnectTime: 60000,

    logging: {
        console: {
            level: "info",
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
