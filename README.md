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

# URL Parameters Reference

This application uses URL parameters to control YouTube playback and AlphaTab synchronization.

---

## t (YouTube Start Time)

Defines the start position of the YouTube video when loaded.

### Format
?t=5s

### Example
https://youtube.com/watch?v=xxxx&t=5s

### Supported formats
- `30s` → 30 seconds
- `1m` → 1 minute
- `1m30s` → 1 minute 30 seconds

---

## offset (AlphaTab Sync Offset)

Adjusts synchronization between YouTube audio and AlphaTab rendering.

### Format
&offset=1s
&offset=-0.5s

### Example
https://youtube.com/watch?v=xxxx&t=5s&offset=1s

---

### How it works

- `offset > 0` → AlphaTab runs ahead (tab is earlier)
- `offset < 0` → AlphaTab runs behind (audio is ahead)

---

### Use cases

- Fix timing delay between YouTube and AlphaTab
- Manual sync calibration
- Compensate browser/audio latency
- Fine-tune groove and feel accuracy

---

## Example

https://youtube.com/watch?v=xxxx&t=5s&offset=0.8s

Meaning:
- YouTube starts at 5 seconds
- AlphaTab is shifted forward by 0.8 seconds for sync alignment

---

## Notes

- This is not an official YouTube parameter
- It is only interpreted by this application
- It has no effect on YouTube itself