const initUser = {
  user: {},
};

const rootReducer = (state = initUser, action) => {
  switch (action.type) {
    case "DELETE_USER":
      return {
        ...state,
        user: {},
      };

    case "ADD_USER":
      return {
        ...state,
        user: { ...action.payload },
      };

    default:
      return state;
  }
};

export default rootReducer;
