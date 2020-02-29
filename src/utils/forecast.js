
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b92d7370320f5dd425d2e41a9e3e5a85/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out with a high of ' + body.daily.data[0].temperatureHigh +'degree and a low of '+ body.daily.data[0].temperatureLow+'degree. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast