#!/usr/bin/env node

var FormData = require('form-data');
var fs = require('fs');
var tfConfig;
var commander = require('commander');
var verbose = false;
var debug = false;
var cwd = process.cwd();
var args = process.argv;


if(fs.existsSync(cwd + '/testflight.json')){
	console.log('Loading configuration from testflight.json file');
	tfConfig = require(cwd + '/testflight');
} else {
	console.log('testflight.json does not exist');
	tfConfig = {};
}

commander.
	version('0.0.1').
	option('-b  --binary [path]', 'The path to the IPA or APK binary').
	option('-a  --api-token [token]', 'The TestFlight api token').
	option('-t  --team-token [token]', 'The TestFlight team token').
	option('-n  --notes [notes]', 'Optional notes').
	option('-d  --dsym [path]', 'For IPAs, the location of the dysm file').
	option('-l  --distribution-lists [lists]', 'The distribution lists to be notified').
	option('-n  --notify', 'Should notifications be sent to qualified TestFlight users').
	option('-r  --replace', 'Should this upload replace existing builds' ).
	option('-v  --verbose').
	option('--debug').
	parse(args);

// console.log(commander);

function processArgs() {

	if(commander.verbose) {
		verbose = true;
	}

	if(commander.debug){
		debug = true;
	}

	if(commander.binary) {
		tfConfig.binary = commander.binary;
	}

	if(commander['api-token']) {
		tfConfig.postData.api_token = commander['api-token'];
	}

	if(commander['team-token']) {
		tfConfig.postData.team_token = commander['team-token'];
	}

	if(commander.notes) {
		tfConfig.postData.notes = commander.notes;
	}

	if(commander.dsym) {
		tfConfig.postData.dsym = commander.dsym;
	}

	if(commander['distribution-lists']) {
		tfConfig.postData.distribution_lists = commander['distribution-lists'];
	}

	if(commander.notify) {
		tfConfig.postData.notify = commander.notify;
	}

	if(commander.replace) {
		tfConfig.postData.replace = commander.replace;
	}

	if(verbose) {
		console.log('using configuration', tfConfig);
		console.log('about to post to', tfConfig.url);
	}
}

function assertRequiredParams() {
	if(typeof tfConfig.postData.api_token !== 'string' || tfConfig.postData.api_token.length === 0){
		console.error('Missing required parameter api_token');
		process.exit(1);
	}
	if(typeof tfConfig.postData.team_token !== 'string' || tfConfig.postData.team_token.length === 0){
		console.error('Missing required parameter team_token');
		process.exit(1);
	}
	if(typeof tfConfig.binary !== 'string' || tfConfig.binary.length === 0){
		console.error('Missing required parameter binary');
		process.exit(1);
	}
}

processArgs();
assertRequiredParams();



var form = new FormData();
form.append('api_token', tfConfig.postData.api_token);
form.append('team_token', tfConfig.postData.team_token);
form.append('file', fs.createReadStream(tfConfig.binary));
form.append('notes', tfConfig.postData.notes);

if(debug){
	console.log('Form data is...');
	console.log(form);
}


form.submit('http://testflightapp.com/api/builds.json', function(err, res){
	if(err){
		console.log('********** error ***********');
		console.log(err);
		console.log(res);
	}else {
		console.log('************** success ******************');
		console.log(res.statusCode);
	}
});
