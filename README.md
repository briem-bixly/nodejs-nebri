# Node.js NebriOS

A simple and easy to use Node.js component for making NebriOS backend requests.

This app is intended for use with a NebriOS instance. Visit https://nebrios.com to sign up for free!

<h2>Installation</h2>
This app can be installed via npm:
```
npm install briem-bixly/nodejs-nebrios --save
```
- including --save at the end will install this component and add it as a dependency in your app's package.json

<h2>Usage</h2>
The NebriOSClient must be initialized before you can use the available functions.
```
var nebri = require('nodejs-nebrios');
var nebriclient = new nebri.NebriOSClient('instance_name');
```
- instance name is your NebriOS instance name. i.e. https://<strong>instance_name</strong>.nebrios.com

<h2>Public Functions</h2>
<strong>api_request</strong>
- api_module: the name of the api module stored on your NebriOS instance
- view_name: the name of the target function contained in the given api module
- method: the desired HTTP request method
- payload: an object containing params and values, can be an empty object
- callback (optional): the function to execute after a successful api request. this callback will receive all data included in your view's response
- error_callback (optional): the function to execute after an unsuccessful api request.

<h2>Examples</h2>
```
var nebri = require('nodejs-nebrios');
var nebriclient = new nebri.NebriOSClient('francois');
nebriclient.api_request('greeting_api', 'start_greeting', 'GET', {'greeting': 'hello'});
```
- in the above example, we don't send a callback or error callback function
- this is not recommended as there isn't a way to see what data is being sent with a given response

```
var nebri = require('nodejs-nebrios');
var nebriclient = new nebri.NebriOSClient('francois');
nebriclient.api_request('greeting_api', 'start_greeting', 'GET', {'greeting': 'hello'}, function(data){
    console.log(data); //outputs {"identifier": "02fe4cee4d484b9bae044bd640bce76"}
});
```
To make your code easier to read, we recommend defining a function first and passing the name as a parameter.
```
var nebri = require('nodejs-nebrios');
var nebriclient = new nebri.NebriOSClient('francois');
var callback = function(data){
    console.log(data); //outputs {"identifier": "02fe4cee4d484b9bae044bd640bce76"}
};
nebriclient.api_request('greeting_api', 'start_greeting', 'GET', {'greeting': 'hello'}, callback);
```
```
var nebri = require('nodejs-nebrios');
var nebriclient = new nebri.NebriOSClient('francois');
var callback = function(data){
    console.log(data);
};
var error_callback = function(data){
    console.log(data); //outputs Bad Request Response because greeting isn't supported
};
nebriclient.api_request('greeting_api', 'start_greeting', 'GET', {'greeting': 'hi'}, callback, error_callback);
```
