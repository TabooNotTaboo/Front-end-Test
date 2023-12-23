
export const setInterns = (interns) => ({
  type: 'SET_INTERNS',
  payload: interns,
});

export const addIntern = (intern) => ({
  type: 'ADD_INTERN',
  payload: intern,
});

export const updateIntern = (intern) => ({
  type: 'UPDATE_INTERN',
  payload: intern,
});

export const deleteIntern = (internId) => ({
  type: 'DELETE_INTERN',
  payload: internId,
});