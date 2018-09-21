const path = require('path');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');

const DailyRotateFile = require('winston-daily-rotate-file');

const getTime = (time) => {
    const pad = (num) => {
        return (num > 9 ? "" : "0") + num;
    };
    const month  = time.getFullYear() + "-" + pad(time.getMonth() + 1);
    const day    = pad(time.getDate());
    const hour   = pad(time.getHours());
    const minute = pad(time.getMinutes());
    return {
        year_month: month,
        day: day,
        hour: hour,
        minute: minute,
        sec: pad(time.getSeconds())
    }
};

const myFormat = format.printf((info) => {
    const x = getTime(new Date(info.timestamp));
    info.timestamp = x.year_month + '-' + x.day + ': ' + x.hour + ':' + x.minute + ':' + x.sec;

    if(info.meta) {
        return `${info.timestamp} ${info.level}: ${info.message} \n\t ${JSON.stringify(info.meta)}`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

let logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.splat(),
        format.simple(),
        myFormat,
    ),

    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: 'logs/%DATE% - winston.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '5m',
        }),
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'logs/exception - winston.log' })
    ]
});

module.exports.logger = function () {
    return logger;
};

module.exports.morganMiddleware = function() {
    const logDirectory = path.join(__dirname, '../logs');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    return morgan(':remote-addr - :remote-user [:date[clf]] :response-time ms ":method :url" :status :res[content-length]',
        {
            stream: rfs((time, index) => {
                // file name generating function
                if(!time) return "access.log";

                const x = getTime(time);
                return x.year_month + "/" + x.year_month + '-' + x.day + "-" + x.hour + ':' + x.minute + "-" + index + "-access.log";
            }, {
                size: '5M',     // 5MB files
                interval: '7d', // weekly
                path: logDirectory
            })
        });
};
