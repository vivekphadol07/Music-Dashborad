import { useState } from "react";

export default function TrackForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newTrack = {
        id: Date.now().toString(),
        title,
        artist,
        releaseDate: releaseDate || new Date().toISOString().slice(0, 10),
        genre: genre || "Unknown",
        status: "Draft",
      };

      const storedTracks = JSON.parse(localStorage.getItem("tracks") || "[]");
      const updatedTracks = [newTrack, ...storedTracks];
      localStorage.setItem("tracks", JSON.stringify(updatedTracks));

      setTitle("");
      setArtist("");
      setReleaseDate("");
      setGenre("");

      onSuccess && onSuccess(newTrack);
    } catch (err) {
      alert("Error creating track");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
      {/* Track Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Track Title
        </label>
        <input
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Artist Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Artist Name
        </label>
        <input
          value={artist}
          required
          onChange={(e) => setArtist(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Release Date + Genre */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Release Date
          </label>
          <input
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            type="date"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
        <div className="w-36">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Genre
          </label>
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition disabled:opacity-70"
      >
        {loading ? "Uploading..." : "Create Track"}
      </button>
    </form>
  );
}
