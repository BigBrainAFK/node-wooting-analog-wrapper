const {
	WootingWrapper,
	types,
} = require('wooting-analog-sdk');
const ref = require('ref');

const WootingClient = new WootingWrapper();

// Initilizing the SDK and Wrapper
WootingClient.initialise();
console.log(`Wooting Analog SDK initlized?: ${WootingClient.is_initialised()}`);

// Creating a new buffer with a pointer to a pointer to the Wooting DeviceInfo Struct
const device_info_result = ref.alloc(types.WootingAnalog_DeviceInfo_Ptr);

// Fetch and output the amount of connected devices
console.log(`Wooting keyboards connected right now: ${WootingClient.get_connected_devices_info(device_info_result, device_info_result.length)}`);

// Deref the StructType** to its StructType value
const device_info = device_info_result.deref().deref();

// Output the Device Info
console.log("Beginning of device info");
console.log(device_info.toJSON());
console.log("End of device info");

// Setup the buffers and variables we need and get the length
const keyCode_Buf = Buffer.alloc(1e6);
keyCode_Buf.type = types.ushort_Ptr;
const analog_Buf = Buffer.alloc(1e6);
analog_Buf.type = types.float_Ptr;
const length = keyCode_Buf.length > analog_Buf.length ? analog_Buf.length : keyCode_Buf.length;

for (let i = 0; i < length; i++) {
	// Fill buffer
	WootingClient.read_full_buffer(keyCode_Buf, analog_Buf, length);
	
	// Print the values of keyCode and Analog
	console.log(`keyCode value: 0x${keyCode_Buf.readUInt16LE().toString(16)}\nAnalog value: ${analog_Buf.readFloatLE()}`);
}
