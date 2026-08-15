import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { SelectedWork } from "@/components/site/SelectedWork";

const title = "Selected Work | Startup Setup";
const description =
  "Digital experiences built for real businesses — see what Startup Setup has shipped.";
const siteUrl = "https://startupsetup.in/work/";
const ogImage = "https://startupsetup.in/og-image.png";

export const Route = createFileRoute("/work")({
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
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <SelectedWork headingLevel="h1" />
      </main>
    </div>
  );
}
