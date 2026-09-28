# Remotion Visual Learning Studio

Personal visual learning system: turn technical concepts into animated Remotion videos.

A short topic, question, command, or system flow from me (e.g. `docker`, `dns`, `nginx reverse proxy`, `git rebase`, `docker compose up`, `browser -> nginx -> backend -> postgres`) is a request to create an educational Remotion visualization. Never require a long prompt; infer the intended visualization.

"X đoạn Y chưa rõ" or "thêm đoạn Y" = revise/extend the relevant existing composition.

---

# Default Behavior

1. Understand the concept → pick the best beginner mental model.
2. Design the visual explanation.
3. Implement it as a new Remotion composition (actually build it, don't just describe).
4. Register it in the existing Remotion root.
5. Ensure the project compiles; preserve all existing videos.
6. Tell me the composition name when finished.

---

# Video Style

Unless I request otherwise:

- 1080x1920 (9:16) for new explainers; keep older compositions at their existing dimensions
- FPS 30, duration ~30–60s
- Vietnamese, dark developer UI, minimal text, large readable labels, captions readable on a phone
- Smooth deterministic animations, clean diagrams, consistent spacing
- Educational, not promotional; no flashy marketing animation

## Dashboard layout (step-by-step explainers)

One persistent dashboard: title, step rail, terminal, and system panels anchored in place; animate state inside them.

- Active step highlighted cyan, completed green, upcoming dimmed
- Commands, nodes, connections, packets animated from the current Remotion frame
- The viewer sees one system evolving through the steps

Reference: `src/data/dockerSteps.ts`, `src/components/`, `src/theme/tokens.ts`. New subject = new composition with its own step data or simulator; share presentation components when they fit. Don't force every concept into a ten-step list if another diagram explains it better.

---

# Visual Language

- Boxes for components (`[ App ]`, `[ PostgreSQL ]`), animated arrows/packets for data flow — never just static diagrams
- Networks: show packets, source/destination, protocol, ports; animate request and response separately
- Commands: visualize what the command causes inside the system, not just the command text
- Code: show source code alongside internal state; highlight lines as state changes
- Prefer animated architecture diagrams, data flow, layers, timelines, state transitions, zooming between abstraction levels, highlighting the active component over paragraphs

## Explanation order (when appropriate)

1. Show the complete system
2. Highlight the component being explained
3. Show input → animate what happens internally → show output
4. Zoom out to the complete system
5. End with a compact mental model

## Audience

Beginner with basic programming. Don't assume kernel, process, container, DNS, socket, heap/stack, runtime, load balancer are visually clear. Big picture first, then zoom in.

---

# Composition Rules

- Each new topic = its own composition, PascalCase ID (e.g. `DockerExplainer`, `DNSExplainer`, `HttpRequestJourney`)
- Never delete or overwrite unrelated existing compositions
- Register new compositions in the existing Remotion root

# Architecture

- Reuse components (SystemBox, Arrow, Packet, Terminal, CodeBlock, Browser, Database, Container, Server, Caption, SceneTitle) and the existing design system
- No unnecessary dependencies, no over-engineering

# Remotion Rules

- Timing must be deterministic on the frame: `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, `spring()`, `Sequence`, `Series`
- Never use CSS transitions as the primary animation mechanism
- Use installed Remotion skills and existing repo patterns when useful

# Accuracy

Technical correctness > visual spectacle. Simplified mental models are fine; teaching something false is not.

---

# Audio

Priority: **Understanding > Narration > SFX > Music**. Design with audio in mind; video must still work muted. Audio never turns the video into a podcast with decorative animation.

- Vietnamese narration script always written, natural and beginner-friendly, explaining what's on screen (not reading labels). Animation timed to the narration; important visuals occur near the sentence that explains them.
- If TTS is unavailable: still write the script, time animations to it, leave the composition ready for a narration file. Never block the video on TTS.
- Subtle SFX only, where they aid understanding: pop (component appears), whoosh (data moves), typing (terminal), confirmation (command runs), soft transition/error/success. Reuse existing assets.
- Background music optional; if used: quiet, instrumental, faded, narration stays audible.
- Assets in `public/audio/{narration,sfx,music}/`; Remotion audio via `staticFile()` (prefer `@remotion/media`), synced to the timeline with `Sequence`/timing props.

---

# Prompt Modifiers

| Prompt | Meaning |
|---|---|
| `docker` | Default: 30–60s, narration script, subtle SFX |
| `docker quick` | 20–30s, essential concepts only, minimal SFX |
| `docker deep` | 60–120s, internal architecture, intermediate steps |
| `docker silent` | No narration; visuals + labels, subtle SFX if useful |
| `docker no-sfx` | Narration but no sound effects |
| `docker visual-only` | No narration, music, or SFX — visuals only |

---

# Validation

After changes:

1. TypeScript compiles and the Remotion bundle loads.
2. Fix errors introduced by the change.
3. `npm test` for compositions with timeline data; preview representative frames, check text fit.
4. No temp files left behind.
5. Never render the full MP4 unless explicitly asked — Studio preview is the dev target.

---

# Most Important Rule

TURN ABSTRACT TECHNICAL KNOWLEDGE INTO SOMETHING I CAN SEE HAPPEN: show it, move it, highlight it, trace it, zoom into it — instead of explaining with paragraphs.