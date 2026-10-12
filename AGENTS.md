# imageUpload — project notes

## Style guide

For any HTML or CSS built in this workspace, read `style-brief.md` and follow it exactly.
It defines the "dark dev-docs" aesthetic used by `index.html` and `guide.html`.

The one rule that matters most: **depth comes from 1px borders, never `box-shadow`.**
Plus: one accent colour used sparingly, system font stack, ~780px content measure.

## What this project is

A Supabase image-upload demo.

- `index.html` — working uploader: uploads to the `images` bucket, saves the path to the `images` table
- `guide.html` — beginner-friendly guide explaining the same flow end to end
- `style-brief.md` — the reusable design spec
- `moonface.png` — test image

## Backend facts

- Supabase project: `https://decwucuwqnzrxzbxxifu.supabase.co`
- Bucket: `images` (public)
- Table: `images (id bigint identity, path text)`
- `path` stores the object key **relative to the bucket** — it is not a URL.
  Build the URL as `{project}/storage/v1/object/public/{bucket}/{path}`,
  or use `sb.storage.from('images').getPublicUrl(path)`.

## Gotchas learned here

- The publishable key **can** insert into `images` and upload to the bucket (RLS is open by design).
- `storage.list()` returns `[]` for a missing bucket instead of erroring — use
  `storage.getBucket()` to actually detect a missing bucket.
- `getBucket` lives on `sb.storage`, **not** on `sb.storage.from(...)`.
- Serve pages over `http://` — `file://` can trigger CORS failures against Supabase.
