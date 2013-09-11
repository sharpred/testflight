var vows = require('vows'),
	assert = require('assert');

vows.describe('Hello World').addBatch({
	'when running a simple test' : {
		topic : function () { return 'hello world'; },

		'we get hello world' : function (topic) {
			assert.equal(topic, 'hello world');
		}
	}
}).export(module);
