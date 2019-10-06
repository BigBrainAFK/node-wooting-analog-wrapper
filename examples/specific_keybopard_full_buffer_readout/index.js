const {
	wooting_analog,
	KeycodeType,
	DeviceEventType,
	types,
	VirtualKey,
} = require('wooting-analog-sdk');
const ref = require('ref');

process.cwd('..');

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
		// Setup the buffers and variables we need and get the length
		const keyCode = VirtualKey.Q;
		const analog_Buf = ref.alloc(types.float);
		const length = analog_Buf.length;

		// Read the full buffer value for the 'Q' key as long as the program runs
		wooting_analog.read_full_buffer_device(0x14, analog_Buf, length, deviceInfo.device_id);
				
		// Read the analog value for the 'Q' key as long as the program runs
		console.log(analog_Buf.deref());
	}
};

// Handing the callback to the SDK
wooting_analog.set_device_event_cb(callback);

// Keeping the script open till we close it via Ctrl+C
process.stdin.resume();
