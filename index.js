var request = require('request');

function NebriClient(instance_name){
    this.instanceName = instance_name;
}
NebriClient.prototype.setInstanceName = function(instance_name){
    this.instanceName = instance_name;
};
NebriClient.prototype.api_request = function(api_module, view_name, method, payload, callback, error_callback){
    var payload_str = "";
    if (payload !== {}){
        for (var key in payload){
            if(payload_str != ""){
                payload_str += "&";
            }
            payload_str += key + "=" + encodeURIComponent(payload[key]);
        }
    }
    if (this.instanceName === null){
        return 'You must first set your instance name via setInstanceName';
    }
    var url = 'https://'+this.instanceName+'.nebrios.com/api/v1/'+api_module+'/'+view_name;
    if (method === 'GET' && payload_str !== ""){
        url += '?' + payload_str;
    }
    var options = {
        url: url,
        method: method
    };
    if ('basic_auth' in payload) {
        options['auth'] = {
            'user': payload['basic_auth']['user'],
            'pass': payload['basic_auth']['pass'],
            'sendImmediately': false
        };
    }
    if ((method === 'POST' || method === 'PUT') && payload !== {}){
        options['form'] = payload;
    }
    var me = this;
    request(options, function(error, response, body){return me.onResponse(error, response, body, callback, error_callback);});
};

NebriClient.prototype.onResponse = function(error, response, body, callback, error_callback){
    if (error){console.log('error: ', error);console.log('body: ', body);}
    if (error && error_callback !== undefined){
        error_callback(body);
    }
    if (callback !== undefined) {
        callback(body);
    }
};

module.exports.NebriClient = NebriClient;