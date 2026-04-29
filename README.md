# International Jewelry Box

Beautiful translation, kept honest.

International Jewelry Box is a static translation app with a neon-leaning visual style, device-local saved phrases, and a lightweight PWA shell. It is the first "compartment" in a broader collection of playful micro-tools.

Live site:

- https://dacameragirl.github.io/international-jewelry-box/

## What It Does Right Now

- Translates text across 26 target languages
- Auto-detects the source language when needed
- Updates translation after a short typing pause
- Saves recent translations locally on the device
- Lets users save favorites locally
- Copies translated text to the clipboard
- Supports browser text-to-speech for source and translated text
- Supports browser voice input where speech recognition is available
- Includes multiple themes, including a light mode
- Works as an installable PWA
- Keeps the app shell and saved entries available offline

## Important Reality Check

- Live translation still depends on public translation endpoints
- Offline mode preserves the interface and saved entries, not fresh translations
- Voice input and speech playback depend on browser support
- This is a client-side app with no private backend yet

If you want stronger reliability later, the next step is moving translation requests behind a small serverless proxy with a real paid API.

## Supported Languages

The current app supports these target languages:

- Arabic
- Chinese
- Czech
- Dutch
- English
- Filipino
- French
- German
- Greek
- Hebrew
- Hindi
- Hungarian
- Indonesian
- Italian
- Japanese
- Korean
- Polish
- Portuguese
- Romanian
- Russian
- Spanish
- Swedish
- Thai
- Turkish
- Ukrainian
- Vietnamese

## Project Structure

```text
international-jewelry-box/
├── index.html
├── manifest.json
├── sw.js
├── icon-192.png
├── icon-512.png
└── README.md
```

## Local Use

Clone the repository:

```bash
git clone https://github.com/DaCameraGirl/international-jewelry-box.git
```

Open `index.html` directly in a browser, or serve the folder locally:

```bash
npx serve .
```

## Roadmap

These are the most useful next steps, in order:

- Replace public translation endpoints with a reliable low-cost API path
- Improve pronunciation controls and language-specific speech handling
- Add better accessibility tuning for contrast, focus, and motion sensitivity
- Expand the app into more "compartments" beyond translation
- Add export and sharing formats for saved translations

## GitHub Label Guide

Suggested label meanings for this repo:

- `gem: idea` new compartment or feature idea
- `gem: translation` translation feature work
- `gem: design` UI, motion, themes, layout, visual polish
- `gem: pwa` offline support, installability, manifest, service worker
- `gem: accessibility` contrast, keyboard flow, legibility, inclusive UX
- `gem: content` README, copywriting, docs, supported language notes
- `gem: bug` broken behavior
- `gem: polish` smaller refinements and cleanup
- `priority: high` important soon
- `priority: medium` useful but not urgent
- `priority: low` nice to have
- `status: blocked` waiting on something else
- `status: ready` ready to build
- `good first gem` beginner-friendly contribution

## Contributing

Contributions are welcome, especially for:

- translation reliability
- visual refinement
- mobile behavior
- accessibility improvements
- additional compartments

## License

MIT License

## Author

Angela Hudson (DaCameraGirl)
