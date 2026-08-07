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
  "single-1": "https://drive.google.com/drive/folders/1q6Eo-yICg5XLtIIB7dSuClTbi8pSMeR9?usp=drive_link",
  "single-2": "https://drive.google.com/drive/folders/1n5xZCMnoyUXs4A3FbLLdDjDE3KsitGns?usp=drive_link",
  "single-3": "https://drive.google.com/drive/folders/1CLVgN5Ea7YEeFWOgPlMbxYXIF7x0tP7I?usp=drive_link",
  "single-4": "https://drive.google.com/drive/folders/1fH2jYGogL7nuFpWWy5-8wHaLua9ciYle?usp=drive_link",
  "single-5": "https://drive.google.com/drive/folders/1YrMOHOuctClRz3QoYEIlI87fpkCmOBh-?usp=drive_link",
  "single-6": "https://drive.google.com/drive/folders/1YTD6kcfprvDQaFjJvFEhZgFwEeNpfmJg?usp=drive_link",
  "single-7": "https://drive.google.com/drive/folders/1pFiP8UTeE6nHcActogPC-7GapsvSjF5L?usp=drive_link",
  "single-8": "https://drive.google.com/drive/folders/1_hRq6kZcEbX-hHwX0fmD9h7JV2zo47pr?usp=drive_link",
  "single-9": "https://drive.google.com/drive/folders/1UsgC4Z6XBoobfnoVWQY_T6oJHKnGCaAr?usp=drive_link",
  "single-10": "https://drive.google.com/drive/folders/17gECD4B0qz7DuB9SFSky316otgfomTPH?usp=drive_link",
  core: "https://drive.google.com/drive/folders/1v4UWjqQ7IgySaUe_pNDvE8PMHRI3tt9f?usp=drive_link",
  premium: "https://drive.google.com/drive/folders/19T5ZT2m4cD6I3BVVLaOyJNVqcdCYwzuT?usp=drive_link",
};
