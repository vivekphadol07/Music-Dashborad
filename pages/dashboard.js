import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TrackTable from "../components/TrackTable";
import Link from "next/link";

export default function Dashboard({ toggleTheme, theme }) {
  const [tracks, setTracks] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!session) {
      window.location.href = "/";
      return;
    }

    const storedTracks = JSON.parse(localStorage.getItem("tracks") || "[]");
    if (storedTracks.length === 0) {
      const defaultTracks = [
        { id: "1", title: "Midnight Drive", artist: "Neon Roads", releaseDate: "2024-07-12", genre: "Synthwave", status: "Published" },
        { id: "2", title: "Sunset Bloom", artist: "Lila Ray", releaseDate: "2025-04-01", genre: "Indie Pop", status: "Draft" }
      ];
      localStorage.setItem("tracks", JSON.stringify(defaultTracks));
      setTracks(defaultTracks);
    } else {
      setTracks(storedTracks);
    }
  }, []);


  const fetchTracks = (search) => {
    setLoading(true);
    let storedTracks = JSON.parse(localStorage.getItem("tracks") || "[]");

    if (search) {
      const ql = search.toLowerCase();
      storedTracks = storedTracks.filter(
        t =>
          t.title.toLowerCase().includes(ql) ||
          t.artist.toLowerCase().includes(ql) ||
          t.genre.toLowerCase().includes(ql)
      );
    }

    setTracks(storedTracks);
    setLoading(false);
  };

  const onSearch = (e) => {
    e.preventDefault();
    fetchTracks(q);
  };


  const handleDelete = (id) => {
    const updatedTracks = tracks.filter(t => t.id !== id);
    setTracks(updatedTracks);
    localStorage.setItem("tracks", JSON.stringify(updatedTracks));
  };

  return (
    <Layout toggleTheme={toggleTheme} theme={theme}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">Dashboard</h2>
        <div className="flex gap-2">
          <Link href="/upload" legacyBehavior>
            <a className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Upload Track
            </a>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tracks / artist / genre"
          className="flex-1 p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setQ("");
              fetchTracks();
            }}
            className="px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 transition"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Track Table */}
      {loading ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : (
        <TrackTable
          tracks={tracks}
          onDelete={handleDelete}
          darkMode={theme === "dark"}
        />
      )}

      {/* Tip */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        Tip: Click a track title to view details.
      </div>
    </Layout>
  );
}
