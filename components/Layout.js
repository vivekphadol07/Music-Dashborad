import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children, toggleTheme, theme }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("session"); 
    router.push("/"); 
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/70 backdrop-blur-sm border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard"className="text-xl font-bold">
            MyMusic
          </Link>
          <nav className="hidden md:flex gap-3 text-sm text-gray-600">
            <Link href="/dashboard" >
              Dashboard
            </Link>
            <Link href="/upload" >
              Upload
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="p-4 flex-1 container mx-auto">{children}</main>
      <footer className="p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyMusic
      </footer>
    </div>
  );
}
