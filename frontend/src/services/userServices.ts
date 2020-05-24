const apiURI = 'http://localhost:3000/api';

export const createUser = async (username: string, password: string) => {
  try {
    const response = await fetch(`${apiURI}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
};
