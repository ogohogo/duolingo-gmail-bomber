module.exports = {
    proxy: {
        enabled: true, //Should we use proxies? Can be either "true" or "false"
        proxy: 'http://p.webshare.io:9999' //either "format://host:port" OR "format://username:password@host:port"
    },
    delayBetweenRequests: 100, //Delay between each request, in miliseconds!
    requestTimeout: 5
}