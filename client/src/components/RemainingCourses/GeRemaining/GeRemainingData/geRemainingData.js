import { geReqData } from '../../../Requirements/GeRequirements/GeReqData';
import { geHistoryData } from '../../../History/GeHistory/GeHistoryData';

const getGeRemaining = () => {
  let geEUnitCount = 0;
  let geFUnitCount = 0;

  const compareEandFcategories = (reqCourse, completedCourse) => {
    // loop through all category E completed courses and check if user has finished 3 units of E
    if (
      completedCourse.designation === 'E' &&
      (reqCourse.designation === completedCourse.designation ||
        reqCourse.designation === completedCourse.additionalReq)
    ) {
      geEUnitCount += completedCourse.units;
      return geEUnitCount === 3;
    } else if (
      // loop through all category F completed courses and check if user has finished 9 units of F
      completedCourse.designation === 'F' &&
      (reqCourse.designation === completedCourse.designation ||
        reqCourse.designation === completedCourse.additionalReq)
    ) {
      geFUnitCount += completedCourse.units;
      return geFUnitCount === 9;
    } else {
      // return if not E or F category
      return (
        reqCourse.designation === completedCourse.designation ||
        reqCourse.designation === completedCourse.additionalReq
      );
    }
  };

  const addToRemaining = (reqCourse) => {
    return !geHistoryData.some((completedCourse) =>
      compareEandFcategories(reqCourse, completedCourse),
    );
  };

  const geRemaining = geReqData.filter((reqCourse) =>
    addToRemaining(reqCourse),
  );

  return { geEUnitCount, geFUnitCount, geRemaining };
};

export default getGeRemaining;
