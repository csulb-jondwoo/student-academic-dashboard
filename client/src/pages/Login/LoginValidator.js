/**
 * @author Ryan Stehle
 */
const validator = {
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
};

export default validator;