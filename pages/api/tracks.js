import { useState } from "react";

const [tracks, setTracks] = useState([
  { id: "1", title: "Midnight Drive", artist: "Neon Roads", releaseDate: "2024-07-12", genre: "Synthwave", status: "Published" },
  { id: "2", title: "Sunset Bloom", artist: "Lila Ray", releaseDate: "2025-04-01", genre: "Indie Pop", status: "Draft" }
]);


function generateId() {
  return String(Date.now() + Math.floor(Math.random() * 1000));
}

export default function handler(req, res) {
  if (req.method === "GET") {
    const { id, q } = req.query;
    if (id) {
      const t = tracks.find((x) => x.id === id);
      if (!t) return res.status(404).json({ error: "Track not found" });
      return res.status(200).json(t);
    }
    let out = tracks;
    if (q) {
      const ql = q.toLowerCase();
      out = out.filter(t => t.title.toLowerCase().includes(ql) || t.artist.toLowerCase().includes(ql) || t.genre.toLowerCase().includes(ql));
    }
    return res.status(200).json(out);
  }

  if (req.method === "POST") {
    const { title, artist, releaseDate, genre } = req.body;
    if (!title || !artist) return res.status(400).json({ error: "title & artist required" });
    const newTrack = {
      id: generateId(),
      title,
      artist,
      releaseDate: releaseDate || new Date().toISOString().slice(0,10),
      genre: genre || "Unknown",
      status: "Draft"
    };
    tracks = [newTrack, ...tracks];
    return res.status(201).json(newTrack);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
