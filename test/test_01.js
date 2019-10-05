const {
	wooting_analog,
	WootingAnalog_KeycodeType,
	wooting_types,
} = require('../index.js');
const ref = require('ref');

wooting_analog.initialise();
console.log(`Wooting Analog SDK initlized?: ${wooting_analog.is_initialised()}`);

const device_info_result = ref.alloc(wooting_types.WootingAnalog_DeviceInfo_Ptr);

console.log(`Wooting keyboards connected right now: ${wooting_analog.get_connected_devices_info(device_info_result, device_info_result.length)}`);

const device_info = device_info_result.deref().deref();

console.log("Beginning of device info");
console.log(device_info.vendor_id);
console.log("End of device info");

wooting_analog.set_keycode_mode(WootingAnalog_KeycodeType.VirtualKeyTranslate);
while(true)
	console.log(wooting_analog.read_analog(0x51));