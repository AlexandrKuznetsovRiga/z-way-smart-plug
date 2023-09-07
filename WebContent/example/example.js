$(document).ready(function() {
	$("#form1").alpaca({
		"schema" : {
			"type" : "object",
			"properties" : {
				/*
				 * "daysOfRest" : { "type" : "array", "items" : { "field" :
				 * "enum", "enum" : [ 0, 1, 2, 3, 4, 5, 6 ], "required" : true } },
				 */
				"lights" : {
					"type" : "array",
					"items" : {
						"field" : "enum",
						"datasource" : "namespaces",
						"enum" : "namespaces:devices_switchBinary:deviceId,namespaces:devices_switchMultilevel:deviceId",
						"required" : true
					}
				},
				"motions" : {
					"type" : "array",
					"items" : {
						"field" : "enum",
						"datasource" : "namespaces",
						"enum" : "namespaces:devices_sensorBinary:deviceId,namespaces:devices_switchControl:deviceId",
						"required" : true
					}
				},
				"motionOffTimeout" : {
					"type" : "number",
					"required" : true
				},
				"luminance" : {
					"field" : "enum",
					"datasource" : "namespaces",
					"enum" : "namespaces:devices_sensorMultilevel:deviceId",
					"required" : false
				},
				"luminanceThreshold" : {
					"type" : "number",
					"required" : true
				},
				"rescueOffTimeout" : {
					"type" : "number",
					"required" : true
				}
			},
			"required" : false
		},
		"options" : {
			
//			 "fields" : { "daysOfRest" : { "label" : "__l_daysOfRest__",
//			  "fields" : { "item" : { "label" : "", "field" : "optionLabels",
//			  "optionLabels" : [ "Monday", "Tuesday", "Wendsday", "Thirsday",
//			  "Friday", "Saturday", "Sunday" ] } } },
			 
			"lights" : {
				"label" : "__l_lights__",
				"fields" : {
					"item" : {
						"label" : "",
						"datasource" : "namespaces",
						"field" : "optionLabels",
						"optionLabels" : "namespaces:devices_switchBinary:deviceName,namespaces:devices_switchMultilevel:deviceName"
					}
				}
			},
			"motions" : {
				"label" : "__l_motions__",
				"fields" : {
					"item" : {
						"label" : "",
						"datasource" : "namespaces",
						"field" : "optionLabels",
						"optionLabels" : "namespaces:devices_sensorBinary:deviceName,namespaces:devices_switchControl:deviceName"
					}
				}
			},
			"motionOffTimeout" : {
				"label" : "__l_motionOffTimeout__"
			},
			"luminance" : {
				"label" : "__l_luminance__",
				"datasource" : "namespaces",
				"field" : "optionLabels",
				"optionLabels" : "namespaces:devices_sensorMultilevel:deviceName"
			},
			"luminanceThreshold" : {
				"label" : "__l_luminanceThreshold__"
			},
			"rescueOffTimeout" : {
				"label" : "__l_rescueOffTimeout__"
			}
		}
	});
});