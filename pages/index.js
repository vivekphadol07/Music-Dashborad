import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Login({ toggleTheme, theme }) {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "" });


  useEffect(() => {
    const s = localStorage.getItem("session");
    if (s) router.replace("/dashboard");
  }, [router]);


  const handle = (e) => {
    e.preventDefault();
    if (!user.username || !user.password)
      return alert("Enter credentials");

    localStorage.setItem("session", JSON.stringify({ username: user.username }));
    
    router.push("/dashboard");
  };


  const lightBg = "./images/music.jpg";
  const darkBg = "./images/musicdark.png";


  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${theme === "dark" ? darkBg : lightBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}

    >
      
      <div className="absolute inset-0 bg-white/70 dark:bg-black/70"></div>

      <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Login
        </h1>

        <form onSubmit={handle} className="space-y-5">
          {/* Email */}
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Email"
            type="email"
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none"
          />

          {/* Password */}
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            type="password"
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm text-green-600 dark:text-green-400 hover:underline"
            >
              Forgot Password?
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
          Create New Account?{" "}
          <a href="#" className="text-green-600 dark:text-green-400 hover:underline">
            Click here
          </a>
        </p>
      </div>
    </div>
  );
}
