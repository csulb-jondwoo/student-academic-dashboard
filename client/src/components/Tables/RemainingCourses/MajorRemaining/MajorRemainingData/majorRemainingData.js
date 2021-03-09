import { majorHistoryData } from '../../../History/MajorHistory/MajorHistoryData';
import { majorReqData } from '../../../Requirements/MajorRequirements/CecsReqData';

const getMajorRemaining = () => {
  const LOWER_DIV_UNITS = 35;
  const APPROVED_SCIENCE_UNITS = 8;
  const UPPER_DIV_UNITS = 39;
  const WRITING_INTENSIVE_UNITS = 3;
  const CORE_ELECTIVE_UNITS = 6;
  const APPLIED_ELECTIVE_UNITS = 3;

  let lowerDivUnitCount = 0;
  let approvedScienceUnitCount = 0;
  let upperDivUnitCount = 0;
  let writingIntensiveUnitCount = 0;
  let coreElectiveUnitCount = 0;
  let appliedElectiveUnitCount = 0;

  for (const course of majorHistoryData) {
    switch (course.designation) {
      case 'Lower Div':
        lowerDivUnitCount += course.units;
        break;
      case 'Physical Science':
        approvedScienceUnitCount += course.units;
        break;
      case 'Life Science':
        approvedScienceUnitCount += course.units;
        break;
      case 'Upper Div':
        upperDivUnitCount += course.units;
        break;
      case 'Writing Intensive':
        writingIntensiveUnitCount += course.units;
        break;
      case 'Core Elective':
        coreElectiveUnitCount += course.units;
        break;
      case 'Applied Elective':
        appliedElectiveUnitCount += course.units;
        break;
      default:
        break;
    }
  }

  // check if loop is necessary
  //    if it is, check if course has been completed
  //    if it is not, return true to skip that category
  const compareUnitCount = (reqCourse, completedCourse) => {
    switch (reqCourse.designation) {
      case 'Lower Div':
        if (lowerDivUnitCount !== LOWER_DIV_UNITS) {
          return (
            completedCourse.course.split(' ')[1] ===
            reqCourse.course.split(' ')[1]
          );
        }
        break;
      case 'Physical Science':
        if (approvedScienceUnitCount !== APPROVED_SCIENCE_UNITS) {
          return (
            completedCourse.course.split(' ')[1] ===
            reqCourse.course.split(' ')[1]
          );
        }
        break;
      case 'Life Science':
        if (approvedScienceUnitCount !== APPROVED_SCIENCE_UNITS) {
          return (
            completedCourse.course.split(' ')[1] ===
            reqCourse.course.split(' ')[1]
          );
        }
        break;
      case 'Upper Div':
        if (upperDivUnitCount !== UPPER_DIV_UNITS) {
          return (
            completedCourse.course.split(' ')[1] ===
            reqCourse.course.split(' ')[1]
          );
        }
        break;
      case 'Writing Intensive':
        if (writingIntensiveUnitCount !== WRITING_INTENSIVE_UNITS) {
          return (
            completedCourse.course.split(' ')[1] ===
            reqCourse.course.split(' ')[1]
          );
        }
        break;
      case 'Core Elective':
        if (coreElectiveUnitCount !== CORE_ELECTIVE_UNITS) {
          return (
            completedCourse.course.split(' ')[1] ===
            reqCourse.course.split(' ')[1]
          );
        }
        break;
      case 'Applied Elective':
        if (appliedElectiveUnitCount !== APPLIED_ELECTIVE_UNITS) {
          return (
            completedCourse.course.split(' ')[1] ===
            reqCourse.course.split(' ')[1]
          );
        }
        break;
      default:
        break;
    }

    return true;
  };

  const addToRemaining = (reqCourse) => {
    return !majorHistoryData.some((completedCourse) =>
      compareUnitCount(reqCourse, completedCourse)
    );
  };

  const majorRemaining = majorReqData.filter((reqCourse) =>
    addToRemaining(reqCourse)
  );

  return {
    majorRemaining,
    lowerDivUnitCount,
    approvedScienceUnitCount,
    upperDivUnitCount,
    writingIntensiveUnitCount,
    coreElectiveUnitCount,
    appliedElectiveUnitCount,
    LOWER_DIV_UNITS,
    APPROVED_SCIENCE_UNITS,
    UPPER_DIV_UNITS,
    WRITING_INTENSIVE_UNITS,
    CORE_ELECTIVE_UNITS,
    APPLIED_ELECTIVE_UNITS,
  };
};

export default getMajorRemaining;
