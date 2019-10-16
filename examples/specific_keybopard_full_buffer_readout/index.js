const {
	WootingWrapper,
	DeviceEventType,
	types,
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
		// Setup the buffers and variables we need and get the length
		const keyCode_Buf = Buffer.alloc(1e2);
		keyCode_Buf.type = types.ushortArray_Ptr;
		const analog_Buf = Buffer.alloc(1e2);
		analog_Buf.type = types.floatArray_Ptr;
		const length = keyCode_Buf.length > analog_Buf.length ? analog_Buf.length : keyCode_Buf.length;
		
		// Fill buffer
		WootingClient.read_full_buffer(keyCode_Buf, analog_Buf, length);
		
		const keys = [...keyCode_Buf].map(x => `0x${x.toString(16)}`);
		const analogValues = [...analog_Buf];
		
		// Print the values of keys and analogValues
		console.log(`keyCodes pressed: ${keys}`);
		console.log(`Analog Values of keys: ${analogValues}`);
	}
};

// Handing the callback to the SDK
WootingClient.set_device_event_cb(callback);

// Keeping the script open till we close it via Ctrl+C
process.stdin.resume();
