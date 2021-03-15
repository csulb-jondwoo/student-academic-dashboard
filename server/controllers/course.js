const multer = require('multer');
const { PythonShell } = require('python-shell');
const userSchema = require('../models/user.js');
const { upload } = require('../utility/multer.js');
const { convertTo24hr } = require('../utility/convertTo24hr');

// ADD
const addCompletedCourse = async (req, res) => {
  try {
    const { userID } = req.body; // userID = googleId passed from completed course form
    const completed = req.body;

    await userSchema.findOneAndUpdate(
      {
        googleId: userID,
      },
      {
        $addToSet: {
          completedCourses: completed,
        },
      }
    );

    return res.status(201).json({
      success: true,
      data: completed,
    });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const addCurrentCourse = async (req, res) => {
  try {
    const { userID } = req.body;
    const current = req.body;

    await userSchema.findOneAndUpdate(
      {
        googleId: userID,
      },
      {
        $addToSet: {
          currentCourses: current,
        },
      }
    );

    return res.status(201).json({
      success: true,
      data: current,
    });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

// DELETE
const deleteCurrentCourse = async (req, res) => {
  try {
    const data = req.body;
    for (const course of data) {
      const number = course.course.split(' ')[1];
      const dept = course.course.split(' ')[0];
      const { userID } = course;
      await userSchema.findOneAndUpdate(
        {
          googleId: userID,
        },
        {
          $pull: {
            // delete the course that matches number and dept
            currentCourses: { number, dept },
          },
        }
      );
    }
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const deleteCompletedCourse = async (req, res) => {
  try {
    const { userID } = req.body;
    const completed = req.body;

    await userSchema.findOneAndUpdate(
      {
        googleId: userID,
      },
      {
        $pull: {
          completedCourses: completed,
        },
      }
    );
  } catch (error) {
    return res.status(409).json({ message: error.message });
    const { userID } = req.body;
  }
};

// UPDATE
const updateCurrentCourse = async (req, res) => {
  try {
    const { userID } = req.body.oldCourse;
    const { newCourse } = req.body;
    const { oldCourse } = req.body;

    const number = oldCourse.course.split(' ')[1];
    const dept = oldCourse.course.split(' ')[0];

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
      }
    );
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const updateCompletedCourse = async (req, res) => {
  try {
    const { userID } = req.body;
    const current = req.body;

    await userSchema.findOneAndUpdate(
      {
        googleId: userID,
      },
      {
        $set: {
          currentCourses: current,
        },
      }
    );
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

// GET
const getCurrentCourses = async (req, res) => {
  try {
    const param = req.query.ID;
    const currentCourses = await userSchema.findOne({
      googleId: param,
    });

    return res.status(200).json({
      success: true,
      data: currentCourses.currentCourses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

const getCompletedCourses = async (req, res) => {
  try {
    const param = req.query.ID;
    const completedCourses = await userSchema.findOne({
      googleId: param,
    });

    return res.status(200).json({
      success: true,
      data: completedCourses.completedCourses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

const uploadTranscript = (req, res) => {
  const userID = req.body.userID;
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
    additionalReq: '',
  };

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });

  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: './transcripts',
    args: [''], //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run('parse.py', options, async (err, result) => {
    if (err) {
      throw err;
    }

    data = JSON.parse(result);

    // get individual courses
    for (year in data['csulb']) {
      for (termIdx in data['csulb'][year]) {
        for (term in data['csulb'][year][termIdx]) {
          for (courseIdx in data['csulb'][year][termIdx][term]) {
            // create courseData obj
            course = data['csulb'][year][termIdx][term][courseIdx];
            const dept = course[0].split(' ')[0];
            const number = course[0].split(' ')[1];
            const title = course[1];
            const units = course[2];
            const grade = course[3];
            // doesnt exist yet
            // const designation = course[4];
            // const additinalReq = course[5];

            courseData = {
              ...courseData,
              year,
              term,
              number,
              dept,
              title,
              units,
              grade,
              // designation,
              // additionalReq,
            };

            console.log(courseData);
            // add to completed courses
            await userSchema.findOneAndUpdate(
              {
                googleId: userID,
              },
              {
                $addToSet: {
                  completedCourses: courseData,
                },
              }
            );
          }
        }
      }
    }
  });
};

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
};
