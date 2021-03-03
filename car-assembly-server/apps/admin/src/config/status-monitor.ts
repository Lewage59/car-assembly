export default {
    pageTitle: 'Nest.js Monitoring Page',
    port: +process.env.STATUS_MONITOR_PORT,
    path: '/status-monitor',
    ignoreStartsWith: '/health/alive',
    spans: [
    {
        interval: 1, // Every second
        retention: 60, // Keep 60 datapoints in memory
    },
    {
        interval: 5, // Every 5 seconds
        retention: 60,
    },
    {
        interval: 15, // Every 15 seconds
        retention: 60,
    }
    ],
    chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
    },
    healthChecks: []
};