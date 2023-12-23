// internReducer.js
const initialState = {
  interns: [],
};

const internReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INTERNS':
      return {
        ...state,
        interns: action.payload,
      };
    case 'ADD_INTERN':
      return {
        ...state,
        interns: [...state.interns, action.payload],
      };
    case 'UPDATE_INTERN':
      return {
        ...state,
        interns: state.interns.map((intern) =>
          intern.id === action.payload.id ? action.payload : intern
        ),
      };
    case 'DELETE_INTERN':
      return {
        ...state,
        interns: state.interns.filter((intern) => intern.id !== action.payload),
      };
    default:
      return state;
  }
};

export default internReducer;
