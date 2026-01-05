export async function loginApi({ username, password }) {
  const res = await fetch(
    "https://admin.boostmybusiness.ai/react/login.php",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    }
  );

  // ✅ READ BODY ONLY ONCE
  const data = await res.json();

  console.log(data);

  if (res.status === 401) {
    throw new Error(data.error || "Invalid username or password");
  }

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}
