const {
	WootingWrapper,
	DeviceEventType,
	ScanCodes_Enum
} = require('wooting-analog-sdk');

const WootingClient = new WootingWrapper();

// Initilizing the SDK and Wrapper
WootingClient.initialise();
console.log(`Wooting Analog SDK initlized?: ${WootingClient.is_initialised()}`);

// Creating a callback function with 2 arguments
const callback = (eventType, deviceInfo) => {
	console.log(eventType === 1 ? 'Connected' : 'Disconnected');
	
	console.log("Beginning of device info");
	console.log(deviceInfo.toJSON());
	console.log("End of device info");

	if (eventType === DeviceEventType.Connected) {
		// Read the analog value for the 'Q' key as long as the program runs
		console.log(WootingClient.read_analog_device(ScanCodes_Enum.Q, deviceInfo.device_id));
	}
};

// Handing the callback to the SDK
WootingClient.set_device_event_cb(callback);

// Keeping the script open till we close it via Ctrl+C
process.stdin.resume();
