# FIX: Intel drop "video too large" — ready to apply to xpert-command-center

*Written 2026-08-06 by the remote build session (repo access pending approval). Any Claude
session with the xpert-command-center source applies this in ~15 min. Nothing here is
speculative — the root cause is a platform hard limit.*

## Root cause
The Intel Drop UI (mobile.html) base64-encodes attachments into the JSON body of
`POST /api/intel`. **Vercel serverless functions reject request bodies over 4.5 MB —
platform hard cap, not configurable.** Base64 adds +33%, so any video over ~3 MB fails
with "too large". Storing base64 in intel-store `drops.json` also bloats the repo
(it's already ~12 MB).

## Fix: client → Vercel Blob direct upload; the drop stores only a URL

1. **Renée's one switch (1 min):** Vercel dashboard → xpert-command-center project →
   Storage → **Create Blob store** (Hobby tier is fine). This auto-adds
   `BLOB_READ_WRITE_TOKEN` to the project env.

2. **Add `api/blob-upload.js`:**
```js
import { handleUpload } from '@vercel/blob/client';

export default async function handler(req, res) {
  const jsonResponse = await handleUpload({
    body: req.body,
    request: req,
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: ['video/*', 'image/*', 'application/pdf'],
      maximumSizeInBytes: 500 * 1024 * 1024, // 500 MB
      addRandomSuffix: true,
    }),
    onUploadCompleted: async () => {},
  });
  return res.status(200).json(jsonResponse);
}
```
   `npm i @vercel/blob` in the project.

3. **mobile.html Intel Drop UI** — replace the base64 path for files > 3 MB (and ALL
   videos regardless of size):
```js
import { upload } from 'https://esm.sh/@vercel/blob/client';
// in the file-select handler:
if (file.size > 3_000_000 || file.type.startsWith('video/')) {
  const blob = await upload(file.name, file, {
    access: 'public',
    handleUploadUrl: '/api/blob-upload',
    onUploadProgress: (e) => setProgress(e.percentage), // wire to a progress bar
  });
  attachments.push({ name: file.name, url: blob.url, size: file.size, type: file.type });
} else {
  /* existing base64 path for small files */
}
```
   Show a simple progress % while uploading (videos take a moment on mobile data).

4. **`/api/intel` handler:** accept `files[]` entries shaped `{name,url,size,type}`
   (no `data` field) and store them as-is in the drop. No other change — drops.json
   stays small because big files are URLs now.

5. **Intel readers** (intel-auto cron, Console, Claude sessions): a drop's file with
   a `url` field is fetched from Blob, not decoded from base64. Blob URLs are public;
   fine for intel material, but do NOT use this path for client PII.

## Verify
Upload a >50 MB video from the phone UI → drop appears with a blob URL → open URL plays
the video → drops.json grew by ~200 bytes, not 70 MB.

## Note for the doc-collector app (this project)
Same pattern applies later if client doc uploads ever exceed 4.5 MB on Vercel — but
client documents are PII: use `access: 'private'`-equivalent (Supabase Storage signed
URLs, already the plan) — NOT public Blob.
