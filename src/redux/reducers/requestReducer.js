const initialState = [];

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    // для больших проектов я использую переменные со значениями type, вместо строк, чтобы избежать ошибки, но
    // при всего двух action, думаю, можно и так
    case 'SET_REQUEST':
      return [...state, action.payload];
    case 'INCREMENT_REQUEST_COUNTERS':
      const newState = [...state];
      let updatedRequestIndex = newState.findIndex((request) => request.id === action.id);
      // likes condition
      if (newState[updatedRequestIndex].likes.current < newState[updatedRequestIndex].likes.max) {
        newState[updatedRequestIndex] = {
          ...newState[updatedRequestIndex],
          likes: {
            ...newState[updatedRequestIndex].likes,
            current: newState[updatedRequestIndex].likes.current + 1,
          },
        };
      }
      // reposts condition
      if (
        newState[updatedRequestIndex].reposts.current < newState[updatedRequestIndex].reposts.max
      ) {
        newState[updatedRequestIndex] = {
          ...newState[updatedRequestIndex],
          reposts: {
            ...newState[updatedRequestIndex].reposts,
            current: newState[updatedRequestIndex].reposts.current + 1,
          },
        };
      }
      // followers condition
      if (
        newState[updatedRequestIndex].followers.current <
        newState[updatedRequestIndex].followers.max
      ) {
        newState[updatedRequestIndex] = {
          ...newState[updatedRequestIndex],
          followers: {
            ...newState[updatedRequestIndex].followers,
            current: newState[updatedRequestIndex].followers.current + 1,
          },
        };
      }
      return [...newState];
    default:
      return [...state];
  }
};

export default requestReducer;
