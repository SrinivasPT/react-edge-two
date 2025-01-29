export class StateActions {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    initializeForm({ config, data, internal }) {
        this.dispatch({
            type: 'INITIALIZE_DATA',
            payload: { config, data, internal },
        });
    }

    setInternal(internal) {
        this.dispatch({
            type: 'SET_INTERNAL',
            payload: internal,
        });
    }

    setControlValue(dataPath, value) {
        this.dispatch({
            type: 'CONTROL_VALUE_CHANGE',
            payload: { dataPath, value },
        });
    }

    setErrors(dataPath, value) {
        this.dispatch({
            type: 'SET_ERRORS',
            payload: { dataPath, value },
        });
    }
}
