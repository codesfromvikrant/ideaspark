import { globalState } from "./globalState";

// Create the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_NOTES_DATA":
      return {
        ...state,
        user: {
          ...state.user,
          notesData: action.payload,
        },
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };
    case "SET_FILTERED_DATA":
      return {
        ...state,
        user: {
          ...state.user,
          filteredData: action.payload,
        },
      };
    case "SET_TRASH":
      return {
        ...state,
        user: {
          ...state.user,
          trash: action.payload,
        },
      };
    case "SET_TAG":
      return {
        ...state,
        tag: action.payload,
      };
    case "SET_TAGS":
      return {
        ...state,
        user: {
          ...state.user,
          tags: action.payload
        }
      }
    case "SET_TAG_DIALOG":
      return {
        ...state,
        tagDialog: action.payload
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;