import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Faq } from "@/components/site/Faq";

const title = "FAQ | Startup Setup";
const description = "Answers to common questions about working with Startup Setup.";
const siteUrl = "https://startupsetup.in/faq";

export const Route = createFileRoute("/faq")({
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
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <Faq />
      </main>
    </div>
  );
}
