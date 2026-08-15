import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { SelectedWork } from "@/components/site/SelectedWork";

const title = "Selected Work | Startup Setup";
const description =
  "Digital experiences built for real businesses — see what Startup Setup has shipped.";
const siteUrl = "https://startupsetup.in/work";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <SelectedWork />
      </main>
    </div>
  );
}
