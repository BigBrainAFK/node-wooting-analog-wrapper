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

/**
 * USB HID Keyboard scan codes as per USB spec 1.11
 * plus some additional codes
 * 
 * Created by MightyPork, 2016
 * Edited by BigBrainAFK, 2019
 * Public domain
 * 
 * Adapted from:
 * https://source.android.com/devices/input/keyboard-devices.html
 */

const ScanCodes_Enum = {
	None: 0x00, // No key pressed
	Err_Ovf: 0x01, //  Keyboard Error Roll Over - used for all slots if too many keys are pressed ("Phantom key")
	//: 0x02, //  Keyboard POST Fail
	//: 0x03, //  Keyboard Error Undefined
	A: 0x04, // Keyboard a and A
	B: 0x05, // Keyboard b and B
	C: 0x06, // Keyboard c and C
	D: 0x07, // Keyboard d and D
	E: 0x08, // Keyboard e and E
	F: 0x09, // Keyboard f and F
	G: 0x0a, // Keyboard g and G
	H: 0x0b, // Keyboard h and H
	I: 0x0c, // Keyboard i and I
	J: 0x0d, // Keyboard j and J
	K: 0x0e, // Keyboard k and K
	L: 0x0f, // Keyboard l and L
	M: 0x10, // Keyboard m and M
	N: 0x11, // Keyboard n and N
	O: 0x12, // Keyboard o and O
	P: 0x13, // Keyboard p and P
	Q: 0x14, // Keyboard q and Q
	R: 0x15, // Keyboard r and R
	S: 0x16, // Keyboard s and S
	T: 0x17, // Keyboard t and T
	U: 0x18, // Keyboard u and U
	V: 0x19, // Keyboard v and V
	W: 0x1a, // Keyboard w and W
	X: 0x1b, // Keyboard x and X
	Y: 0x1c, // Keyboard y and Y
	Z: 0x1d, // Keyboard z and Z
	1: 0x1e, // Keyboard 1 and !
	2: 0x1f, // Keyboard 2 and @
	3: 0x20, // Keyboard 3 and #
	4: 0x21, // Keyboard 4 and $
	5: 0x22, // Keyboard 5 and %
	6: 0x23, // Keyboard 6 and ^
	7: 0x24, // Keyboard 7 and &
	8: 0x25, // Keyboard 8 and *
	9: 0x26, // Keyboard 9 and (
	0: 0x27, // Keyboard 0 and )
	Enter: 0x28, // Keyboard Return (ENTER)
	Esc: 0x29, // Keyboard ESCAPE
	Backspace: 0x2a, // Keyboard DELETE (Backspace)
	Tab: 0x2b, // Keyboard Tab
	Space: 0x2c, // Keyboard Spacebar
	Minus: 0x2d, // Keyboard - and _
	Equal: 0x2e, // Keyboard = and +
	Leftbrace: 0x2f, // Keyboard [ and {
	Rightbrace: 0x30, // Keyboard ] and }
	Backslash: 0x31, // Keyboard \ and |
	Hashtilde: 0x32, // Keyboard Non-US # and ~
	Semicolon: 0x33, // Keyboard ; and :
	Apostrophe: 0x34, // Keyboard ' and "
	Grave: 0x35, // Keyboard ` and ~
	Comma: 0x36, // Keyboard , and <
	Dot: 0x37, // Keyboard . and >
	Slash: 0x38, // Keyboard / and ?
	Capslock: 0x39, // Keyboard Caps Lock
	F1: 0x3a, // Keyboard F1
	F2: 0x3b, // Keyboard F2
	F3: 0x3c, // Keyboard F3
	F4: 0x3d, // Keyboard F4
	F5: 0x3e, // Keyboard F5
	F6: 0x3f, // Keyboard F6
	F7: 0x40, // Keyboard F7
	F8: 0x41, // Keyboard F8
	F9: 0x42, // Keyboard F9
	F10: 0x43, // Keyboard F10
	F11: 0x44, // Keyboard F11
	F12: 0x45, // Keyboard F12
	PrintScr: 0x46, // Keyboard Print Screen
	ScrollLock: 0x47, // Keyboard Scroll Lock
	Pause: 0x48, // Keyboard Pause
	Inser: 0x49, // Keyboard Insert
	Home: 0x4a, // Keyboard Home
	PageUp: 0x4b, // Keyboard Page Up
	Delete: 0x4c, // Keyboard Delete Forward
	End: 0x4d, // Keyboard End
	PageDown: 0x4e, // Keyboard Page Down
	Right: 0x4f, // Keyboard Right Arrow
	Left: 0x50, // Keyboard Left Arrow
	Down: 0x51, // Keyboard Down Arrow
	Up: 0x52, // Keyboard Up Arrow
	NumLock: 0x53, // Keyboard Num Lock and Clear
	KP_Slash: 0x54, // Keypad /
	KP_Asterisk: 0x55, // Keypad *
	KP_Minus: 0x56, // Keypad -
	KP_Plus: 0x57, // Keypad +
	KP_Enter: 0x58, // Keypad ENTER
	KP_1: 0x59, // Keypad 1 and End
	KP_2: 0x5a, // Keypad 2 and Down Arrow
	KP_3: 0x5b, // Keypad 3 and PageDn
	KP_4: 0x5c, // Keypad 4 and Left Arrow
	KP_5: 0x5d, // Keypad 5
	KP_6: 0x5e, // Keypad 6 and Right Arrow
	KP_7: 0x5f, // Keypad 7 and Home
	KP_8: 0x60, // Keypad 8 and Up Arrow
	KP_9: 0x61, // Keypad 9 and Page Up
	KP_0: 0x62, // Keypad 0 and Insert
	KP_Dot: 0x63, // Keypad . and Delete
	NonUS: 0x64, // Keyboard Non-US \ and |
	Compose: 0x65, // Keyboard Application
	Power: 0x66, // Keyboard Power
	KP_Equal: 0x67, // Keypad =
	F13: 0x68, // Keyboard F13
	F14: 0x69, // Keyboard F14
	F15: 0x6a, // Keyboard F15
	F16: 0x6b, // Keyboard F16
	F17: 0x6c, // Keyboard F17
	F18: 0x6d, // Keyboard F18
	F19: 0x6e, // Keyboard F19
	F20: 0x6f, // Keyboard F20
	F21: 0x70, // Keyboard F21
	F22: 0x71, // Keyboard F22
	F23: 0x72, // Keyboard F23
	F24: 0x73, // Keyboard F24
	Open: 0x74, // Keyboard Execute
	Help: 0x75, // Keyboard Help
	Props: 0x76, // Keyboard Menu
	Front: 0x77, // Keyboard Select
	Stop: 0x78, // Keyboard Stop
	Again: 0x79, // Keyboard Again
	Undo: 0x7a, // Keyboard Undo
	Cut: 0x7b, // Keyboard Cut
	Copy: 0x7c, // Keyboard Copy
	Paste: 0x7d, // Keyboard Paste
	Find: 0x7e, // Keyboard Find
	Mute: 0x7f, // Keyboard Mute
	VolumeUp: 0x80, // Keyboard Volume Up
	VolumeDown: 0x81, // Keyboard Volume Down
	//: 0x82,  Keyboard Locking Caps Lock
	//: 0x83,  Keyboard Locking Num Lock
	//: 0x84,  Keyboard Locking Scroll Lock
	KP_Comma: 0x85, // Keypad Comma
	//: 0x86,  Keypad Equal Sign
	RO: 0x87, // Keyboard International1
	Katakana_Hiragana: 0x88, // Keyboard International2
	Yen: 0x89, // Keyboard International3
	Henkan: 0x8a, // Keyboard International4
	Muhenkan: 0x8b, // Keyboard International5
	KP_JP_Comma: 0x8c, // Keyboard International6
	//: 0x8d,  Keyboard International7
	//: 0x8e,  Keyboard International8
	//: 0x8f,  Keyboard International9
	Hangeul: 0x90, // Keyboard LANG1
	Hanja: 0x91, // Keyboard LANG2
	Katakana: 0x92, // Keyboard LANG3
	Hiragana: 0x93, // Keyboard LANG4
	Zenkaku_Hankaku: 0x94, // Keyboard LANG5
	//: 0x95,  Keyboard LANG6
	//: 0x96,  Keyboard LANG7
	//: 0x97,  Keyboard LANG8
	//: 0x98,  Keyboard LANG9
	//: 0x99,  Keyboard Alternate Erase
	//: 0x9a,  Keyboard SysReq/Attention
	//: 0x9b,  Keyboard Cancel
	//: 0x9c,  Keyboard Clear
	//: 0x9d,  Keyboard Prior
	//: 0x9e,  Keyboard Return
	//: 0x9f,  Keyboard Separator
	//: 0xa0,  Keyboard Out
	//: 0xa1,  Keyboard Oper
	//: 0xa2,  Keyboard Clear/Again
	//: 0xa3,  Keyboard CrSel/Props
	//: 0xa4,  Keyboard ExSel
	//: 0xb0,  Keypad 00
	//: 0xb1,  Keypad 000
	//: 0xb2,  Thousands Separator
	//: 0xb3,  Decimal Separator
	//: 0xb4,  Currency Unit
	//: 0xb5,  Currency Sub-unit
	KP_LeftParen: 0xb6, // Keypad (
	KP_RightParen: 0xb7, // Keypad )
	//: 0xb8,  Keypad {
	//: 0xb9,  Keypad }
	//: 0xba,  Keypad Tab
	//: 0xbb,  Keypad Backspace
	//: 0xbc,  Keypad A
	//: 0xbd,  Keypad B
	//: 0xbe,  Keypad C
	//: 0xbf,  Keypad D
	//: 0xc0,  Keypad E
	//: 0xc1,  Keypad F
	//: 0xc2,  Keypad XOR
	//: 0xc3,  Keypad ^
	//: 0xc4,  Keypad %
	//: 0xc5,  Keypad <
	//: 0xc6,  Keypad >
	//: 0xc7,  Keypad &
	//: 0xc8,  Keypad &&
	//: 0xc9,  Keypad |
	//: 0xca,  Keypad ||
	//: 0xcb,  Keypad :
	//: 0xcc,  Keypad #
	//: 0xcd,  Keypad Space
	//: 0xce,  Keypad @
	//: 0xcf,  Keypad !
	//: 0xd0,  Keypad Memory Store
	//: 0xd1,  Keypad Memory Recall
	//: 0xd2,  Keypad Memory Clear
	//: 0xd3,  Keypad Memory Add
	//: 0xd4,  Keypad Memory Subtract
	//: 0xd5,  Keypad Memory Multiply
	//: 0xd6,  Keypad Memory Divide
	//: 0xd7,  Keypad +/-
	//: 0xd8,  Keypad Clear
	//: 0xd9,  Keypad Clear Entry
	//: 0xda,  Keypad Binary
	//: 0xdb,  Keypad Octal
	//: 0xdc,  Keypad Decimal
	//: 0xdd,  Keypad Hexadecimal
	LCtrl: 0xe0, // Keyboard Left Control
	LShift: 0xe1, // Keyboard Left Shift
	LAlt: 0xe2, // Keyboard Left Alt
	LMeta: 0xe3, // Keyboard Left GUI
	RCtrl: 0xe4, // Keyboard Right Control
	RShift: 0xe5, // Keyboard Right Shift
	RAlt: 0xe6, // Keyboard Right Alt
	RMeta: 0xe7, // Keyboard Right GUI
	Media_PlayPause: 0xe8,
	Media_StopCD: 0xe9,
	Media_PreviousSong: 0xea,
	Media_NextSong: 0xeb,
	Media_Eject: 0xec,
	Media_VolumeUp: 0xed,
	Media_VolumeDown: 0xee,
	Media_Mute: 0xef,
	Media_WWW: 0xf0,
	Media_Back: 0xf1,
	Media_Forwars: 0xf2,
	Media_Stop: 0xf3,
	Media_Find: 0xf4,
	Media_ScrollUp: 0xf5,
	Media_SrollDown: 0xf6,
	Media_Edit: 0xf7,
	Media_Sleep: 0xf8,
	Media_Coffee: 0xf9,
	Media_Refresh: 0xfa,
	Media_Calc: 0xfb,

	// Wooting Keys
	FN: 0x301, // Keyboard FN
};

module.exports = {
	getError,
	WootingAnalogResult_Enum,
	DeviceEventType_Enum,
	KeycodeType_Enum,
	VirtualKey_Enum,
	ScanCodes_Enum,
}