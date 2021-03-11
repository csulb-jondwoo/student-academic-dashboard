const AppReducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_COURSE':
      return {
        ...state,
        userCourses: state.userCourses.filter(
          (course) => course._id !== action.payload
        ),
      };
    case 'ADD_CURRENT_COURSE':
      return {
        ...state,
        currentCourses: [...state.currentCourses, action.payload],
      };
    case 'ADD_COMPLETED_COURSE':
      return {
        ...state,
        completedCourses: [...state.completedCourses, action.payload],
      };
    case 'UPDATE_COURSE':
      return {
        ...state,
      };
    case 'GET_CURRENT_COURSES':
      return {
        ...state,
        loading: false,
        currentCourses: action.payload,
      };
    case 'GET_COMPLETED_COURSES':
      return {
        ...state,
        loading: false,
        completedCourses: action.payload,
      };
    case 'COURSE_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
