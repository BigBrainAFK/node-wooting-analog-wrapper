const {
	wooting_analog,
	KeycodeType,
	DeviceEventType,
	VirtualKey,
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

	if (eventType === DeviceEventType.Connected) {
		// We have to setImmediate here so the SDK doesnt block inside callback
		setImmediate(() => {
			// Set Keycode Type to current layout
			wooting_analog.set_keycode_mode(KeycodeType.VirtualKeyTranslate);

			// Read the analog value for the 'Q' key as long as the program runs
			console.log(wooting_analog.read_analog_device(VirtualKey.Q, deviceInfo.device_id));
		});
	}
};

// Handing the callback to the SDK
wooting_analog.set_device_event_cb(callback);

// Keeping the script open till we close it via Ctrl+C
process.stdin.resume();
