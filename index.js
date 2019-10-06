const ffi = require('ffi');
const ref = require('ref');
const StructType = require('ref-struct');

const platform = (require('os')).platform();
if (platform === 'win32'){
    woot_loc = './wrapper/wooting_analog_wrapper.dll';
}else if(platform === 'linux'){
    woot_loc = './wrapper/libwooting_analog_wrapper.so';
}else if(platform === 'darwin'){
    woot_loc = './wrapper/libwooting_analog_wrapper.dylib';
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
    vendor_id: ref.types.uint16,
    product_id: ref.types.uint16,
    manufacturer_name: ref.types.CString,
    device_name: ref.types.CString,
    device_id: WootingAnalog_DeviceID,
});
const WootingAnalog_DeviceInfo_Ptr = ref.refType(WootingAnalog_DeviceInfo);
const WootingAnalog_DeviceEventType = ref.types.int;
const WootingAnalogCallback = ffi.Function(ref.types.void, [
	WootingAnalog_DeviceEventType,
	WootingAnalog_DeviceInfo_Ptr,
]);
const WootingAnalog_KeycodeType = ref.types.int;

const wooting_analog_wrapper = ffi.Library(__dirname + woot_loc, {
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
			ushort,
			float,
			ref.types.uint,
		]
	],
	'wooting_analog_read_full_buffer_device': [
		ref.types.int,
		[
			ushort,
			float,
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
		const result = wooting_analog_wrapper.wooting_analog_clear_device_event_cb();

		if (result !== WootingAnalogResult_Enum.Ok) throw Error(getError(WootingAnalogResult_Enum, result));

		return result;
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
		const result = wooting_analog_wrapper.wooting_analog_get_connected_devices_info(device_info, length);

		if (result < 0) throw Error(getError(WootingAnalogResult_Enum, result));

		return result;
	}

	/**
	 * Initilizes the Wooting Analog Wrapper
	 *
	 * @returns { WootingAnalogResult } The result of the function
	 * @memberof wooting_analog
	 */
	initialise() {
		const result = wooting_analog_wrapper.wooting_analog_initialise();

		if (result !== WootingAnalogResult_Enum.Ok) throw Error(getError(WootingAnalogResult_Enum, result));

		return result;
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
		const result = wooting_analog_wrapper.wooting_analog_read_analog(keyCode);

		if (result < 0 || result > 1) throw Error(getError(WootingAnalogResult_Enum, result));

		return result;
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
		const result = wooting_analog_wrapper.wooting_analog_read_analog_device(keyCode, device_id);

		if (result < 0 || result > 1) throw Error(getError(WootingAnalogResult_Enum, result));

		return result;
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
		const result = wooting_analog_wrapper.wooting_analog_read_full_buffer(code_buffer, analog_buffer, length);

		if (result < 0 || result > 1) throw Error(getError(WootingAnalogResult_Enum, result));

		return result;
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
		const result = wooting_analog_wrapper.wooting_analog_read_full_buffer_device(code_buffer, analog_buffer, length, device_id);

		if (result < 0 || result > 1) throw Error(getError(WootingAnalogResult_Enum, result));

		return result;
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

		this.ffi_callback.reinterpret();

		const result = wooting_analog_wrapper.wooting_analog_set_device_event_cb(this.ffi_callback);

		if (result !== WootingAnalogResult_Enum.Ok) throw Error(getError(WootingAnalogResult_Enum, result));

		return result;
	}

	/**
	 * Set the key mode of the device
	 *
	 * @param { WootingAnalog_KeycodeType } mode The mode you want to set the device to
	 * @returns { WootingAnalogResult }
	 * @memberof wooting_analog
	 */
	set_keycode_mode(mode) {
		const result = wooting_analog_wrapper.wooting_analog_set_keycode_mode(mode);

		if (result !== WootingAnalogResult_Enum.Ok) throw Error(getError(WootingAnalogResult_Enum, result));

		return result;
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

/**
 * Get the Enum Error name for a given value
 *
 * @param { Object } objectEnum The enum to search through
 * @param { * } value Value to resolve
 * @returns { String }
 */
function getError(objectEnum, value) {
	return Object.keys(objectEnum).find(key => objectEnum[key] === value) || 'Not implemented Error code';
}

const WootingAnalogResult_Enum = {
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
}

const DeviceEventType_Enum = {
	/// Device has been connected
	Connected: 1,
	/// Device has been disconnected
	Disconnected: 2,
};

const KeycodeType_Enum = {
	/// USB HID Keycodes https://www.usb.org/document-library/hid-usage-tables-112 pg53
	HID: 0,
	/// Scan code set 1
	ScanCode1: 1,
	/// Windows Virtual Keys
	VirtualKey: 2,
	/// Windows Virtual Keys which are translated to the current keyboard locale
	VirtualKeyTranslate: 3,
};

const VirtualKey_Enum = {
	LeftButton: 0x01,
	RightButton: 0x02,
	Cancel: 0x03,
	MiddleButton: 0x04,
	ExtraButton1: 0x05,
	ExtraButton2: 0x06,
	Back: 0x08,
	Tab: 0x09,
	Clear: 0x0C,
	Return: 0x0D,
	Shift: 0x10,
	Control: 0x11,
	Menu: 0x12,
	Pause: 0x13,
	CapsLock: 0x14,
	Kana: 0x15,
	Hangeul: 0x15,
	Hangul: 0x15,
	Junja: 0x17,
	Final: 0x18,
	Hanja: 0x19,
	Kanji: 0x19,
	Escape: 0x1B,
	Convert: 0x1C,
	NonConvert: 0x1D,
	Accept: 0x1E,
	ModeChange: 0x1F,
	Space: 0x20,
	Prior: 0x21,
	Next: 0x22,
	End: 0x23,
	Home: 0x24,
	Left: 0x25,
	Up: 0x26,
	Right: 0x27,
	Down: 0x28,
	Select: 0x29,
	Print: 0x2A,
	Execute: 0x2B,
	Snapshot: 0x2C,
	Insert: 0x2D,
	Delete: 0x2E,
	Help: 0x2F,
	N0: 0x30,
	N1: 0x31,
	N2: 0x32,
	N3: 0x33,
	N4: 0x34,
	N5: 0x35,
	N6: 0x36,
	N7: 0x37,
	N8: 0x38,
	N9: 0x39,
	A: 0x41,
	B: 0x42,
	C: 0x43,
	D: 0x44,
	E: 0x45,
	F: 0x46,
	G: 0x47,
	H: 0x48,
	I: 0x49,
	J: 0x4A,
	K: 0x4B,
	L: 0x4C,
	M: 0x4D,
	N: 0x4E,
	O: 0x4F,
	P: 0x50,
	Q: 0x51,
	R: 0x52,
	S: 0x53,
	T: 0x54,
	U: 0x55,
	V: 0x56,
	W: 0x57,
	X: 0x58,
	Y: 0x59,
	Z: 0x5A,
	LeftWindows: 0x5B,
	RightWindows: 0x5C,
	Application: 0x5D,
	Sleep: 0x5F,
	Numpad0: 0x60,
	Numpad1: 0x61,
	Numpad2: 0x62,
	Numpad3: 0x63,
	Numpad4: 0x64,
	Numpad5: 0x65,
	Numpad6: 0x66,
	Numpad7: 0x67,
	Numpad8: 0x68,
	Numpad9: 0x69,
	Multiply: 0x6A,
	Add: 0x6B,
	Separator: 0x6C,
	Subtract: 0x6D,
	Decimal: 0x6E,
	Divide: 0x6F,
	F1: 0x70,
	F2: 0x71,
	F3: 0x72,
	F4: 0x73,
	F5: 0x74,
	F6: 0x75,
	F7: 0x76,
	F8: 0x77,
	F9: 0x78,
	F10: 0x79,
	F11: 0x7A,
	F12: 0x7B,
	F13: 0x7C,
	F14: 0x7D,
	F15: 0x7E,
	F16: 0x7F,
	F17: 0x80,
	F18: 0x81,
	F19: 0x82,
	F20: 0x83,
	F21: 0x84,
	F22: 0x85,
	F23: 0x86,
	F24: 0x87,
	NumLock: 0x90,
	ScrollLock: 0x91,
	NEC_Equal: 0x92,
	Fujitsu_Jisho: 0x92,
	Fujitsu_Masshou: 0x93,
	Fujitsu_Touroku: 0x94,
	Fujitsu_Loya: 0x95,
	Fujitsu_Roya: 0x96,
	LeftShift: 0xA0,
	RightShift: 0xA1,
	LeftControl: 0xA2,
	RightControl: 0xA3,
	LeftMenu: 0xA4,
	RightMenu: 0xA5,
	BrowserBack: 0xA6,
	BrowserForward: 0xA7,
	BrowserRefresh: 0xA8,
	BrowserStop: 0xA9,
	BrowserSearch: 0xAA,
	BrowserFavorites: 0xAB,
	BrowserHome: 0xAC,
	VolumeMute: 0xAD,
	VolumeDown: 0xAE,
	VolumeUp: 0xAF,
	MediaNextTrack: 0xB0,
	MediaPrevTrack: 0xB1,
	MediaStop: 0xB2,
	MediaPlayPause: 0xB3,
	LaunchMail: 0xB4,
	LaunchMediaSelect: 0xB5,
	LaunchApplication1: 0xB6,
	LaunchApplication2: 0xB7,
	OEM1: 0xBA,
	OEMPlus: 0xBB,
	OEMComma: 0xBC,
	OEMMinus: 0xBD,
	OEMPeriod: 0xBE,
	OEM2: 0xBF,
	OEM3: 0xC0,
	OEM4: 0xDB,
	OEM5: 0xDC,
	OEM6: 0xDD,
	OEM7: 0xDE,
	OEM8: 0xDF,
	OEMAX: 0xE1,
	OEM102: 0xE2,
	ICOHelp: 0xE3,
	ICO00: 0xE4,
	ProcessKey: 0xE5,
	ICOClear: 0xE6,
	Packet: 0xE7,
	OEMReset: 0xE9,
	OEMJump: 0xEA,
	OEMPA1: 0xEB,
	OEMPA2: 0xEC,
	OEMPA3: 0xED,
	OEMWSCtrl: 0xEE,
	OEMCUSel: 0xEF,
	OEMATTN: 0xF0,
	OEMFinish: 0xF1,
	OEMCopy: 0xF2,
	OEMAuto: 0xF3,
	OEMENLW: 0xF4,
	OEMBackTab: 0xF5,
	ATTN: 0xF6,
	CRSel: 0xF7,
	EXSel: 0xF8,
	EREOF: 0xF9,
	Play: 0xFA,
	Zoom: 0xFB,
	Noname: 0xFC,
	PA1: 0xFD,
	OEMClear: 0xFE,
};

module.exports = {
	wooting_analog: new wooting_analog(),
	WootingAnalogResult: WootingAnalogResult_Enum,
	DeviceEventType: DeviceEventType_Enum,
	KeycodeType: KeycodeType_Enum,
	types: {
		WootingAnalogResult,
		WootingAnalog_DeviceID,
		WootingAnalog_DeviceInfo,
		WootingAnalog_DeviceInfo_Ptr,
		WootingAnalog_DeviceEventType,
		WootingAnalogCallback,
		WootingAnalog_KeycodeType,
		ushort,
		ushort_Ptr,
		float,
		float_Ptr,
	},
	VirtualKey: VirtualKey_Enum,
}
