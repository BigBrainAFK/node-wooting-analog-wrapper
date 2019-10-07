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
		const keyCode = Buffer.alloc(10000000);
		keyCode.type = types.ushort_Ptr;
		const analog_Buf = Buffer.alloc(10000000);
		analog_Buf.type = types.float_Ptr;
		const length = keyCode.length > analog_Buf.length ? analog_Buf.length : keyCode.length;

		// Fill buffer while program runs
		WootingClient.read_full_buffer(keyCode, analog_Buf, length);
			
		// Print the values of keyCode and Analog
		console.log(`keyCode value: 0x${keyCode.readUInt16LE().toString(16)}\nAnalog value: ${analog_Buf.readFloatLE()}`);
	}
};

// Handing the callback to the SDK
WootingClient.set_device_event_cb(callback);

// Keeping the script open till we close it via Ctrl+C
process.stdin.resume();
