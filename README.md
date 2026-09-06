# Cosmic Explorer

**Role:** You are an expert 3D web developer specializing in React, Three.js, and React Three Fiber (@react-three/fiber).



**Objective:** Build an interactive 3D Solar System web application.



**Core Requirements:**

1. **3D Scene Setup:**

   - Create a 3D canvas with a starry background environment.

   - Add lighting: A central point light inside the Sun to illuminate the planets directionally, plus faint ambient light so the "dark" sides aren't pitch black.

   - Implement `OrbitControls` allowing the user to zoom, pan, and rotate the camera freely.



2. **Aesthetic & Scale (Visual Realism):**

   - Do NOT use true scientific scale. Compress orbital distances and enlarge planetary bodies so the entire solar system fits cohesively on the screen and looks visually striking.

   - Use photorealistic texture mapping for the Sun and all 8 planets (allow placeholders in the code for diffuse, bump, and roughness maps, which I will provide later).



3. **Data Management:**

   - Hardcode all planetary data directly in the code using an array of JavaScript objects. 

   - Each planet object should contain: Name, Type, Mass, Distance from Sun, a short Fun Fact, orbital speed, rotation speed, size (radius), and texture asset paths.

   - Do not use any external APIs to fetch this data.



4. **Interactivity (Tap/Click to View Info):**

   - Animate the planets orbiting the Sun at relative (but visually sped-up) speeds.

   - Implement raycasting: When a user clicks or taps on a specific planet, smoothly animate the camera to zoom in and track that planet.

   - Upon clicking, pause the orbital paths and display an HTML/CSS overlay (UI Card) over the 3D canvas containing the hardcoded data for that planet.

   - Include a "Back to Solar System" button on the UI card to zoom the camera back out, dismiss the card, and resume the orbits.



**Tech Stack:**

- Framework: React (Vite or Next.js)

- 3D Engine: Three.js + `@react-three/fiber`

- Helpers: `@react-three/drei` (for OrbitControls, Stars, HTML overlays, and camera animations)

- Styling: Tailwind CSS (for the 2D info cards)



**Output:** 

Please provide:

1. The project folder structure.

2. The terminal commands to install dependencies.

3. The complete, modular code for the application, including the hardcoded data array.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://solaromkar.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6caf0af6-828f-491e-8647-6cac099f56b5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
