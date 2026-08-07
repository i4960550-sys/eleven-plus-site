// Maps each purchasable item's id (see PRODUCTS / BUNDLE in src/App.jsx) to
// the download link a buyer should receive by email.
//
// Host the PDFs somewhere with a shareable link — a Google Drive folder set
// to "Anyone with the link can view" works fine to start, or a Cloudflare R2 /
// S3 bucket if you want something more permanent. Paste each link below.
//
// "single-1".."single-10" are the ten individual sets (see the "Which set?"
// dropdown on the Single Practice Set card). "core" is the 4-set package,
// "premium" is the full 10-set bundle.
export const DOWNLOAD_LINKS = {
  "single-1": "",
  "single-2": "",
  "single-3": "",
  "single-4": "",
  "single-5": "",
  "single-6": "",
  "single-7": "",
  "single-8": "",
  "single-9": "",
  "single-10": "",
  core: "",
  premium: "",
};
