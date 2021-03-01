/*
export default (state, action) => {
    switch(action.type) {
      case 'DELETE_COURSE':
        return {
          ...state,
          userCourses: state.userCourses.filter(course => course.courseID !== action.payload)
        }
      case 'ADD_COURSE':
        return {
          ...state,
          userCourses: [action.payload, ...state.userCourses, ]
        }
      case 'UPDATE_COURSE':
        return {
          ...state,
          
        }
      default:
        return state;
    }
  }
  */