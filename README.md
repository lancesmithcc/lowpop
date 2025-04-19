# LowPop

LowPop is a simple app that plays a random track from the 100 least popular songs on Spotify, with a Spotify-inspired UI and melting ASCII art header.

## Prerequisites

- Node.js v16+ and npm installed
- Spotify API credentials (Client ID & Secret)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd lowpop
   ```

2. Create a `.env` file in the project root with the following content:
   ```bash
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```

## Running the Backend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

## Running the Frontend

1. Navigate to the client directory and install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

   The React app will start on `http://localhost:5173` by default.

## Usage

- Open your browser at `http://localhost:5173`.
- The app will fetch and play a random least-popular Spotify track.

## Deployment

You can deploy the backend to any Node.js hosting platform (e.g., Heroku, Vercel), and the frontend to a static host (e.g., Netlify, Vercel). Make sure to configure environment variables for Spotify credentials on your hosting provider. 