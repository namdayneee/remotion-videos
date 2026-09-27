# Remotion Visual Learning Studio

## Purpose

This repository is my personal visual learning system.

Its primary purpose is NOT general software development.

Its purpose is to turn technical concepts that I want to understand into clear animated Remotion videos.

I often have difficulty mentally visualizing how computer systems work.

Therefore, when I provide a short topic, concept, question, technology name, command, architecture, or system flow, interpret it as a request to create a Remotion educational visualization.

Examples of valid user prompts:

- docker
- docker hoạt động thế nào
- dns
- nginx reverse proxy
- git rebase
- cpu và ram
- virtual memory
- kubernetes pod
- docker compose up
- browser -> cloudflare -> nginx -> backend -> postgres
- visualize how an HTTP request works

Do not require me to write a long video-generation prompt.

---

# Default Behavior

When my message is primarily a technical topic or a question about how something works:

1. Understand the concept first.
2. Determine the most useful mental model for a beginner.
3. Design a visual explanation.
4. Implement it as a new Remotion composition.
5. Register the composition in the project.
6. Make sure the project compiles.
7. Preserve all existing videos.
8. Tell me the composition name when finished.

Do not merely explain how I could build the video.

Actually implement the Remotion video.

---

# Learning Goal

The main objective is understanding.

Prefer:

- animated architecture diagrams
- moving packets
- data flow
- boxes
- arrows
- layers
- timelines
- terminal commands
- code execution
- state transitions
- zooming between abstraction levels
- highlighting the currently active component

Avoid relying on long paragraphs.

If an idea can be shown visually, show it visually.

---

# Target Audience

Assume I am a beginner who knows basic programming but may not understand the internal system yet.

Do not assume that terms such as:

- kernel
- process
- container
- DNS
- reverse proxy
- socket
- image
- heap
- stack
- runtime
- load balancer

are already visually clear to me.

When necessary, first show the big picture and then zoom into individual components.

---

# Video Style

Unless I explicitly request otherwise:

- Resolution: 1920x1080
- FPS: 30
- Duration: approximately 30-60 seconds
- Language: Vietnamese
- Dark developer-style interface
- Minimal text
- Large readable labels
- Smooth animations
- Clean system diagrams
- Consistent spacing
- Professional but simple appearance

The video is educational, not promotional.

Avoid flashy marketing-style animation.

---

# Preferred Visual Language

Reuse a consistent visual vocabulary.

Examples:

Application:
[ App ]

Database:
[ PostgreSQL ]

Server:
[ Server ]

Container:
┌─────────────┐
│ Container   │
│ App         │
│ Runtime     │
└─────────────┘

Data flow:

Browser
   ↓ HTTP
Nginx
   ↓
Backend
   ↓ SQL
PostgreSQL

Animate arrows or packets instead of only displaying static diagrams.

---

# System Explanations

For system architecture topics, generally use this order when appropriate:

1. Show the complete system.
2. Highlight the component being explained.
3. Show the input.
4. Animate what happens internally.
5. Show the output.
6. Zoom out to reconnect it to the complete system.
7. End with a compact mental model.

Example for Docker:

Source Code
    ↓
Dockerfile
    ↓
docker build
    ↓
Docker Image
    ↓
docker run
    ↓
Container

Then zoom out:

Container
    ↓
Docker Engine
    ↓
Host Kernel
    ↓
Hardware

---

# Network Explanations

For networking concepts:

- visualize packets
- show source and destination
- show protocols
- show ports when relevant
- animate request direction
- animate response direction separately

Example:

Browser
   │
   │ HTTPS :443
   ▼
Nginx
   │
   │ HTTP :8080
   ▼
Backend

Then animate the response travelling back.

---

# Command Explanations

If I provide a command such as:

docker compose up

git push

npm run build

ssh user@server

Do not only display the command.

Visualize what the command causes inside the system.

Example:

docker compose up

docker-compose.yml
        ↓
Docker Compose
        ↓
Network creation
        ↓
Container A
Container B
Database

---

# Code Explanations

If the topic involves code execution:

Show both:

- relevant source code
- what happens internally

For example:

function call
    ↓
call stack
    ↓
stack frame
    ↓
return value

Highlight code lines as their corresponding system state changes.

---

# Composition Rules

Each new topic should normally become its own composition.

Use descriptive PascalCase composition IDs.

Examples:

DockerExplainer
DNSExplainer
NginxReverseProxy
GitRebaseExplainer
VirtualMemoryExplainer
HttpRequestJourney
DockerComposeExplainer

Never delete or overwrite unrelated existing compositions.

Register new compositions in the existing Remotion root.

---

# Architecture

Prefer reusable components over duplicating UI.

As the repository grows, reuse components such as:

- SystemBox
- Arrow
- Packet
- Terminal
- CodeBlock
- Browser
- Database
- Container
- Server
- Caption
- SceneTitle

Reuse the existing visual design system when possible.

Do not introduce unnecessary dependencies.

Do not over-engineer.

---

# Remotion Rules

Use Remotion-native timing.

Prefer:

- useCurrentFrame()
- useVideoConfig()
- interpolate()
- spring()
- Sequence
- Series

Animations must be deterministic based on the current frame.

Do not use CSS transition timing as the primary animation mechanism.

Use the installed Remotion skills and existing repository patterns when useful.

---

# Accuracy

Technical correctness is more important than visual spectacle.

Before visualizing a concept:

- reason through the actual system behavior
- distinguish simplifications from actual implementation
- avoid misleading diagrams

Use simplified mental models when useful, but do not teach something technically false.

---

