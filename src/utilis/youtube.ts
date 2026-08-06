const YOUTUBE_ID_PATTERN = /(?:v=|youtu\.be\/|embed\/)([\w-]{11})/;

/** Fallback video id used when a stored URL doesn't match the expected YouTube formats. */
const FALLBACK_VIDEO_ID = "FwDo7MdaxhA";

export function isYoutubeUrl(url: string): boolean {
  return YOUTUBE_ID_PATTERN.test(url);
}

/** Converts a regular YouTube URL (watch/share/embed) into its embeddable form. */
export function youtubeEmbedUrl(url: string): string {
  const videoId = url.match(YOUTUBE_ID_PATTERN)?.[1] ?? FALLBACK_VIDEO_ID;
  return `https://www.youtube.com/embed/${videoId}`;
}
