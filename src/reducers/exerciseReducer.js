// reducers/exerciseReducer.js
const initialState = {
  exercises: [],
  users: [],
};

const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EXERCISES':
      return { ...state, exercises: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default exerciseReducer;
