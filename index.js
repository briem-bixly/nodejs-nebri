var request = require('request');

function NebriOSClient(instance_name){
    this.instanceName = instance_name;
}
NebriOSClient.prototype.setInstanceName = function(instance_name){
    this.instanceName = instance_name;
};
NebriOSClient.prototype.api_request = function(api_module, view_name, method, payload, callback, error_callback){
    this.callback = callback;
    this.error_callback = error_callback;
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
    if ((method === 'POST' || method === 'PUT') && payload !== {}){
        options['form'] = payload;
    }
    var me = this;
    request(options, function(error, response, body){return me.onResponse(error, response, body);});
};

NebriOSClient.prototype.onResponse = function(error, response, body){
    if (error && this.error_callback !== null){
        (this.error_callback)(body);
    }
    return (this.callback)(body);
};

module.exports.NebriOSClient = NebriOSClient;