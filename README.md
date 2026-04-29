# International Jewelry Box

Translation, but with style and without lying about what it does.

International Jewelry Box is a growing collection of creative micro-tools built to feel more playful, polished, and visually alive than standard utility apps. The first live compartment is **Translation Gem**: a static translation app with a dramatic visual shell, browser speech features, and device-local saved phrases.

## Live Site

- https://dacameragirl.github.io/international-jewelry-box/

## Current Compartment: Translation Gem

Translation Gem is the active tool in this repo today. It focuses on fast browser-based translation with a more expressive UI than a plain form-and-button translator.

## What Is Built Now

- 26 target languages
- source-language auto-detection
- live translation after a short pause
- copy to clipboard
- recent translation history stored locally
- favorites stored locally
- browser text-to-speech for source and translated text
- browser voice input where speech recognition is supported
- multiple visual themes, including a light mode
- installable PWA shell
- offline access to the app shell and saved entries

## Honest Notes

- fresh translations still require a network connection
- translation currently depends on public endpoints, so long-term reliability is not guaranteed yet
- voice input and speech playback depend on browser support
- this project is still fully client-side and does not use a private backend

If you want stronger production reliability later, the next step is moving translation calls behind a small serverless proxy with a real translation API.

## Supported Languages

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

## Local Development

Clone the repo:

```bash
git clone https://github.com/DaCameraGirl/international-jewelry-box.git
```

Open `index.html` directly in a browser, or serve the folder locally:

```bash
npx serve .
```

## Roadmap

### High Priority

- replace public translation endpoints with a more reliable low-cost API path
- improve accessibility for contrast, focus, readable motion, and keyboard flow
- tighten mobile behavior and overall UX polish

### Medium Priority

- improve pronunciation and language-specific speech handling
- add better export and sharing options for saved translations
- expand the Jewelry Box with more compartments

### Lower Priority

- more theme packs and visual variants
- richer animation passes where they help rather than distract

## GitHub Label Guide

- `gem: idea` new compartment or feature idea
- `gem: translation` translation feature work
- `gem: design` UI, motion, themes, layout, visual polish
- `gem: pwa` offline support, installability, manifest, service worker
- `gem: accessibility` contrast, keyboard flow, legibility, inclusive UX
- `gem: content` README, copywriting, docs, supported language notes
- `gem: bug` broken behavior
- `gem: polish` smaller refinements and cleanup
- `priority: high` important and should happen soon
- `priority: medium` useful but not urgent
- `priority: low` nice sparkle, not critical
- `status: blocked` waiting on something else
- `status: ready` ready to build
- `good first gem` beginner-friendly contribution

## Contributing

Good contribution areas:

- translation reliability
- visual refinement
- mobile polish
- accessibility improvements
- new compartments
- documentation cleanup

## License

MIT License

## Author

Angela Hudson (`DaCameraGirl`)
