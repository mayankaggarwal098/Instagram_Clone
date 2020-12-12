export const initialState = null;

export const reducer = (state, action) => {
  if (action.type === "USER") return action.payload;

  if (action.type === "DELETE") return null;

  if (action.type === "UPDATE") {
    const { followers, following } = action.payload;
    return {
      ...state,
      followers,
      following,
    };
  }
  if (action.type === "UPDATEPROFILEPIC") {
    return {
      ...state,
      profilePic: action.payload,
    };
  }
  return state;
};
