#  MyMusic – Next.js Music Management App

MyMusic is a simple **music management web app** built with **Next.js, React, and Tailwind CSS**.  
It allows users to **log in, upload tracks, view details, search, and manage tracks** with support for **light/dark mode**.

---

##  Features

-  **Authentication (Local Storage based session)**
-  **Upload new tracks** with title, artist, release date, and genre
-  **Dashboard** to view all tracks in a table
-  **Search tracks** by title, artist, or genre
-  **Delete tracks**
-  **View track details**
-  **Dark/Light theme toggle** (saved in localStorage)
-  **Local storage persistence** for session and tracks
-  **Custom login page with background images**

---

##  Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Storage**: Browser LocalStorage

---

##  Project Structure

├── components
│ ├── Layout.js # Shared layout with header/footer
│ ├── TrackForm.js # Upload form for new tracks
│ ├── TrackTable.js # Track list table with actions
├── pages
│ ├── _app.js # App wrapper with theme support
│ ├── index.js # Login page
│ ├── dashboard.js # Dashboard with track list + search
│ ├── upload.js # Upload track page
│ ├── track/[id].js # Track details page
│ └── api/tracks.js # API route for managing tracks
├── public/images # Background images for login
├── styles
│ └── globals.css
└── README.md
