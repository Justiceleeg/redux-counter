// change this to true to see test results on the black diamond section.
export const BLACK_DIAMOND = false;

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const UNDO = 'UNDO';
const REDO = 'REDO';

export function increment(amt){
    return {
        type: INCREMENT,
        payload: amt
    }
}

export function decrement(amt){
    return {
        type: DECREMENT,
        payload: amt
    }
}

export function undo(){
    return {
        type: UNDO
    }
}

export function redo(){
    return {
        type: REDO
    }
}

// ALWAYS put a default value on initial state - for yourself to know what props the store has
var initialState = {
    currentValue: 0,
    futureValues: [],
    previousValues: []
}

function reducer(state = initialState, action) {

    // state = Object.assign(state, {lastAction: action} )

    switch(action.type){
        case INCREMENT:
			return {
				  currentValue: state.currentValue + action.payload
				, futureValues: []
				, previousValues: [ state.currentValue, ...state.previousValues ]
			};
		case DECREMENT:
			return {
				  currentValue: state.currentValue - action.payload
				, futureValues: []
				, previousValues: [ state.currentValue, ...state.previousValues ]
			};
		case UNDO:
			return {
				  currentValue: state.previousValues[ 0 ]
				, futureValues: [ state.currentValue, ...state.futureValues ]
				, previousValues: state.previousValues.slice( 1, state.previousValues.length )
			};
		case REDO:
			return {
				  currentValue: state.futureValues[ 0 ]
				, futureValues: state.futureValues.slice( 1, state.futureValues.length )
				, previousValues: [ state.currentValue, ...state.previousValues ]
			};
        default:
            return state
    }
}

export default reducer;