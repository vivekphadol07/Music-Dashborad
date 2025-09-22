import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function TrackDetails({ toggleTheme, theme }) {
  const router = useRouter();
  const { id } = router.query;
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/tracks?id=${id}`)
      .then(r => r.json())
      .then(data => setTrack(data))
      .catch(() => setTrack(null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Layout toggleTheme={toggleTheme} theme={theme}>
      <div>
        <button onClick={() => router.back()} className="text-sm text-blue-600 mb-4">← Back</button>
        {loading ? <div>Loading...</div> : track ? (
          <div className="space-y-3 border rounded p-4 max-w-xl">
            <h1 className="text-xl font-bold">{track.title}</h1>
            <div><strong>Artist:</strong> {track.artist}</div>
            <div><strong>Release Date:</strong> {track.releaseDate}</div>
            <div><strong>Genre:</strong> {track.genre}</div>
            <div><strong>Status:</strong> {track.status}</div>
            <div className="pt-2 text-sm text-gray-500">ID: {track.id}</div>
          </div>
        ) : <div>Track not found.</div>}
      </div>
    </Layout>
  );
}
