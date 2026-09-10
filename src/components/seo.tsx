import { useEffect } from "react";
import { useLocation } from "wouter";
interface SEOProps { title: string; description: string; canonical?: string; ogImage?: string; }
export function SEO({ title, description, canonical, ogImage }: SEOProps) {
  const [location] = useLocation();
  useEffect(() => {
    const finalTitle = title.includes('Mitchell Miller') ? title : `${title} | Mitchell Miller`;
    const url = canonical || `https://mitchjmiller.com${location === '/' ? '/' : location.replace(/\/$/,'') + '/'}`;
    const image = ogImage || 'https://mitchjmiller.com/images/portfolio-social.png';
    document.title = finalTitle;
    function meta(key:string,content:string,attribute='name') { let el = document.head.querySelector(`meta[${attribute}="${key}"]`); if (!el) {el = document.createElement('meta');el.setAttribute(attribute,key);document.head.appendChild(el);} el.setAttribute('content',content); }
    meta('description',description); meta('robots',import.meta.env.VITE_SITE_INDEXABLE === 'true' ? 'index, follow, max-image-preview:large' : 'noindex, nofollow, noarchive');
    meta('og:title',finalTitle,'property'); meta('og:description',description,'property'); meta('og:url',url,'property');meta('og:image',image,'property');
    meta('twitter:title',finalTitle);meta('twitter:description',description);meta('twitter:image',image);
    let link = document.head.querySelector('link[rel="canonical"]');if(!link){link=document.createElement('link');link.setAttribute('rel','canonical');document.head.appendChild(link);}link.setAttribute('href',url);
  },[title,description,canonical,ogImage,location]);
  return null;
}
