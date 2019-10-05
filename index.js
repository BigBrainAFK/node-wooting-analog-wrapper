const ffi = require('ffi');
const ref = require('ref');
const StructType = require('ref-struct');

process.chdir('..'); //changing cwd for tests

const platform = (require('os')).platform();
if (platform === 'win32'){
    woot_loc = './wrapper/wooting_analog_wrapper.dll';
}else if(platform === 'linux'){
    woot_loc = './wrapper/libwooting_analog_wrapper.so';
}else if(platform === 'darwin'){
    woot_loc = './wrapper/libwooting_analog_wrapper.dylib'
}else{
    throw new Error('unsupported platform for the wooting_analog_wrapper')
}

const ushort = ref.types.ushort;
const ushort_Ptr = ref.refType(ushort);
const float = ref.types.float;
const float_Ptr = ref.refType(float);

const WootingAnalogResult = ref.types.int;
const WootingAnalog_DeviceID = ref.types.uint64;
const WootingAnalog_DeviceInfo = StructType({
    vendor_id : ref.types.uint16,
    product_id : ref.types.uint16,
    manufacturer_name : ref.types.char,
    device_name : ref.types.char,
    device_id : WootingAnalog_DeviceID,
});
const WootingAnalog_DeviceInfo_Ptr = ref.refType(WootingAnalog_DeviceInfo);
const WootingAnalog_DeviceEventType = ref.types.int;
const WootingAnalogCallback = ffi.Function(ref.types.void, [
	WootingAnalog_DeviceEventType,
	WootingAnalog_DeviceInfo_Ptr,
]);
const WootingAnalog_KeycodeType = ref.types.int;

const wooting_analog_wrapper = ffi.Library(woot_loc, {
	'wooting_analog_clear_device_event_cb': [
		WootingAnalogResult,
		[]
	],
	'wooting_analog_get_connected_devices_info': [
		ref.types.int,
		[
			WootingAnalog_DeviceInfo_Ptr, ref.types.uint,
		]
	],
	'wooting_analog_initialise': [
		WootingAnalogResult,
		[]
	],
	'wooting_analog_is_initialised': [
		ref.types.bool,
		[]
	],
	'wooting_analog_read_analog': [
		ref.types.float,
		[
			ref.types.ushort,
		]
	],
	'wooting_analog_read_analog_device': [
		ref.types.float,
		[
			ref.types.ushort,
			WootingAnalog_DeviceID,
		]
	],
	'wooting_analog_read_full_buffer': [
		ref.types.int,
		[
			ushort_Ptr,
			float_Ptr,
			ref.types.uint,
		]
	],
	'wooting_analog_read_full_buffer_device': [
		ref.types.int,
		[
			ushort_Ptr,
			float_Ptr,
			ref.types.uint,
			WootingAnalog_DeviceID,
		]
	],
	'wooting_analog_set_device_event_cb': [
		WootingAnalogResult,
		[
			WootingAnalogCallback,
		]
	],
	'wooting_analog_set_keycode_mode': [
		WootingAnalogResult,
		[
			WootingAnalog_KeycodeType,
		]
	],
	'wooting_analog_uninitialise': [
		WootingAnalogResult,
		[]
	],
});

class wooting_analog {
	/**
	 * Clears the device callback function
	 *
	 * @returns { WootingAnalogResult } The result of the function
	 * @memberof wooting_analog
	 */
	clear_device_event_cb() {
		return wooting_analog_wrapper.wooting_analog_clear_device_event_cb();
	}

	/**
	 * Fetches the connected devices infos
	 *
	 * @param { WootingAnalog_DeviceInfo** } device_info Device info buffer
	 * @param { number } length Length of the buffer to fill
	 * @returns { number } If bigger than 0 the number of devices that are connected
	 * @memberof wooting_analog
	 */
	get_connected_devices_info(device_info, length) {
		return wooting_analog_wrapper.wooting_analog_get_connected_devices_info(device_info, length);
	}

	/**
	 * Initilizes the Wooting Analog Wrapper
	 *
	 * @returns { WootingAnalogResult } The result of the function
	 * @memberof wooting_analog
	 */
	initialise() {
		return wooting_analog_wrapper.wooting_analog_initialise();
	}

	/**
	 * Checks if the Wooting Analog Wrapper is initilized
	 *
	 * @returns { boolean } True if initilized, false otherwise
	 * @memberof wooting_analog
	 */
	is_initialised() {
		return wooting_analog_wrapper.wooting_analog_is_initialised();
	}

	/**
	 * Read the Analog value of a specified key
	 *
	 * @param { number } keyCode keyCode of the key you want to read
	 * @returns { number } Analog value of the specified key
	 * @memberof wooting_analog
	 */
	read_analog(keyCode) {
		return wooting_analog_wrapper.wooting_analog_read_analog(keyCode);
	}

