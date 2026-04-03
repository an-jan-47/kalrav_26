<h1 align="center">Kalrav '26 Website</h1>

<p align="center">
  Official website for <strong>Kalrav '26</strong>, the annual cultural fest of Deen Dayal Upadhyaya College (University of Delhi).<br/>
  Theme: <strong>Tamahkshaya</strong> (End of Darkness).
</p>

<p align="center">
  <a href="https://kalravdduc.in" target="_blank" rel="noopener noreferrer">Live Website</a>
</p>

<hr/>

<h2>Overview</h2>

<p>
This project is a React + TypeScript single-page application built with Vite and Tailwind CSS.
It delivers a high-visual festival experience with animated sections, dynamic content from Supabase,
SEO metadata, and production deployment support for Vercel.
</p>

<h2>Core Features</h2>

<ul>
  <li>Route-based pages for Home, Competitions, Gallery, Team, Itinerary, Sponsors, and Merch.</li>
  <li>Lazy-loaded pages/components for faster initial rendering.</li>
  <li>Initial homepage loader flow coordinated with data readiness and font loading.</li>
  <li>Supabase-powered dynamic content (competitions, gallery, team, merch, reviews, legacy highlights).</li>
  <li>Session + memory caching layer to reduce repeated data calls.</li>
  <li>SEO setup via react-helmet-async and JSON-LD structured data.</li>
  <li>Vercel Analytics and Speed Insights integration.</li>
  <li>Image proxying strategy for Supabase storage paths.</li>
</ul>

<h2>Tech Stack</h2>

<ul>
  <li><strong>Frontend:</strong> React 19, TypeScript, React Router</li>
  <li><strong>Build Tool:</strong> Vite 7</li>
  <li><strong>Styling:</strong> Tailwind CSS, custom fonts, custom design tokens</li>
  <li><strong>Animations:</strong> Framer Motion, GSAP, Lenis</li>
  <li><strong>Backend/Data:</strong> Supabase (client-side reads)</li>
  <li><strong>SEO:</strong> react-helmet-async + JSON-LD schema</li>
  <li><strong>Deployment:</strong> Vercel (SPA rewrites + CDN headers)</li>
</ul>

<h2>Project Structure</h2>

<pre><code>.
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ competitions/
│  │  ├─ gallery/
│  │  ├─ home/
│  │  ├─ team/
│  │  └─ ui/
│  ├─ lib/
│  │  └─ supabase.ts
│  ├─ pages/
│  ├─ services/
│  ├─ utils/
│  ├─ App.tsx
│  └─ main.tsx
├─ vercel.json
├─ vite.config.ts
└─ package.json
</code></pre>

<h2>Routes</h2>

<table>
  <thead>
    <tr>
      <th>Path</th>
      <th>Page</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/</td>
      <td>Home</td>
      <td>Hero, About, legacy event visuals, attendee reviews, FAQ</td>
    </tr>
    <tr>
      <td>/competitions</td>
      <td>Competitions</td>
      <td>Category-based filtering with dynamic cards</td>
    </tr>
    <tr>
      <td>/gallery</td>
      <td>Gallery</td>
      <td>Highlights + image gallery content</td>
    </tr>
    <tr>
      <td>/team</td>
      <td>Team</td>
      <td>Cultural council + team heads, hierarchy grouping</td>
    </tr>
    <tr>
      <td>/itinerary</td>
      <td>Itinerary</td>
      <td>Visual day-wise schedule</td>
    </tr>
    <tr>
      <td>/sponsors</td>
      <td>Sponsors</td>
      <td>Currently marked as coming soon</td>
    </tr>
    <tr>
      <td>/merch</td>
      <td>Merch</td>
      <td>Product showcase with swipeable image gallery</td>
    </tr>
  </tbody>
</table>

<h2>Supabase Data Integration</h2>

<p>Tables currently consumed in services:</p>

<ul>
  <li><strong>competitions</strong></li>
  <li><strong>gallery</strong></li>
  <li><strong>teams</strong></li>
  <li><strong>merch_products</strong></li>
  <li><strong>reviews</strong></li>
  <li><strong>past_legacies</strong></li>
</ul>


<h2>Getting Started</h2>

<h3>Prerequisites</h3>

<ul>
  <li>Node.js 18+ (recommended current LTS)</li>
  <li>npm 9+</li>
</ul>

<h3>Installation</h3>

<pre><code>npm install
</code></pre>

<h3>Configure Environment</h3>

<p>Create a <code>.env</code> file in the project root:</p>

<pre><code>VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
</code></pre>

<h3>Run Development Server</h3>

<pre><code>npm run dev
</code></pre>

<h3>Build for Production</h3>

<pre><code>npm run build
</code></pre>

<h3>Preview Production Build</h3>

<pre><code>npm run preview
</code></pre>

<h3>Lint</h3>

<pre><code>npm run lint
</code></pre>

<h2>Deployment (Vercel)</h2>

<p>The project includes Vercel configuration for:</p>

<ul>
  <li>SPA fallback rewrite to <code>/index.html</code></li>
  <li>Proxy-style rewrite for <code>/cdn/image/*</code> to Supabase storage</li>
  <li>Long-term immutable cache headers for proxied image assets</li>
</ul>

<p>
When deploying, ensure environment variables are configured in the Vercel project settings.
</p>

<h2>Performance Notes</h2>

<ul>
  <li>Code splitting via React lazy + Suspense.</li>
  <li>Manual chunking in Vite for vendor/animation/UI bundles.</li>
  <li>Cached service responses using in-memory and sessionStorage TTL strategy.</li>
  <li>Image optimizations through utility helpers and proxy paths.</li>
</ul>

<h2>Load Testing</h2>

<p>
A load profile is included in <code>load-test.yml</code> for staged traffic simulation against main routes.
You can run it with Artillery if needed:
</p>

<pre><code>npx artillery run load-test.yml
</code></pre>

<h2>SEO Checklist</h2>

<ul>
  <li>Page-level metadata defaults and Open Graph tags are configured.</li>
  <li>JSON-LD event schema is enabled.</li>
  <li>Update structured event dates and OG image before final campaign launch.</li>
  <li>Public sitemap and robots files are present in <code>public/</code>.</li>
</ul>

<h2>Troubleshooting</h2>

<ul>
  <li><strong>Blank dynamic sections:</strong> Verify Supabase URL/key and table data.</li>
  <li><strong>Image load issues:</strong> Check Supabase bucket permissions and CDN rewrite behavior.</li>
  <li><strong>Build failures:</strong> Run lint, check TypeScript errors, and confirm package compatibility.</li>
</ul>



<p align="center">
  Built for Kalrav '26, DDUC.
</p>