# Existing Videos

Never destroy an existing explainer just to implement a new one.

New topic:
create a new composition.

Revision request:
modify the relevant existing composition.

If I say:

"docker đoạn kernel chưa rõ"

interpret that as a request to improve the kernel explanation in the existing Docker video.

---

# Validation

After making changes:

1. Ensure TypeScript compiles.
2. Ensure the Remotion bundle can load.
3. Fix errors introduced by the change.
4. Do not leave temporary files behind.
5. Do not render the full MP4 unless I explicitly request rendering.

Studio preview is the normal development target.

---

# Interaction Style

I should not need to give detailed prompts.

Short prompts are intentional.

Examples:

User:
docker

Meaning:
Create a visual Remotion explainer teaching how Docker works.

User:
dns sâu hơn

Meaning:
Improve or create the DNS explainer with a deeper visualization.

User:
thêm đoạn cache

Meaning:
Modify the current relevant composition and visualize caching.

User:
request từ browser tới postgres

Meaning:
Create a visualization of the request flow from browser through the relevant web infrastructure to PostgreSQL and back.

When reasonable, infer the intended visualization instead of asking me to specify animation details.

---

# Most Important Rule

The goal is:

TURN ABSTRACT TECHNICAL KNOWLEDGE INTO SOMETHING I CAN SEE HAPPEN.

Whenever possible:

show it,
move it,
highlight it,
trace it,
zoom into it,

instead of explaining it with paragraphs.

# Audio, Narration and Sound Design

By default, educational videos should be designed with audio in mind.

Use three possible audio layers:

1. Vietnamese narration
2. Sound effects
3. Optional background music

The priority is:

Understanding > Narration > Sound effects > Music.

---

## Default Audio Behavior

Unless I explicitly request otherwise:

- Prepare Vietnamese narration.
- Add subtle sound effects where they improve understanding.
- Do not require background music.
- Keep the video understandable even when muted.

If narration audio cannot be generated automatically, still:
1. Write the narration script.
2. Structure the animation timing around that narration.
3. Leave the composition ready for a narration audio file to be added later.

Do not block creation of the video just because TTS is unavailable.

---

## Narration

Narration should explain what the viewer is currently seeing.

Do not simply read text shown on screen.

Use:
- natural Vietnamese
- short sentences
- beginner-friendly vocabulary
- clear explanations
- comfortable pacing

Avoid:
- long paragraphs
- excessive technical jargon
- repeating labels already visible on screen

For example:

Bad narration:

"Source Code. Dockerfile. Docker Image. Container."

Better narration:

"Đầu tiên chúng ta có mã nguồn của ứng dụng.
Dockerfile mô tả cách đóng gói mã nguồn và các dependency.
Lệnh docker build sử dụng Dockerfile để tạo ra một Docker Image."

---

## Synchronization

Animations should follow narration.

Important visual actions should occur close to the sentence that explains them.

For example:

Narration:
"docker build creates an image."

At that moment visually animate:

Dockerfile
    ↓ docker build
Docker Image

Do not let narration describe something that appeared much earlier or has not appeared yet.

---

## Sound Effects

Use subtle sound effects when useful.

Possible mappings:

component appears:
- soft pop

data moves:
- subtle whoosh

HTTP packet travels:
- soft digital movement sound

terminal typing:
- typing sound

command execution:
- subtle confirmation sound

scene transition:
- very soft transition sound

error:
- subtle error sound

success:
- subtle success sound

Avoid excessive or distracting sound effects.

Sound effects should reinforce system behavior.

---

## Background Music

Background music is optional.

Do not add it unless it improves the video.

If used:

- keep it quiet
- narration must remain clearly audible
- prefer neutral instrumental music
- fade it in and out
- avoid distracting beats or vocals

---

## Audio Assets

Keep reusable audio assets under:

public/audio/

Recommended structure:

public/audio/
  narration/
  sfx/
  music/

Examples:

public/audio/narration/docker.mp3
public/audio/sfx/click.mp3
public/audio/sfx/whoosh.mp3
public/audio/sfx/pop.mp3
public/audio/sfx/typing.mp3
public/audio/music/background.mp3

Reuse existing assets whenever appropriate.

Do not duplicate the same sound effect for every composition.

---

## Remotion Audio

Use Remotion-native audio components.

Prefer audio from @remotion/media.

Use staticFile() for files stored in public/.

Audio must remain synchronized with the Remotion timeline.

Use Sequence or audio timing props when an audio clip should begin at a specific frame.

---

# Short Prompt Modifiers

Interpret these keywords automatically.

## Default

User:
docker

Meaning:

Create a normal educational explainer with:
- visual animation
- Vietnamese narration script
- subtle sound effects
- approximately 30-60 seconds

---

## quick

User:
docker quick

Meaning:

Create a concise version:
- approximately 20-30 seconds
- only essential concepts
- narration
- minimal sound effects

---

## deep

User:
docker deep

Meaning:

Create a deeper explanation:
- approximately 60-120 seconds
- show internal architecture
- explain important intermediate steps
- narration
- system diagrams
- appropriate sound effects

---

## silent

User:
docker silent

Meaning:

Create the explainer without narration.

Use:
- visual animation
- labels
- subtle sound effects if useful

---

## no-sfx

User:
docker no-sfx

Meaning:

Use narration but no sound effects.

---

## visual-only

User:
docker visual-only

Meaning:

No narration.
No music.
No sound effects.

Only visual explanation.

---

# Important Audio Rule

Audio should support the visualization.

The video must never become a podcast with decorative animation.

The visual system explanation remains the primary learning mechanism.