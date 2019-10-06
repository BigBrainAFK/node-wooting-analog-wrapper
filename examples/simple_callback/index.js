const {
	wooting_analog,
} = require('wooting-analog-sdk');

// Initilizing the SDK and Wrapper
wooting_analog.initialise();
console.log(`Wooting Analog SDK initlized?: ${wooting_analog.is_initialised()}`);

// Creating a callback function with 2 arguments
const callback = (eventType, deviceInfo) => {
	console.log(eventType === 1 ? 'Connected' : 'Disconnected');
	
	console.log("Beginning of device info");
	console.log(deviceInfo.toJSON());
	console.log("End of device info");
};

// Handing the callback to the SDK
wooting_analog.set_device_event_cb(callback);

// Keeping the script open till we close it via Ctrl+C
process.stdin.resume();