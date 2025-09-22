import "../styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const t = localStorage.getItem("theme") || "light";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next === "dark" ? "dark" : "light");
  };

  return <Component {...pageProps} toggleTheme={toggleTheme} theme={theme} />;
}
