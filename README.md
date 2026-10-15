# Kenneth Azcurra — Portfolio

Static portfolio, ready for GitHub Pages. Includes all images, videos and both playable browser games. No build step, server, package installation or API keys required.

## Publish through GitHub

1. Create a **public** repository named `portfolio` under `kennethdevelops`.
2. Extract this ZIP. Upload the contents of the `portfolio` folder to the repository root (not the folder itself). Include `assets`, `games`, and all HTML/CSS/JS files. Commit to `main`.
3. Ensure the empty `.nojekyll` file is included. If your file picker hides it, create a file named `.nojekyll` through GitHub's Add file menu.
4. Open Settings → Pages. Select **Deploy from a branch**, branch **main**, folder **/(root)**, then Save.
5. After GitHub's deployment completes, the expected URL is https://kennethdevelops.github.io/portfolio/ . This is an expected address, not confirmation of deployment.

GitHub documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Alternatively, create the repository with an initial README, give the ChatGPT GitHub connection access to it, and ask the assistant to upload the prepared website. The available connector cannot create the repository or change Pages settings.

## Edit and preview

Edit index.html (homepage), app.js (project descriptions), style.css (styles), games.js (play view), loops.js (video playback), theme.js and motion.js. Serve this directory locally with `python -m http.server 8000`, then open http://localhost:8000 .

All local links are relative to support /portfolio/ hosting. Do not replace them with root-relative /assets or /games paths.

## Project technologies

- Piece by Piece, Grand Lukto, Bogey Royale and Idle Pizza: Unity, C#.
- Nonna's Kitchen: JavaScript, Three.js/WebGL, HTML/CSS, Web Audio, Gamepad API, localStorage.
- Driving playable ad: JavaScript, Three.js/WebGL, HTML/CSS, Web Audio.

Browser technology labels were checked against the supplied, bundled game HTML files. They do not imply an unverified source language or build tool.

## Credits

Portfolio and project contributions: Kenneth Azcurra. Game art for Nonna's Kitchen and the driving playable ad: Kenney. Piece by Piece: Gamkat, published by No More Robots. Other studio game imagery belongs to its respective owners. Steam and its logo belong to Valve. This export does not grant a licence to redistribute third-party assets independently.

## Verification

JavaScript syntax, local link targets, relative paths and play-view launch/cleanup checks passed. Browser visual checks and GitHub Pages deployment have not yet been verified.
