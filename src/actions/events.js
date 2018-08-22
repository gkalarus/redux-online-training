import * as constants from '../constants';

export function clearEvents() {
    return {
        type: constants.EVENTS_CLEAR
    };
}

export function deleteEvent(eventId) {
    return {
        type: constants.EVENTS_DELETE,
        payload: {
            eventId
        }
    }
}

export function filterEvents(filter) {
    return {
        type: constants.EVENTS_FILTER,
        payload: {
            filter
        }
    }
}