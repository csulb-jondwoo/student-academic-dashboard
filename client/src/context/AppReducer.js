export default (state, action) => {
    switch(action.type) {
      case 'DELETE_COURSE':
        return {
          ...state,
          userCourses: state.userCourses.filter(course => course._id !== action.payload)
        }
      case 'ADD_COURSE':
        return {
          ...state,
          courses: [...state.courses, action.payload]
        }
      case 'UPDATE_COURSE':
        return {
          ...state,
          
        }
      case 'GET_COURSES':
        return {
          ...state,
          loading: false,
          courses: action.payload
        }
      case 'COURSE_ERROR':
        return {
            ...state,
            error: action.payload
        }
      default:
        return state;
    }
}