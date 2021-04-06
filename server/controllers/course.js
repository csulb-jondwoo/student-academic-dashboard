// const multer = require('multer');
const { PythonShell } = require('python-shell')

const userSchema = require('../models/user.js')
const { convertTo24hr } = require('../utility/convertTo24hr')
const { cecsCatalog } = require('../assets/cecsCatalog/cecsCatalog.js')
const { geCatalog } = require('../assets/geCatalog/geCatalog.js')

// ADD
const addCompletedCourse = async (req, res) => {
  try {
    const { userID } = req.body // userID = googleId passed from completed course form
    const completed = req.body

    await userSchema.findOneAndUpdate(
      {
        googleId: userID,
      },
      {
        $addToSet: {
          completedCourses: completed,
        },
      },
    )

    return res.status(201).json({
      success: true,
      data: completed,
    })
  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

const addCurrentCourse = async (req, res) => {
  try {
    const { userID } = req.body
    const current = req.body

    await userSchema.findOneAndUpdate(
      {
        googleId: userID,
      },
      {
        $addToSet: {
          currentCourses: current,
        },
      },
    )

    return res.status(201).json({
      success: true,
      data: current,
    })
  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

// DELETE
const deleteCurrentCourse = async (req, res) => {
  try {
    const data = req.body
    for (const course of data) {
      const number = course.course.split(' ')[1]
      const dept = course.course.split(' ')[0]
      const { userID } = course
      await userSchema.findOneAndUpdate(
        {
          googleId: userID,
        },
        {
          $pull: {
            // delete the course that matches number and dept
            currentCourses: { number, dept },
          },
        },
      )
    }
  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

const deleteCompletedCourse = async (req, res) => {
  try {
    const data = req.body
    for (const course of data) {
      const number = course.course.split(' ')[1]
      const dept = course.course.split(' ')[0]
      const { userID } = course
      await userSchema.findOneAndUpdate(
        {
          googleId: userID,
        },
        {
          $pull: {
            // delete the course that matches number and dept
            completedCourses: { number, dept },
          },
        },
      )
    }
  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

// UPDATE
const updateCurrentCourse = async (req, res) => {
  try {
    const { userID } = req.body.oldCourse
    const { newCourse } = req.body
    const { oldCourse } = req.body

    const number = oldCourse.course.split(' ')[1]
    const dept = oldCourse.course.split(' ')[0]

    await userSchema.findOneAndUpdate(
      {
        googleId: userID,
        currentCourses: {
          $elemMatch: {
            number,
            dept,
          },
        },
      },
      {
        $set: {
          'currentCourses.$.type': newCourse.type,
          'currentCourses.$.number': newCourse.course.split(' ')[1],
          'currentCourses.$.dept': newCourse.course.split(' ')[0],
          'currentCourses.$.title': newCourse.course.split('- ')[1],
          'currentCourses.$.units': newCourse.units,
          'currentCourses.$.term': newCourse.term,
          'currentCourses.$.designation': newCourse.designation,
          'currentCourses.$.additionalReq': newCourse.additionalReq,
          'currentCourses.$.section': newCourse.section,
          // save as 24 hr format
          'currentCourses.$.startTime': convertTo24hr(newCourse.startTime),
          'currentCourses.$.endTime': convertTo24hr(newCourse.endTime),
          // array
          'currentCourses.$.days': newCourse.days.split('/'),
          'currentCourses.$.location': newCourse.location,
        },
      },
    )
  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
}

const updateCompletedCourse = async (req, res) => {
  try {
    const { userID } = req.body.oldCourse
    const { newCourse } = req.body
    const { oldCourse } = req.body
    let courseType = 'ge'

    // if course updated desig to cecs desigs, change type to major
    if (
      newCourse.designation === 'Lower Div' ||
      newCourse.designation === 'Physical Science'||
      newCourse.designation === 'Life Science'||
      newCourse.designation === 'Upper Div'||
      newCourse.designation === 'Writing Intensive'||
      newCourse.designation === 'Core Elective'||
      newCourse.designation === 'Applied Elective'
    ) {
      courseType = 'major'
    } 

    const number = oldCourse.course.split(' ')[1]
    const dept = oldCourse.course.split(' ')[0]

    await userSchema.findOneAndUpdate(
      {
        googleId: userID,
        completedCourses: {
          $elemMatch: {
            number,
            dept,
          },
        },
      },
      {
        $set: {
          'completedCourses.$.type': courseType,
          'completedCourses.$.number': newCourse.course.split(' ')[1],
          'completedCourses.$.dept': newCourse.course.split(' ')[0],
          'completedCourses.$.title': newCourse.course.split('- ')[1],
          'completedCourses.$.grade': newCourse.grade,
          'completedCourses.$.units': newCourse.units,
          'completedCourses.$.designation': newCourse.designation,
          'completedCourses.$.additionalReq': newCourse.additionalReq,
          'completedCourses.$.term': newCourse.termYear.split(' ')[0],
          'completedCourses.$.year': newCourse.termYear.split(' ')[1],
        },
      },
    )
  } catch (error) {
    return res.status(409).json({ message: error.message })
  }
  // try {
  //   const { userID } = req.body
  //   const current = req.body

  //   await userSchema.findOneAndUpdate(
  //     {
  //       googleId: userID,
  //     },
  //     {
  //       $set: {
  //         currentCourses: current,
  //       },
  //     },
  //   )
  // } catch (error) {
  //   return res.status(409).json({ message: error.message })
  // }
}

// GET
const getCurrentCourses = async (req, res) => {
  try {
    const param = req.query.ID
    const currentCourses = await userSchema.findOne({
      googleId: param,
    })

    return res.status(200).json({
      success: true,
      data: currentCourses.currentCourses,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    })
  }
}

const getCompletedCourses = async (req, res) => {
  try {
    const param = req.query.ID
    const completedCourses = await userSchema.findOne({
      googleId: param,
    })

    return res.status(200).json({
      success: true,
      data: completedCourses.completedCourses,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    })
  }
}

const uploadTranscript = (req, res) => {
  const courseList = []
  const cecsCourses = []
  const userID = req.body.userID
  let courseData = {
    type: 'major',
    number: 0,
    dept: '',
    title: '',
    units: 0,
    term: '',
    year: 0,
    grade: '',
    designation: '',
    additionalReq: 'N/A',
  }

  const options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: './transcript',
    args: [''], //An argument which can be accessed in the script using sys.argv[1]
  }

  try {
    PythonShell.run('parse.py', options, async (err, result) => {
      const data = JSON.parse(result)
      // get individual courses
      for (const year in data['csulb']) {
        for (const termIdx in data['csulb'][year]) {
          for (const term in data['csulb'][year][termIdx]) {
            for (const courseIdx in data['csulb'][year][termIdx][term]) {
              // create courseData obj
              const course = data['csulb'][year][termIdx][term][courseIdx]
              const dept = course[0].split(' ')[0]
              const number = course[0].split(' ')[1]
              const title = course[1]
              const units = course[2]
              const grade = course[3]

              courseData = {
                ...courseData,
                year,
                term,
                number,
                dept,
                title,
                units,
                grade,
              }

              // create list of completed courses with year and term
              courseList.push(courseData)
              
            }
          }
        }
      }

      // separate list of major courses
      for (const course of courseList) {
        const courseName = course.dept + ' ' + course.number
        for (const catalogCourse of cecsCatalog) {
          if (courseName === catalogCourse.course) {
            course.designation = catalogCourse.designation
            cecsCourses.push(course)
            break
          }
        }
      }

      // separate list of ge course
      const geCourses = courseList.filter((course) => {
        return !cecsCourses.includes(course)
      })


      // convert type to ge
      for (const course of geCourses) {
        const idx = geCourses.findIndex((elem => elem.dept === course.dept && elem.number === course.number))
        geCourses[idx].type = 'ge'
      }

      // append designation to cecs
      for (const course of courseList) {
        const courseName = course.dept + ' ' + course.number
        for (const catalogCourse of cecsCatalog) {
          if (courseName === catalogCourse.course) {
            course.designation = catalogCourse.designation
            break
          }
        }
      }
       

      // append designation and additional req to ge
      for (const course of geCourses) {
        const courseName = course.dept + ' ' + course.number
        for (const catalogCourse of geCatalog) {
          if (courseName === catalogCourse.course) {
            let additionalReqIdx
            course.designation = catalogCourse.designation[0]
            for (const req of catalogCourse.additionalReq) {
              if (req === 'Human Diversity' || req === 'Global Issues') {
                additionalReqIdx = catalogCourse.additionalReq.indexOf(req)
              }
            }
            if (additionalReqIdx !== undefined) {
              course.additionalReq = catalogCourse.additionalReq[additionalReqIdx]
            } 
            break
          }
        }
      }

      // add cecs course to db
      for (const course of cecsCourses) {
        await userSchema.findOneAndUpdate(
          {
            googleId: userID,
          },
          {
            $addToSet: {
              completedCourses: course,
            },
          },
        )
      }

      // add ge course to db
      for (const course of geCourses) {
        await userSchema.findOneAndUpdate(
          {
            googleId: userID,
          },
          {
            $addToSet: {
              completedCourses: course,
            },
          },
        )
      }

      
      return res.status(200).send({ success: true })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getCurrentCourses,
  getCompletedCourses,
  addCurrentCourse,
  addCompletedCourse,
  deleteCurrentCourse,
  deleteCompletedCourse,
  updateCurrentCourse,
  updateCompletedCourse,
  uploadTranscript,
}
