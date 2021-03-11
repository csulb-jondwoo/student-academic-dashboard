const multer = require('multer');
const { PythonShell } = require('python-shell');
const userSchema = require('../models/user.js');
const { upload } = require('../utility/multer.js');

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

  PythonShell.run('parse.py', options, function (err, result) {
    if (err) throw err;
    // result is an array consisting of messages collected
    //during execution of script.
    const data = result;
    const jsonData = JSON.parse(data);
    console.log(jsonData);
    console.log(jsonData['csulb']['2020']);
    console.log(jsonData['csulb']['2020'][0]);

    // res.send(result.toString());
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
