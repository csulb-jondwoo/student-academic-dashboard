const multer = require('multer');
const { PythonShell } = require('python-shell');
const userSchema = require('../models/user.js');
const { upload } = require('../utility/multer.js');

const addCompletedCourse = async (req, res) => {
    try {
        const { userID } = req.body; // userID = googleId passed from completed course form
        const completed = req.body;

        console.log(completed)

        await userSchema.findOneAndUpdate(
            {
                googleId: userID,
            }, 
            {
                $push: 
                {
                    completedCourses: completed
                }
            }
        )

        return res.status(201).json({
            success: true,
            data: completed
        });
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

const addCurrentCourse = async (req, res) => {
    try {
        const { userID } = req.body;
        const current = req.body;
        
        await userSchema.findOneAndUpdate({
            googleId: userID
        },
        {
            $addToSet: {
                currentCourses: current
            }
        })

        return res.status(201).json({
            success: true,
            data: current
        });
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found.'
            })
        }
        await course.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

const getCurrentCourses = async (req, res) => {
    try {
        const currentCourses = await currentCourse.find();
        
        return res.status(200).json(currentCourses)
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

const getCompletedCourses = async (req, res) => {
    try {
        const completedCourses = await completedCourse.find();
        
        return res.status(200).json(completedCourses)
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}


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
    scriptPath: './transcripts', //If you are having python_test.py script in same folder, then it's optional.
    args: [''], //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run('parse.py', options, function (err, result) {
    if (err) throw err;
    // result is an array consisting of messages collected
    //during execution of script.
    const data = result;
    const jsonData = JSON.parse(data);
    console.log(jsonData);
    // console.log(json['csulb']['2020'][1]);

    // res.send(result.toString());
  });
};

module.exports = {
  getCurrentCourses,
  getCompletedCourses,
  addCurrentCourse,
  addCompletedCourse,
  deleteCourse,
  uploadTranscript,
};
