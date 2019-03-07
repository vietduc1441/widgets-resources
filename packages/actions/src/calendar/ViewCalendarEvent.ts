// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import AddCalendarEventLib from "react-native-add-calendar-event";

function ViewCalendarEvent(eventId?: string): Promise<boolean> {
    // BEGIN USER CODE
    // Documentation https://github.com/vonovak/react-native-add-calendar-event#viewing-an-event

    const AddCalendarEvent: typeof AddCalendarEventLib = require("react-native-add-calendar-event");

    if (!eventId) {
        throw new TypeError("Input parameter 'Event id' is required");
    }

    return AddCalendarEvent.presentEventViewingDialog({
        eventId,
        allowsEditing: true,
        allowsCalendarPreview: true
    }).then(() => true);

    // END USER CODE
}
