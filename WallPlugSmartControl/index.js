/*******************************************************************************
 * WallPlugSmartControl Z-Way Home Automation module *
 * 
 * Version: 1.0.1 (c) Z-Wave.Me, 2014
 * 
 * -----------------------------------------------------------------------------
 * Author: Description: This module controls light via rocker, several motion
 * sensors and light sensor. Light can be turned on and off by rocker (always)
 * or by motion sensors (only if light level is high enough and manual control
 * was not performed). A timer turns light off.
 * 
 ******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------
function WallPlugSmartControl(id, controller) {
	// Call superconstructor first (AutomationModule)
	WallPlugSmartControl.super_.call(this, id, controller);

	this.checkUrl = "";
	this.successResponseContains = "";
	this.checkIntervalSec = 60;
	this.useWGet = false;

};

inherits(WallPlugSmartControl, AutomationModule);

_module = WallPlugSmartControl;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

WallPlugSmartControl.prototype.init = function(config) {
	// Call superclass' init (this will process config argument and so on)
	WallPlugSmartControl.super_.prototype.init.call(this, config);
	WallPlugSmartControl.debug("Module init");

	var self = this;
	try {
		this.checkUrl = config.checkUrl;
		this.useWGet = config.useWGet;
		this.successResponseContains = config.successResponseContains;

		this.checkIntervalSec = parseInt(config.checkIntervalSec, 10);

	} catch (error) {
		WallPlugSmartControl.debug(error);
	}

	var interval = this.checkIntervalSec * 1000;

	this.checker = setInterval(function() {
		try {
			WallPlugSmartControl.debug("Call HTTP: " + self.checkUrl);
			if (self.useWGet) {
				var command = "wget --timeout=2 --no-check-certificat -O - -q " + self.checkUrl;
				var result = system(command);				
				if( result === undefined ){
					WallPlugSmartControl.debug("Wget result: undefined");
					return;
				}
				debugPrint("Call of: " + command + "\n\nResult("+result[0]+"):\n", result);
				if( result[0] != 0 ){
					self.changeState(false);
					return;
				}
				var doc = new ZXmlDocument(result[1]);
				var found = doc.findOne(self.successResponseContains);
				if (found) {
					self.changeState(true);
				} else {
					self.changeState(false);
				}
			} else {
				http.request({
					url : self.checkUrl,
					method : "GET",
					async : true,
					success : function(r) {
						WallPlugSmartControl.debug("HTTP call success! " + r.contentType);
						if (r.status == 200) {
							if (r.data instanceof ZXmlDocument) {

								var found = r.data.findOne(self.successResponseContains);
								WallPlugSmartControl.debug("Received data is XML, search [" + self.successResponseContains + "] found ["
										+ found + "]");
								if (found) {
									self.changeState(true);
								} else {
									self.changeState(false);
								}
							} else {
								if (r.data.indexOf(self.successResponseContains) != -1) {
									self.changeState(true);
								} else {
									self.changeState(false);
								}

							}
						} else {
							self.changeState(false);
						}
					},
					error : function(r) {
						WallPlugSmartControl.debug("HTTP call ERROR!" + r.status);
						self.changeState(false);
					}
				});
			}
			// WallPlugSmartControl.debug("Call HTTP finisged ");
		} catch (e) {
			WallPlugSmartControl.debug("Interval ckeck fail", e);
		}

	}, interval);
	WallPlugSmartControl.debug("Module initialized, interval: " + interval);

};

WallPlugSmartControl.prototype.stop = function() {
	WallPlugSmartControl.super_.prototype.stop.call(this);

	var self = this;

	if (this.checker) {
		clearInterval(this.checker);
	}
};
// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

WallPlugSmartControl.prototype.changeState = function(flag) {
	var self = this;

	self.config.switches.forEach(function(device) {
		var vDev = self.controller.devices.get(device);
		if (vDev) {
			try {
				var level = vDev.get("metrics").level;
				WallPlugSmartControl.debug("Device is: " + level + ", flag: " + flag);
				if (flag && level == "off") {
					vDev.performCommand("on");
				} else if (!flag && level == "on") {
					vDev.performCommand("off");
				}

			} catch (e) {
				WallPlugSmartControl.debug("Interval ckeck fail", e);
			}
		}
	});
};

WallPlugSmartControl.debug = function(str, err) {
	if (str) {
		if (err) {
			if (err.stack) {
				debugPrint("[WallPlugSmartControl] " + str, err.stack);
			} else {
				debugPrint("[WallPlugSmartControl] " + str, err);
			}
		} else {
			debugPrint("[WallPlugSmartControl]", str);
		}
	}
}
