'use strict';

const path = require('path');
const defaultSettings = require('./src/settings.js');
const port = process.env.port || process.env.npm_config_port || 9529; // dev port
const name = defaultSettings.title || 'vue project title'; // page title

// eslint-disable-next-line require-jsdoc
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
        // before: require('./mock/mock-server.js')
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
};