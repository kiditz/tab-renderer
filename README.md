# TabSync Player

A personal guitar tab renderer built with Vue, Vite, and alphaTab.

This project started from a simple frustration: I wanted to practice guitar with YouTube backing tracks while following Guitar Pro tabs, but existing solutions either required a subscription or lacked features that I personally needed.

So I built my own.

## Features

- Render Guitar Pro files (`.gp`, `.gpx`, `.gp3`, `.gp4`, `.gp5`)
- YouTube playback synchronization
- Playback speed control
- Loop selection
- Metronome support
- Count-in support
- Zoom controls
- Multiple layout modes
- Track mute / solo controls
- Responsive UI for desktop and mobile devices

## Why?

I often learn songs from YouTube covers, backing tracks, and live performances.

While Songsterr provides YouTube synchronization as a premium feature, I wanted:

- Full control over synchronization
- Built-in metronome while using YouTube audio
- A lightweight web-based solution
- No subscription requirement
- A playground for experimenting with alphaTab

This project is primarily built for personal use and learning purposes.

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Pinia
- Vuetify
- alphaTab
- YouTube IFrame API

## Current Status

The application is actively developed and used as a personal guitar practice tool.

## Disclaimer

This project does not provide copyrighted tablature content.

Users must provide their own Guitar Pro files and YouTube links.


## Install
```
npm i
npm run build
```
Note: copy file *.mjs, *.js, *.ts from node_modules/@coderline/alphatab to dist/assets after build, now you can use your own http server
```
cd dist
python3 -m http.server
```
## Development
```
npm i
npm run dev
```