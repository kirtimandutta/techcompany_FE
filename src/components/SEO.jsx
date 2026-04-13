import { useEffect } from "react";

const defaultDesc =
  "CodeNova Technologies builds scalable websites and mobile apps — Website Development, Mobile App Development, and custom digital products.";
const siteName = "CodeNova Technologies";

export default function SEO({
  title,
  description = defaultDesc,
  keywords = "web development, mobile app development, React, Node.js, CodeNova",
}) {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
  }, [fullTitle, description, keywords]);

  return null;
}
