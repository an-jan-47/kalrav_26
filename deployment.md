# Deployment Guide (Vercel)

This project is built with Vite + React + TypeScript and is optimized for Vercel deployment.

## Prerequisites

- A [Vercel](https://vercel.com) account.
- This code pushed to a GitHub repository.

## Steps to Deploy

1.  **Push to GitHub**:

    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    # git remote add origin <your-repo-url>
    # git push -u origin main
    ```

2.  **Import to Vercel**:

    - Go to Vercel Dashboard -> **Add New** -> **Project**.
    - Import the GitHub repository.

3.  **Configure Project**:

    - **Framework Preset**: Vite (should be auto-detected).
    - **Root Directory**: `./`
    - **Build Command**: `vite build` (or `npm run build`)
    - **Output Directory**: `dist`
    - **Install Command**: `npm install`

4.  **Environment Variables**:

    - If you add Supabase later, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel settings.

5.  **Deploy**:
    - Click **Deploy**.
    - Vercel will build the project and assign a URL.

## Post-Deployment

- Configure custom domain in Settings -> Domains.
- Enable Analytics / Speed Insights if desired.
