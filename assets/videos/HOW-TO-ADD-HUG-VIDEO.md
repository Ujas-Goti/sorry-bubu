# How to add your transparent hug video

Drop your files in this folder:

```
assets/videos/
  hug.mov    ← for iPhone Safari (required for her phone)
  hug.webm   ← optional backup for Chrome/Android
```

## What format?

Regular MP4 **does not** keep transparency. You need **alpha channel** video.

### For iPhone (most important)

Export as **`hug.mov`** with:
- Codec: **HEVC (H.265)**
- **Alpha channel enabled** (transparent background)

**After Effects**
1. Composition → Add to Render Queue
2. Format: **QuickTime**
3. Channels: **RGB + Alpha**
4. Codec: **Apple ProRes 4444** or **HEVC with Alpha**
5. Save as `hug.mov`

**CapCut / mobile apps**
- Export as MOV with transparent background if the app supports it
- Or export green-screen MP4 and convert (see below)

**Online converter**
- Search: "convert to hevc alpha mov" or use [cloudconvert.com](https://cloudconvert.com)

### Optional: WebM for other browsers

Export **`hug.webm`** with **VP9 + alpha** (e.g. via FFmpeg):

```bash
ffmpeg -i your-source.mov -c:v libvpx-vp9 -pix_fmt yuva420p hug.webm
```

## Tips for best results

- Keep it **short** (2–5 seconds) — scroll will scrub through the whole clip
- **Square or portrait** works best on phone
- Start the clip at the moment they **begin** hugging (or slightly before)
- If you only have green screen, remove it first, then export with alpha

## Fallback

Until you add the video files, the site shows the static holding-hands image automatically.
