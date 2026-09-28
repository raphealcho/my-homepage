import {pageMetadata} from '@/lib/seo';

export const metadata = pageMetadata(
  'View',
  'Watch the KIKAE story and explore our website. Tools Become Culture.',
  '/page',
);

// Add the YouTube video URL in .env.local or Vercel, then rebuild/redeploy.
const storyUrl = process.env.NEXT_PUBLIC_STORY_VIDEO_URL?.trim();

function StoryLabel() {
  return <>
    <span className="view-title">WATCH OUR STORY</span>
    <span className="view-caption" lang="ja">会社紹介動画を見る <span aria-hidden="true">↗</span></span>
  </>;
}

export default function ViewPage() {
  return <section className="view-page">
    <h1 className="sr-only">KIKAE — View</h1>
    {storyUrl ? (
      <a className="view-action story-action" href={storyUrl} target="_blank" rel="noopener noreferrer" aria-label="Watch our Story on YouTube">
        <StoryLabel/>
      </a>
    ) : (
      <div className="story-placeholder">
        <button className="view-action story-action" type="button" disabled aria-describedby="story-status">
          <StoryLabel/>
        </button>
        <span className="story-status" id="story-status">COMING SOON</span>
      </div>
    )}
    <a className="view-action website-action" href="/" aria-label="Visit website — KIKAE home">
      <span className="view-title">VISIT - WEBSITE</span>
      <span className="view-caption" lang="ja">会社紹介動画を見る <span aria-hidden="true">↗</span></span>
    </a>
  </section>;
}
