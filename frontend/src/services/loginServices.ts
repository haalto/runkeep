const loginURI = 'http://localhost:3000/api/login';

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(loginURI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  } catch (e) {
    throw e;
  }
};
