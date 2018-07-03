'use strict';

module.exports = function(Exchangerate) {
    Exchangerate.get = function(cb) {
        cb(null, Exchangerate['currentRate']);
    };
    Exchangerate.remoteMethod(
        'get', {
            http: {
                path: '/get',
                verb: 'get'
            },
            returns: {
                arg: 'exchanges',
                type: 'string'
            }
        }
    );
};
