import Link from "next/link";
import { MdRemoveRedEye, MdDelete } from "react-icons/md";

export default function TrackTable({ tracks, onDelete }) {
  if (!tracks || tracks.length === 0)
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        No tracks yet.
      </div>
    );

  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full border-collapse text-sm sm:text-base">
        {/* Table Header */}
        <thead>
          <tr className="bg-green-600 text-white dark:bg-green-700">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Artist</th>
            <th className="p-3 text-left">Release Date</th>
            <th className="p-3 text-left">Genre</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {tracks.map((t, idx) => (
            <tr
              key={t.id}
              className={`border-t border-gray-200 dark:border-gray-700 transition-colors ${
                idx % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-900"
              } hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              {/* Title */}
              <td className="p-3 font-medium text-blue-600 dark:text-blue-400">
                <Link href={`/track/${t.id}`} legacyBehavior>
                  <a className="hover:underline">{t.title}</a>
                </Link>
              </td>

              {/* Artist */}
              <td className="p-3 text-gray-700 dark:text-gray-300">
                {t.artist}
              </td>

              {/* Release Date */}
              <td className="p-3 text-gray-600 dark:text-gray-400">
                {t.releaseDate}
              </td>

              {/* Genre */}
              <td className="p-3 text-gray-700 dark:text-gray-300">
                {t.genre}
              </td>

              {/* Status */}
              <td
                className={`p-3 font-medium ${
                  t.status === "Published"
                    ? "text-green-600 dark:text-green-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                {t.status}
              </td>

              {/* Actions */}
              <td className="p-3 flex justify-center space-x-4">
                {/* View */}
                <Link href={`/track/${t.id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"or>
                    <MdRemoveRedEye size={20} />
                </Link>

                {/* Delete */}
                <button
                  onClick={() => onDelete?.(t.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
