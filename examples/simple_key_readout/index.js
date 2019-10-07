const {
	WootingWrapper,
	types,
	ScanCodes_Enum,
} = require('wooting-analog-sdk');
const ref = require('ref');

const WootingClient = new WootingWrapper();

// Initilizing the SDK and Wrapper
console.log(WootingClient.initialise());
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

while(true) {
	// Read the analog value for the 'Q' key as long as the program runs
	console.log(WootingClient.read_analog(ScanCodes_Enum.Q));
}