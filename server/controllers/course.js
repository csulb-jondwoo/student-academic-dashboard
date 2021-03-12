const multer = require('multer');
const { PythonShell } = require('python-shell');
const userSchema = require('../models/user.js');
const { upload } = require('../utility/multer.js');

// ADD
const addCompletedCourse = async (req, res) => {
  try {
    const { userID } = req.body; // userID = googleId passed from completed course form
    const completed = req.body;
    console.log(completed);

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
    const { userID } = req.body;
    const current = req.body;

    await userSchema.findOneAndUpdate(
      {
        googleId: userID,
      },
      {
        $pull: {
          currentCourses: current,
        },
      }
    );
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
    number: null,
    dept: null,
    title: null,
    units: 0,
    term: null,
    year: null,
    grade: null,
    designation: null,
    additionalReq: null,
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

            courseData = {
              ...courseData,
              year,
              term,
              number,
              dept,
              title,
              units,
              grade,
              //designation
              //additionalReq
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
  uploadTranscript,
};
