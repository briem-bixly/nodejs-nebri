var request = require('request');

var _instanceName = null;
var _callback = null;
var NebriOSClient = {};

NebriOSClient.setInstanceName = function(instance_name){
    _instanceName = instance_name;
}

function onResponse(error, response, body){
    _callback(body);
    _callback = null;
}

NebriOSClient.api_request = function(api_module, view_name, method, payload, callback){
    _callback = callback;
    var payload_str = "";
    if (payload !== {}){
        for (var key in payload){
            if(payload_str != ""){
                payload_str += "&";
            }
            payload_str += key + "=" + encodeURIComponent(payload[key]);
        }
    }
    if (_instanceName === null){
        return 'You must first set your instance name via setInstanceName';
    }
    var url = 'https://'+_instanceName+'.nebrios.com/api/v1/'+api_module+'/'+view_name;
    if (method === 'GET' && payload_str !== ""){
        url += '?' + payload_str;
    }
    var options = {
        url: url,
        method: method
    };
    if ((method === 'POST' || method === 'PUT') && payload !== {}){
        options['form'] = payload;
    }
    request(options, onResponse);
}

module.exports = NebriOSClient;