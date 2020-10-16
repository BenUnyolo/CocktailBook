export const headerConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// setup config/headers and token
export const tokenConfig = getState => {
  // gets auth.token from state (through argument), which gets it from localStorage
  const token = getState().auth.token;

  // set headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  // if token, add it to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
}