module.exports = {
    proxy: {
        enabled: false, //Should we use proxies? Can be either "true" or "false"
        proxy: '' //either "format://host:port" OR "format://username:password@host:port"
    },
    delayBetweenRequests: 100, //Delay between each request, in miliseconds!
    requestTimeout: 5
}
