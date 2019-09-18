const moment = require('moment-timezone');

// Converts UTC 24 hour time to 12 hour time in specified timezone
const utcTimezoneConverter = (time24obj, timezone) => {
    const now = moment();
    const hours = time24obj.hours;
    const minutes = time24obj.minutes;
    const seconds = time24obj.seconds;

    // Create Moment.js time
    now
        .hour(hours)
        .minutes(minutes)
        .seconds(seconds)

    return now.tz(timezone).format('h:mm A');

}

module.exports = utcTimezoneConverter;