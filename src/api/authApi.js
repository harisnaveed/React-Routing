export async function loginApi({ username, password }) {
  // simulate network delay
  await new Promise((res) => setTimeout(res, 1000));

  // fake users database
  const users = [
    {
      name: "Haris",
      email: "haris@gmail.com",
      role: "admin",
      username: "haris",
      password: "1234",
      isAuthenticated: true,
    },
    {
      name: "Hamza",
      email: "hamza@gmail.com",
      role: "manager",
      username: "hamza",
      password: "1234",
      isAuthenticated: false,
    },
  ];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    throw new Error("Username or password not found");
  }

  if (!user.isAuthenticated) {
    throw new Error("User is not authenticated. Please contact admin.");
  }

  return {
    name: user.name,
    email: user.email,
    role: user.role,
    isAuthenticated: user.isAuthenticated,
  };
}
