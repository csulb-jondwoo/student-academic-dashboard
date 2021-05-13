import { geReqData } from '../../../Requirements/GeRequirements/GeReqData'

const getGeRemaining = (geCourses, majorCourses) => {
  let geEUnitCount = 0
  let geFUnitCount = 0
  const CAT_E = 3
  const CAT_F = 9

  let geRemaining = []

  // check main requirements
  for (const requirement of geReqData) {
    let matched = false

    for (const course of geCourses) {
      if (
        course.designation === requirement.designation &&
        (course.grade === 'A' ||
          course.grade === 'B' ||
          course.grade === 'C' ||
          course.grade === 'CR')
      ) {
        matched = true
        break
      }
    }

    if (matched) {
      continue
    } else {
      geRemaining.push(requirement)
    }
  }

  // check additional requirements
  for (const course of geCourses) {
    if (
      course.additionalReq === 'Global Issues' ||
      course.additionalReq === 'Human Diversity'
    ) {
      geRemaining = geRemaining.filter((requirement) => {
        if (course.additionalReq === requirement.designation) {
          return false
        } else {
          return true
        }
      })
    }
  }

  // takes care of life science, physical science and lab exp
  for (const requirement of geRemaining) {
    for (const course of majorCourses) {
      if (course.designation === requirement.course) {
        const idx = geRemaining.findIndex(() => {
          return course.designation === requirement.course
        })
        // TODO: remove science and lab, may introduce error
        geRemaining.splice(idx, 2)
        break
      }
    }
  }

  // accumulate E and F units
  majorCourses.forEach((course) => {
    if (course.course.split(' -')[0] === 'CECS 105') {
      geEUnitCount += 1
    } else if (course.course.split(' -')[0] === 'ENGR 101') {
      geEUnitCount += 1
    } else if (course.course.split(' -')[0] === 'ENGR 102') {
      geEUnitCount += 1
    }
  })

  majorCourses.forEach((course) => {
    if (course.course.split(' -')[0] === 'CECS 491A') {
      geFUnitCount += 3
    } else if (course.course.split(' -')[0] === 'CECS 491B') {
      geFUnitCount += 3
    } else if (course.course.split(' -')[0] === 'ENGR 361') {
      geFUnitCount += 3
    } else if (course.course.split(' -')[0] === 'ENGR 390') {
      geFUnitCount += 3
    }
  })

  // check for correct amount of E and F units
  for (const requirement of geRemaining) {
    if (geEUnitCount === 3) {
      const idx = geRemaining.findIndex(() => {
        return requirement.designation === 'E'
      })
      geRemaining.splice(idx, 1)
    }
  }

  for (const requirement of geRemaining) {
    if (geFUnitCount === 9) {
      const idx = geRemaining.findIndex(() => {
        return requirement.designation === 'F'
      })
      geRemaining.splice(idx, 1)
    }
  }

  return {
    geRemaining,
    CAT_E,
    CAT_F,
    geEUnitCount,
    geFUnitCount,
  }
}

export default getGeRemaining
