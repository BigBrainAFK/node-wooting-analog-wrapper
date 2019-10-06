const {
	wooting_analog,
	KeycodeType,
	types,
	VirtualKey,
} = require('wooting-analog-sdk');
const ref = require('ref');


// Initilizing the SDK and Wrapper
wooting_analog.initialise();
console.log(`Wooting Analog SDK initlized?: ${wooting_analog.is_initialised()}`);

// Creating a new buffer with a pointer to a pointer to the Wooting DeviceInfo Struct
const device_info_result = ref.alloc(types.WootingAnalog_DeviceInfo_Ptr);

// Fetch and output the amount of connected devices
console.log(`Wooting keyboards connected right now: ${wooting_analog.get_connected_devices_info(device_info_result, device_info_result.length)}`);

// Deref the StructType** to its StructType value
const device_info = device_info_result.deref().deref();

// Output the Device Info
console.log("Beginning of device info");
console.log(device_info.toJSON());
console.log("End of device info");

// Set Keycode Type to current layout
wooting_analog.set_keycode_mode(KeycodeType.VirtualKeyTranslate);

while(true) {
	// Read the analog value for the 'Q' key as long as the program runs
	console.log(wooting_analog.read_analog(VirtualKey.Q));
}