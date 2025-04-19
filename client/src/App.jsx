import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [track, setTrack] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTrack() {
      setLoading(true)
      try {
        console.log('Fetching track from API...')
        const res = await fetch('http://localhost:3000/api/random-track')
        console.log('API response status:', res.status)
        
        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`)
        }
        
        const data = await res.json()
        console.log('Track data received:', data)
        setTrack(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching track:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTrack()
  }, [])

  // Debug render output
  console.log('Render state - Loading:', loading, 'Track:', track, 'Error:', error)

  return (
    <div className="app">
      <header>
        <pre className="ascii-art">
  _                ____             
 | |    ___   ___ |  _ \ __ _ _ __  
 | |   / _ \ / _ \| |_) / _` | '_ \ 
 | |__| (_) | (_) |  __/ (_| | | | |
 |_____\___/ \___/|_|   \__,_|_| |_|
        </pre>
      </header>
      <main>
        {loading && <p className="loading">Loading LowPop...</p>}
        
        {error && (
          <div className="error-card">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <p>Make sure the server is running and Spotify credentials are set.</p>
          </div>
        )}
        
        {!loading && !error && track && (
          <div className="track-card">
            <img src={track.album?.images[0]?.url} alt={track.name} />
            <h2>{track.name}</h2>
            <p>{track.artists?.map(a => a.name).join(', ')}</p>
            {track.preview_url ? (
              <audio controls src={track.preview_url}></audio>
            ) : (
              <iframe
                title="Spotify Embed"
                src={`https://open.spotify.com/embed/track/${track.id}`}
                width="300"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
