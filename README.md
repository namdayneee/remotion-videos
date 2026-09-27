# Remotion Visual Learning Studio

Short visual explainers for learning how computer systems work.

## Run locally

Requirements: Node.js 22 or newer and npm. In Git Bash, WSL, or a terminal inside Cursor:

```bash
git clone https://github.com/namdayneee/remotion-videos.git
cd remotion-videos
npm ci
npm run dev
```

Choose `DockerExplainer` in Remotion Studio. This is a 1080 × 1920, 30 FPS, 35-second dashboard. `WebRequestExplainer` remains the original horizontal composition.

```bash
npm run lint
npm test
npm run build
npm run render:docker
```

The MP4 is written to `out/docker-explainer.mp4` and ignored by Git.

## Make another explainer

Ask your coding agent for a short topic such as `dns` or `docker deep`. `AGENTS.md` describes the visual style and workflow. Docker content lives in `src/data/dockerSteps.ts`, reusable dashboard pieces in `src/components/`, and colors in `src/theme/tokens.ts`. Register every new composition in `src/Root.tsx` without removing existing videos.

The Docker composition is silent until audio assets are added. You can add licensed or self-recorded narration and effects under `public/audio/`; use `staticFile()` and Remotion's timeline to synchronize them. Never assume that the written narration script is already an audible voice track.
