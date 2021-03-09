import { geReqData } from '../../../Requirements/GeRequirements/GeReqData';
import { geHistoryData } from '../../../History/GeHistory/GeHistoryData';

const getGeRemaining = () => {
  const CAT_A = 9;
  const CAT_B = 11;
  const CAT_C = 9;
  const CAT_D = 9;
  const CAT_E = 3;
  const CAT_F = 9;
  const CAT_ADDITIONAL_REQ = 6;

  let geAUnitCount = 0;
  let geBUnitCount = 0;
  let geCUnitCount = 0;
  let geDUnitCount = 0;
  let geEUnitCount = 0;
  let geFUnitCount = 0;
  let geAdditionalReqUnitCount = 0;

  for (const course of geHistoryData) {
    switch (course.category) {
      case 'A':
        if (
          course.additionalReq === 'Global Issues' ||
          course.additionalReq === 'Human Diversity'
        ) {
          geAdditionalReqUnitCount += course.units;
        }
        geAUnitCount += course.units;
        break;
      case 'B':
        if (
          course.additionalReq === 'Global Issues' ||
          course.additionalReq === 'Human Diversity'
        ) {
          geAdditionalReqUnitCount += course.units;
        }
        geBUnitCount += course.units;
        break;
      case 'C':
        if (
          course.additionalReq === 'Global Issues' ||
          course.additionalReq === 'Human Diversity'
        ) {
          geAdditionalReqUnitCount += course.units;
        }
        geCUnitCount += course.units;
        break;
      case 'D':
        if (
          course.additionalReq === 'Global Issues' ||
          course.additionalReq === 'Human Diversity'
        ) {
          geAdditionalReqUnitCount += course.units;
        }
        geDUnitCount += course.units;
        break;
      case 'E':
        if (
          course.additionalReq === 'Global Issues' ||
          course.additionalReq === 'Human Diversity'
        ) {
          geAdditionalReqUnitCount += course.units;
        }
        break;
      case 'F':
        if (
          course.additionalReq === 'Global Issues' ||
          course.additionalReq === 'Human Diversity'
        ) {
          geAdditionalReqUnitCount += course.units;
        }
        break;
      default:
        break;
    }
  }

  const compareEandFcategories = (reqCourse, completedCourse) => {
    switch (completedCourse.category) {
      case 'E':
        // return true if user finished 3 units worth of E
        if (
          reqCourse.designation === completedCourse.designation ||
          reqCourse.designation === completedCourse.additionalReq
        ) {
          geEUnitCount += completedCourse.units;
          return geEUnitCount === 3;
        }
        break;
      case 'F':
        // return true if user finished 9 units worth of F
        if (
          reqCourse.designation === completedCourse.designation ||
          reqCourse.designation === completedCourse.additionalReq
        ) {
          geFUnitCount += completedCourse.units;
          return geFUnitCount === 9;
        }
        break;
      default:
        break;
    }
    return (
      reqCourse.designation === completedCourse.designation ||
      reqCourse.designation === completedCourse.additionalReq
    );
  };

  const addToRemaining = (reqCourse) => {
    return !geHistoryData.some((completedCourse) =>
      compareEandFcategories(reqCourse, completedCourse)
    );
  };

  const geRemaining = geReqData.filter((reqCourse) =>
    addToRemaining(reqCourse)
  );

  return {
    geAUnitCount,
    geBUnitCount,
    geCUnitCount,
    geDUnitCount,
    geEUnitCount,
    geFUnitCount,
    geAdditionalReqUnitCount,
    geRemaining,
    CAT_A,
    CAT_B,
    CAT_C,
    CAT_D,
    CAT_E,
    CAT_F,
    CAT_ADDITIONAL_REQ,
  };
};

export default getGeRemaining;
