# Pratyush Mishra — Portfolio Website

A responsive, animated personal portfolio built with plain HTML5, CSS3, and vanilla JavaScript (no frameworks, no build step).

## Project structure

```
portfolio/
├── index.html                          # All page content and structure
├── css/
│   └── style.css                       # Design tokens, layout, components, animations
├── js/
│   └── script.js                       # Nav behavior, typing effect, scroll reveal, form, back-to-top
├── assets/
│   ├── profile.png                     # Your profile photo (used in the hero section)
│   └── Pratyush-Mishra-Resume.pdf      # Your resume (used by the "Download Resume" buttons)
└── README.md
```

## How to run it locally

No build tools or installs are required.

1. Unzip/keep the `portfolio` folder intact (the HTML file expects `css/`, `js/`, and `assets/` to sit next to it).
2. Double-click `index.html` to open it in your browser, **or** for the most accurate preview, serve it locally:
   ```bash
   cd portfolio
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser.

## Replacing the profile photo

1. Add your new photo to the `assets/` folder.
2. Open `index.html` and find this line inside the `<section class="hero">`:
   ```html
   <img src="assets/profile.png" alt="Portrait of Pratyush Mishra" class="hero-photo" ...>
   ```
3. Change `assets/profile.png` to your new file's name (e.g. `assets/new-photo.jpg`).
4. For best results, use a square image (roughly 800×800px or larger) with good lighting — the CSS will crop it into the rounded frame automatically.

## Updating resume content

- **Resume file**: Replace `assets/Pratyush-Mishra-Resume.pdf` with your updated PDF, keeping the same filename (or update the `href="assets/..."` references in `index.html` if you rename it — there are two "Download Resume" buttons plus one in the nav bar).
- **Text content** (About, Education, Skills, Experience, Projects, Certifications, Achievements, Contact): all of this lives directly in `index.html` as plain text inside each `<section>`. Search for the section by its `id` (e.g. `id="projects"`) and edit the text between the HTML tags. No templating engine is used, so edits are direct and immediate.
- **Skill badges**: each skill is a `<span class="badge">Skill Name</span>` inside the `#skills` section — add, remove, or rename these freely.
- **Colors/fonts**: all design tokens (colors, fonts, spacing) are defined as CSS variables at the top of `css/style.css` under `:root`. Changing a value there updates it site-wide.

## Deploying the portfolio online

Any static hosting provider works since this is plain HTML/CSS/JS. Three easy free options:

### Option 1: GitHub Pages
1. Create a new GitHub repository and push the contents of this `portfolio` folder to it.
2. In the repository, go to **Settings → Pages**.
3. Under "Build and deployment", set the source branch to `main` (or `master`) and folder to `/root`.
4. Save — your site will be live at `https://<your-username>.github.io/<repo-name>/` within a few minutes.

### Option 2: Netlify (drag-and-drop, no account setup required for a quick preview)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the entire `portfolio` folder onto the page.
3. Netlify instantly deploys it and gives you a live URL. You can claim/rename it by creating a free account.

### Option 3: Vercel
1. Install the Vercel CLI (`npm i -g vercel`) or use the Vercel dashboard.
2. Run `vercel` inside the `portfolio` folder and follow the prompts, or drag the folder into the Vercel dashboard's "Add New Project" flow.
3. Vercel deploys it and gives you a live URL.

After deploying, update the resume/social links in `index.html` if any of them change, and re-deploy.

## Notes

- The contact form is a UI-only preview (as requested) — submitting it shows a message pointing visitors to your email instead of actually sending anything. To make it functional, wire it up to a service like Formspree, EmailJS, or your own backend endpoint and replace the `submit` handler in `js/script.js`.
- All content (education, skills, projects, experience, certifications, achievements, contact details) was sourced directly from the resume provided — nothing was invented.
