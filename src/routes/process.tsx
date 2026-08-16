import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Process } from "@/components/site/Process";

const title = "Our Process | Startup Setup";
const description =
  "From idea to something your business can actually use. How Startup Setup works.";
const siteUrl = "https://startupsetup.in/process/";
const ogImage = "https://startupsetup.in/og-image.png";

export const Route = createFileRoute("/process")({
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
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <Process headingLevel="h1" />
      </main>
    </div>
  );
}
