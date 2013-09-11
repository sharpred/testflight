# Node Test Flight

A simple node module for pushing builds IPA and APK files to TestFlight.


	npm install -g testflight


## Usage

* Edit testflight.json to include your keys and paths

		$ testflight # This will use testfight.json

* Pass in command line parameters


	  $ testflight -b /path/to/file.ipa -a 'my-api-token' -t 'my-team-token'

	  Usage: testflight [options]

	  Options:

	    -h, --help                        output usage information
	    -V, --version                     output the version number
	    -b  --binary [path]               The path to the IPA or APK binary
	    -a  --api-token [token]           The TestFlight api token
	    -t  --team-token [token]          The TestFlight team token
	    -n  --notes [notes]               Optional notes
	    -d  --dsym [path]                 For IPAs, the location of the dysm file
	    -l  --distribution-lists [lists]  The distribution lists to be notified
	    -n  --notify                      Should notifications be sent to qualified TestFlight users
	    -r  --replace                     Should this upload replace existing builds
	    -v  --verbose
	    --debug