	/**
	 * Reads the analog value of a specified key from the specified device
	 *
	 * @param { number } keyCode The keyCode you want to fetch
	 * @param { WootingAnalog_DeviceID } device_id The device id that will be fetched from
	 * @returns { number } Analog value of the specified key
	 * @memberof wooting_analog
	 */
	read_analog_device(keyCode, device_id) {
		return wooting_analog_wrapper.wooting_analog_read_analog_device(keyCode, device_id);
	}

	/**
	 * Read the full analog buffer of a specified key
	 *
	 * @param { ushort* } code_buffer The keyCode buffer
	 * @param { float* } analog_buffer The analog buffer
	 * @param { number } length The length of the code and analog buffer
	 * @returns { number }
	 * @memberof wooting_analog
	 */
	read_full_buffer(code_buffer, analog_buffer, length) {
		return wooting_analog_wrapper.wooting_analog_read_full_buffer(code_buffer, analog_buffer, length);
	}

	/**
	 * Read the full analog buffer of a specified key from a specified device
	 *
	 * @param { ushort* } code_buffer The keyCode buffer
	 * @param { float* } analog_buffer The analog buffer
	 * @param { number } length The length of the code and analog buffer
	 * @param { WootingAnalog_DeviceID } device_id The device id that will be fetched from
	 * @returns { number }
	 * @memberof wooting_analog
	 */
	read_full_buffer_device(code_buffer, analog_buffer, length, device_id) {
		return wooting_analog_wrapper.wooting_analog_read_full_buffer_device(code_buffer, analog_buffer, length, device_id);
	}

	/**
	 * Set the analog device callback function
	 *
	 * @param { Function* } callback The callback function to call on device events
	 * @returns { WootingAnalogResult }
	 * @memberof wooting_analog
	 */
	set_device_event_cb(callback) {
		this.ffi_callback = ffi.Callback(ref.types.void, [
			WootingAnalog_DeviceEventType,
			WootingAnalog_DeviceInfo_Ptr,
		], (eventType, deviceInfo) => {
			callback(eventType, deviceInfo.deref());
		});

		return wooting_analog_wrapper.wooting_analog_set_device_event_cb(this.ffi_callback);
	}

	/**
	 * Set the key mode of the device
	 *
	 * @param { WootingAnalog_KeycodeType } mode The mode you want to set the device to
	 * @returns { WootingAnalogResult }
	 * @memberof wooting_analog
	 */
	set_keycode_mode(mode) {
		return wooting_analog_wrapper.wooting_analog_set_keycode_mode(mode);
	}

	/**
	 * Uninitilize the Wooting Analog Wrapper
	 *
	 * @returns { WootingAnalogResult }
	 * @memberof wooting_analog
	 */
	uninitialise() {
		return wooting_analog_wrapper.wooting_analog_uninitialise();
	}
}

module.exports = {
	wooting_analog: new wooting_analog(),
	WootingAnalogResult: {
		Ok: 1,
		/// Item hasn't been initialized
		UnInitialized: -2000,
		/// No Devices are connected
		NoDevices: -1999,
		/// Device has been disconnected
		DeviceDisconnected: -1998,
		/// Generic Failure
		Failure: -1997,
		/// A given parameter was invalid
		InvalidArgument: -1996,
		/// No Plugins were found
		NoPlugins: -1995,
		/// The specified function was not found in the library
		FunctionNotFound: -1994,
		/// No Keycode mapping to HID was found for the given Keycode
		NoMapping: -1993,
		/// Indicates that it isn't available on this platform
		NotAvailable: -1992,
	},
	WootingAnalog_DeviceEventType: {
		/// Device has been connected
		Connected: 1,
		/// Device has been disconnected
		Disconnected: 2,
	},
	WootingAnalog_KeycodeType: {
		/// USB HID Keycodes https://www.usb.org/document-library/hid-usage-tables-112 pg53
		HID: 0,
		/// Scan code set 1
		ScanCode1: 1,
		/// Windows Virtual Keys
		VirtualKey: 2,
		/// Windows Virtual Keys which are translated to the current keyboard locale
		VirtualKeyTranslate: 3,
	},
	wooting_types: {
		WootingAnalogResult,
		WootingAnalog_DeviceID,
		WootingAnalog_DeviceInfo,
		WootingAnalog_DeviceInfo_Ptr,
		WootingAnalog_DeviceEventType,
		WootingAnalogCallback,
		WootingAnalog_KeycodeType,
	},
	standard_types: {
		ushort,
		ushort_Ptr,
		float,
		float_Ptr,
	},
}
