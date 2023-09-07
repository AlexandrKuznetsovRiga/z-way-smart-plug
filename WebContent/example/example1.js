function LightMotionRockerAutocontrol() {

}
function wdStyle() {
	var sel = "div[name=daysOfRest]";
	$(sel).each(function() {
		alert(1);
		console.log("A");
		$(this).css("display", "inline-block");
		$(this).attr("xxx", "yyy");

	});
}

function LightMotionRockerAutocontrolwdSort(a, b) {
	if (a.value == b.value)
		return 0;
	if (a.value < b.value)
		return -1;
	return 1;
}

$("#form1").alpaca({
	"schema" : {
		"type" : "object",
		"properties" : {
			"daysOfRest" : {
				"type" : "array",
				"enum" : [ 0, 1, 2, 3, 4, 5, 6 ]
			},
			"dayTimeStartRest" : {
				"pattern" : "[0-9]{1,2}:[0-9]{1,2}"
			},
			"dayTimeEndRest" : {
				"pattern" : "[0-9]{1,2}:[0-9]{1,2}"
			},
			"dayTimeStartWork" : {
				"pattern" : "[0-9]{1,2}:[0-9]{1,2}"
			},
			"dayTimeEndWork" : {
				"pattern" : "[0-9]{1,2}:[0-9]{1,2}"
			},
			"holidays" : {},
			"dayTimeLightLevel" : {
				"maximum" : 100,
				"minimum" : 0,
			},
			"nightTimeLightLevel" : {
				"maximum" : 100,
				"minimum" : 0,
			},

		},

	},
	"options" : {
		"fields" : {
			"daysOfRest" : {
				"label" : "__l_daysOfRest__",
				"type" : "checkbox",
				"fieldClass" : "eee",
				"optionLabels" : [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
				"sort" : LightMotionRockerAutocontrolwdSort,
				"events" : {
					"ready" : ""
				}
			},
			"dayTimeStartRest" : {
				"label" : "__l_dayTimeStartRest",
				"helper" : "Enter time HH:MM",
				"type" : "text",
				"placeholder" : "10:00",
				"hideInitValidationError" : "true"

			},
			"dayTimeEndRest" : {
				"label" : "__l_dayTimeEndRest",
				"helper" : "Enter time HH:MM",
				"placeholder" : "23:00",

			},
			"dayTimeStartWork" : {
				"label" : "__l_dayTimeStartWork",
				"helper" : "Enter time HH:MM",
				"placeholder" : "08:00",

			},
			"dayTimeEndWork" : {
				"label" : "__l_dayTimeEndWork",
				"helper" : "Enter time HH:MM",
				"placeholder" : "23:00",

			},
			"holidays" : {
				"label" : "__l_holidays",
				"type" : "textarea",
				"helper" : "Enter comma separated dates in format YYYY-MM-DD",
			},
			"dayTimeLightLevel" : {
				"label" : "__l_dayTimeLightLevel",
				"type" : "number",
				"helper" : "Enter light dimmer level 0-100",
			},
			"nightTimeLightLevel" : {
				"label" : "__l_dayTimeLightLevel",
				"type" : "number",
				"helper" : "Enter light dimmer level 0-100",
				"validate" : "true",
			},
		}
	},
	"view" : {
		"fields" : {
			"dayTimeStartRest" : {

			},
		}
	}
});
