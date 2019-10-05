const {
	wooting_analog,
	WootingAnalogResult,
	WootingAnalog_DeviceEventType,
	WootingAnalog_KeycodeType,
	wooting_types,
} = require('../index.js');
const ref = require('ref');
const ffi = require('ffi');

wooting_analog.initialise();
console.log(`Wooting Analog SDK initlized?: ${wooting_analog.is_initialised()}`);

const callback = ffi.Callback(ref.types.void, [
	wooting_types.WootingAnalog_DeviceEventType,
	wooting_types.WootingAnalog_DeviceInfo_Ptr,
], (eventType, deviceInfo) => {
	const device_info = deviceInfo.deref();
	
	console.log("Beginning of device info");
	console.log(device_info.vendor_id);
	console.log("End of device info");
});

wooting_analog.set_device_event_cb(callback);

process.stdin.resume();
