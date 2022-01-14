  
  const initialState = {
      openBooks: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case "SET_BOOK":
        return {
          ...state,
          openBooks: action.payload
        };
      default:
        return state;
    }
  }
  
