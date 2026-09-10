import { getUiTexts, LandingTexts } from "@/services/uiTexts";
import { getAllProjects } from "@/services/projects";
import { getFormations } from "@/services/formationApi";
import { getService } from "@/services/servicesApi";
import { attachGithubRecency } from "@/services/landingExtra";
import { getYoutubeVideos } from "@/services/youtube";
import { tallySkillsByProject } from "@/utilis/skill-project-count";

import { FeaturedProjectsSection } from "./_components/featured-projects-section";
import { SkillsHighlightsSection } from "./_components/skills-highlights-section";
import { LandingStatsSection } from "./_components/landing-stats-section";
import { LandingCtaSection } from "./_components/landing-cta-section";
import { LatestVideoSection } from "./_components/latest-video-section";
import { SectionRetry } from "./_components/section-retry";

export const revalidate = 60;

interface LandingExtrasProps {
  language: string;
}



export async function LandingExtras({ language }: LandingExtrasProps) {
  const texts = await getUiTexts<LandingTexts>("landing", language);
  // Runs in parallel, inside the Suspense boundary set up in page.tsx — this
  // (including the GitHub lookups, which can be slow) never blocks the Hero.
  const [featuredResult, allProjectsResult, formationsResult, servicesResult, videosResult] = await Promise.allSettled([
    attachGithubRecency(language),
    getAllProjects(language),
    getFormations(language),
    getService(language),
    getYoutubeVideos(1),
  ]);

  if (featuredResult.status === "rejected") console.error("Error fetching featured projects:", featuredResult.reason);
  if (allProjectsResult.status === "rejected")
    console.error("Error fetching all projects for skill counts:", allProjectsResult.reason);
  if (formationsResult.status === "rejected")
    console.error("Error fetching formations for stats strip:", formationsResult.reason);
  if (servicesResult.status === "rejected")
    console.error("Error fetching services for landing CTA:", servicesResult.reason);
  if (videosResult.status === "rejected") console.error("Error fetching latest YouTube video:", videosResult.reason);

  const featuredProjects = featuredResult.status === "fulfilled" ? featuredResult.value : null;
  const allProjects = allProjectsResult.status === "fulfilled" ? allProjectsResult.value.projects : null;
  const formations = formationsResult.status === "fulfilled" ? formationsResult.value : null;
  const services = servicesResult.status === "fulfilled" ? servicesResult.value : null;
  const videos = videosResult.status === "fulfilled" ? videosResult.value : null;
  const latestVideo = videos?.[0] ?? null;

  // Counts (and which skills get featured) come from the full project list,
  // not just the featured ones above — "used in N projects" means all of them.
  const topSkills = allProjects ? tallySkillsByProject(allProjects).slice(0, 10) : null;

  return (
    <section className="w-full lg:w-screen">
      {featuredProjects === null ? (
        <SectionRetry
          message={texts.projectsError}
          retryLabel={texts.retry}
        />
      ) : (
        featuredProjects.length > 0 && <FeaturedProjectsSection projects={featuredProjects} texts={texts} />
      )}

      {topSkills === null ? (
        <SectionRetry
          message={texts.skillsError}
          retryLabel={texts.retry}
        />
      ) : (
        topSkills.length > 0 && <SkillsHighlightsSection skills={topSkills} texts={texts} />
      )}

      {formations === null ? (
        <SectionRetry
          message={texts.statsError}
          retryLabel={texts.retry}
        />
      ) : (
        formations.formations.length > 0 && (
          <LandingStatsSection formations={formations.formations} texts={formations.texts.stats} language={language} />
        )
      )}

      {videos === null ? (
        <SectionRetry
          message={texts.videoError}
          retryLabel={texts.retry}
        />
      ) : (
        latestVideo && <LatestVideoSection video={latestVideo} texts={texts} />
      )}

      {services === null ? (
        <SectionRetry
          message={texts.sectionError}
          retryLabel={texts.retry}
        />
      ) : (
        services.texts.cta && <LandingCtaSection texts={services.texts} language={language} />
      )}
    </section>
  );
}
