const request = require('request');
const moment = require('moment-timezone');

// Maybe get this data automatically from users for future improvement
const latitude = 39.91341905;
const longitude = -75.5752288905074;
const apiLink = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today`;

moment.tz.setDefault('Universal');

// Parse 12 hour format and returns and object containing Hours, Minutes, and Seconds in an object
const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes, seconds] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return {hours: hours, minutes: minutes, seconds: seconds};
}

// Converts UTC 24 hour time to 12 hour time in specified timezone
const  utcTimezoneConverter = (time24obj, timezone) => {
    const now = moment();
    const hours = time24obj.hours;
    const minutes = time24obj.minutes;
    const seconds = time24obj.seconds;

    // Create Moment.js time
    now
    .hour(hours)
    .minutes(minutes)
    .seconds(seconds)

    return now.tz(timezone).format('h:m A');

}

console.log('Today\'s sunrise was...');
request(apiLink, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        const data = JSON.parse(body).results;
        const sunrise24hr = convertTime12to24(data.sunrise);
        const sunset24hr = convertTime12to24(data.sunset);
        const timezone = 'America/New_York' // Maybe automatically get this data from user for furture improvement?

        const sunriseTime = utcTimezoneConverter(sunrise24hr, timezone);
        const sunsetTime = utcTimezoneConverter(sunset24hr, timezone);

        console.log(sunriseTime);
        console.log(`Sunset today will be ${sunsetTime}`);


    } else {
        console.log('Something went wrong, please check your internet connection');
    }

});

// Code I originally wrote inside request before refactoring
    // const sunriseUTC = convertTime12to24(data.sunrise);
    // const sunsetUTC = convertTime12to24(data.sunset);
    // const now = moment();
    // const sunset = now.hour(sunsetUTC.hours).minutes(sunsetUTC.minutes).seconds(sunsetUTC.seconds);
    // const sunrise = now.hour(sunriseUTC.hours).minutes(sunriseUTC.minutes).seconds(sunriseUTC.seconds);
    // console.log(sunrise.tz('America/New_York').format('h:m A'));
    // console.log(`Sunset today will be at ${data.sunset}`);        