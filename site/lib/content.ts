// One source for public content and image references across both review tracks.
// Public parity uses the production snapshot; the candidate may also show the
// previously reviewed expanded narratives without silently changing parity.
export {caseStudies, blogPosts} from '../../baseline/src/lib/data';
export {portfolioImages, headshot} from '../../baseline/src/lib/images';
export {resumeOptions} from '../../baseline/src/lib/resumes';
export {studyEditorial} from '../../src/lib/case-study-editorial';
export const sfcEvidenceImages = [
  {src:'/images/portfolio-proof/sfc-south-shore-explorer.png',alt:'SFC Surf School interactive South Shore surf-break explorer',caption:'Production release review, September 10, 2026. Aerial: USDA-FSA NAIP, January 27, 2022, via NOAA Digital Coast.'},
  {src:'/images/portfolio-proof/sfc-search-console-insights.jpg',alt:'SFC Google Search Console Insights showing the recorded search comparison',caption:'Google Search Console: August 12–September 8 versus July 15–August 11, 2026. The explorer launched September 10, after this measurement period.'},
];
