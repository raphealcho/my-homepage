import {getTranslator} from '@/lib/language';
import {pageMetadata} from '@/lib/seo';

export async function generateMetadata(){return pageMetadata(
  'View',
  'Watch the KIKAE story and explore our website. Tools Become Culture.',
  '/page',
);}

// Add the YouTube video URL in .env.local or Vercel, then rebuild/redeploy.
const storyUrl = process.env.NEXT_PUBLIC_STORY_VIDEO_URL?.trim();

function StoryLabel({t}: {t: (text:string)=>string}) {
  return <>
    <span className="view-title">{t("WATCH OUR STORY")}</span>
    <span className="view-caption">{t("Watch our story")}<span aria-hidden="true">↗</span></span>
  </>;
}

export default async function ViewPage(){const t=await getTranslator();
  return <section className="view-page">
    <h1 className="sr-only">{t("KIKAE — View")}</h1>
    {storyUrl ? (
      <a className="view-action story-action" href={storyUrl} target="_blank" rel="noopener noreferrer" aria-label={t("Watch our Story on YouTube")}>
        <StoryLabel t={t}/>
      </a>
    ) : (
      <div className="story-placeholder">
        <button className="view-action story-action" type="button" disabled aria-describedby="story-status">
          <StoryLabel t={t}/>
        </button>
        <span className="story-status" id="story-status">{t("COMING SOON")}</span>
      </div>
    )}
    <a className="view-action website-action" href="/" aria-label={t("Visit website — KIKAE home")}>
      <span className="view-title">{t("VISIT - WEBSITE")}</span>
      <span className="view-caption">{t("Visit our website")}<span aria-hidden="true">↗</span></span>
    </a>
  </section>;
}
