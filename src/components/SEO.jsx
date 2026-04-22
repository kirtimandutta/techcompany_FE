import { useEffect } from "react";
import {
  DEFAULT_SEO_DESCRIPTION,
  DEFAULT_SEO_TITLE,
  SITE_NAME,
} from "../constants/site.js";

export default function SEO({
  title,
  description = DEFAULT_SEO_DESCRIPTION,
  keywords = "web development, mobile app development, React, Node.js, Tothyo.IT",
}) {
  const fullTitle = title ? `${SITE_NAME} | ${title}` : DEFAULT_SEO_TITLE;

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
