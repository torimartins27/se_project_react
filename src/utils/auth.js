const BASE_URL = "http://localhost:3001";

export const signUp = (name, avatar, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(async (res) => {
    if (!res.ok) {
      const errorData = await res.json().catch((error) => {
        console.error("Signup failed", error);
        throw error;
      });
    }
    return res.json();
  });
};

export const signIn = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
};

export const fetchUserData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching user data:", error);
      throw error;
    });
};
