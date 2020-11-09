/**
 * @author Ryan Stehle
 */
const RegisterValidator = {
    email: {
      rules: [
        {
          test: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/,
          message: "Must be a valid email address containing @ symbol."
        },
        {
          test: (value) => {
            return value.length > 2;
          },
          message: 'Email address must be longer than two characters.'
        },
      ],
      errors: [],
      valid: false,
      state: '',
    },
    password: {
      rules: [
        {
          test: (value) => {
            return value.length >= 6;
          },
          message: 'Password must not be shorter than 6 characters.',
        },
      ],
      errors: [],
      valid: false,
      state: '',
    },
    confirmPassword: {
        rules: [
          {
            test: (value) => {
              return value === RegisterValidator.password.state;
            },
            message: 'Please confirm your passwords match.',
          },
        ],
        errors: [],
        valid: false,
        state: '',
      },
      username: {
        rules: [
          {
            test: /^[A-Za-z0-9_]+$/,
            message: 'Username must contain only alpha-numeric characters.',
          },
          {
            test: (value) => {
              return value.length > 2;
            },
            message: 'Username must be longer than two characters.',
          },
        ],
        errors: [],
        valid: false,
        state: '',
      }
};

export default RegisterValidator;