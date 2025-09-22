import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TrackTable from "../components/TrackTable";
import Link from "next/link";

export default function Dashboard({ toggleTheme, theme }) {
  const [tracks, setTracks] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("session");
    if (!s) {
      window.location.href = "/";
      return;
    }
    fetchTracks();
  }, []);

  const fetchTracks = async (search) => {
    setLoading(true);
    const url =
      "/api/tracks" + (search ? `?q=${encodeURIComponent(search)}` : "");
    const res = await fetch(url);
    const json = await res.json();
    setTracks(json);
    setLoading(false);
  };

  const onSearch = (e) => {
    e.preventDefault();
    fetchTracks(q);
  };

  return (
    <Layout toggleTheme={toggleTheme} theme={theme}>
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">
          Dashboard
        </h2>
        <div className="flex gap-2">
          <Link href="/upload" legacyBehavior>
            <a className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Upload Track
            </a>
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <form
        onSubmit={onSearch}
        className="flex flex-col sm:flex-row gap-2 mb-6"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tracks / artist / genre"
          className="flex-1 p-3 border rounded-lg 
             bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white 
             border-gray-300 dark:border-gray-600 
             focus:ring-2 focus:ring-green-500 outline-none"
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

      {/* Table */}
      {loading ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : (
        <TrackTable
          tracks={tracks}
          onDelete={(id) => setTracks(tracks.filter((t) => t.id !== id))}
          darkMode={theme === "dark"} // pass theme to TrackTable
        />
      )}

      {/* Tip */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        Tip: Click a track title to view details.
      </div>
    </Layout>
  );
}
