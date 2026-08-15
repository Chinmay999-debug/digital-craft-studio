import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Faq } from "@/components/site/Faq";

const title = "FAQ | Startup Setup";
const description = "Answers to common questions about working with Startup Setup.";
const siteUrl = "https://startupsetup.in/faq";
const ogImage = "https://startupsetup.in/og-image.png";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <Faq headingLevel="h1" />
      </main>
    </div>
  );
}
