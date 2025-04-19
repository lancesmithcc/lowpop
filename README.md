# LowPop

LowPop is a simple app that plays a random track from the 100 least popular songs on Spotify, with a Spotify-inspired UI and melting ASCII art header.

## Prerequisites

- Node.js v16+ and npm installed
- Spotify API credentials (Client ID & Secret)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/lancesmithcc/lowpop.git
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

### Backend Deployment

1. Deploy the backend to any Node.js hosting platform (Heroku, Render, etc.)
2. Set environment variables for `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and optionally `FRONTEND_URL` for CORS.

### Frontend Deployment on Netlify

1. Push your code to GitHub at https://github.com/lancesmithcc/lowpop
2. Log in to Netlify and select "Import from Git"
3. Choose your GitHub repository
4. Configure build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Set environment variables in Netlify dashboard:
   - `VITE_API_URL`: URL of your deployed backend (e.g., `https://your-backend.herokuapp.com`)
6. Deploy!

### Important Security Note

Never commit your `.env` file or any file containing your Spotify credentials to version control. Always use environment variables for sensitive information in deployment environments. 