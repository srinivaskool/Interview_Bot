  export const loginRedirectReducer = (state = "/", action) => {
    switch (action.type) {
      case "LOGIN_REDIRECT":
        return action.payload;
      default:
        return state;
    }
  };
