// Reels, TikTok and Shorts draw their own UI over a 9:16 video: account name
// and caption along the bottom, action buttons up the right, a header on top.
// Everything that has to be read stays inside this box. The backdrop still
// bleeds to the edges.
export const SAFE = { top: 210, bottom: 380, x: 80 };

export const safeScene = {
  padding: `${SAFE.top}px ${SAFE.x}px ${SAFE.bottom}px`,
};

export const CONTENT_W = 1080 - SAFE.x * 2;
