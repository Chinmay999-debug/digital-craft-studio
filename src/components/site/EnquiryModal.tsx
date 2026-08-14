import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgawznvr";

const PROJECT_TYPES = [
  "Website",
  "Website + Google Business Profile",
  "Custom software",
  "Automation",
  "Not sure yet",
] as const;

const BUDGETS = [
  "Under ₹15,000",
  "₹15,000 – ₹30,000",
  "₹30,000 – ₹75,000",
  "₹75,000+",
  "Not sure yet",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  business: string;
  email: string;
  phone: string;
  project_type: string;
  project_details: string;
  budget: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  business: "",
  email: "",
  phone: "",
  project_type: "",
  project_details: "",
  budget: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EnquiryModalContext = createContext<(() => void) | null>(null);

export function useEnquiryModal() {
  const openModal = useContext(EnquiryModalContext);
  if (!openModal) {
    throw new Error("useEnquiryModal must be used within an EnquiryModalProvider");
  }
  return openModal;
}

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);

  return (
    <EnquiryModalContext.Provider value={openModal}>
      {children}
      <EnquiryModal open={open} onOpenChange={setOpen} />
    </EnquiryModalContext.Provider>
  );
}

function EnquiryModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function resetState() {
    setForm(EMPTY_FORM);
    setStatus("idle");
    setFormError(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    if (
      !form.name.trim() ||
      !form.business.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.project_type ||
      !form.project_details.trim()
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormError(null);
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) resetState();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/45 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => {
            // Let the first field take focus naturally instead of the close button.
            e.preventDefault();
            document.getElementById("enquiry-name")?.focus();
          }}
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden border border-border bg-ivory text-ink shadow-panel",
            "inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl",
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[85vh] sm:w-[calc(100%-2rem)] sm:max-w-[600px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl",
            "data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=open]:slide-in-from-bottom-0",
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 pt-6 pb-5 sm:px-8">
            <div>
              <span className="label-mono text-brand">
                {status === "success" ? "Enquiry received" : "Start a project"}
              </span>
              <DialogPrimitive.Title className="headline mt-2 text-[1.4rem] sm:text-[1.7rem]">
                {status === "success"
                  ? "Thanks, we'll be in touch."
                  : "Tell us what you're building."}
              </DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-ivory-3 hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>

          <div className="overflow-y-auto px-6 py-6 sm:px-8">
            {status === "success" ? (
              <div className="flex flex-col items-start gap-6">
                <DialogPrimitive.Description className="text-sm leading-relaxed text-muted-foreground">
                  We've received your project details. We'll review them and get back to you
                  shortly.
                </DialogPrimitive.Description>
                <DialogPrimitive.Close className="inline-flex items-center justify-center rounded-md border border-input px-5 py-2.5 text-sm font-medium transition-colors hover:bg-ivory-3">
                  Close
                </DialogPrimitive.Close>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <DialogPrimitive.Description className="-mt-1 text-sm leading-relaxed text-muted-foreground">
                  Tell us a little about your business and what you want to improve. We'll get back
                  to you to discuss the right approach.
                </DialogPrimitive.Description>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="enquiry-name">Name</Label>
                    <Input
                      id="enquiry-name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                      className="h-11"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="enquiry-business">Business / Company</Label>
                    <Input
                      id="enquiry-business"
                      value={form.business}
                      onChange={(e) => update("business", e.target.value)}
                      placeholder="Your business name"
                      className="h-11"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="enquiry-email">Email</Label>
                    <Input
                      id="enquiry-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@company.com"
                      className="h-11"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="enquiry-phone">Phone / WhatsApp</Label>
                    <Input
                      id="enquiry-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="Your phone number"
                      className="h-11"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="enquiry-project-type">What do you need?</Label>
                  <Select
                    value={form.project_type}
                    onValueChange={(v) => update("project_type", v)}
                  >
                    <SelectTrigger id="enquiry-project-type" aria-required="true" className="h-11">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="enquiry-details">Tell us about the project</Label>
                  <Textarea
                    id="enquiry-details"
                    value={form.project_details}
                    onChange={(e) => update("project_details", e.target.value)}
                    placeholder="What are you trying to build, improve or automate?"
                    className="min-h-[100px]"
                    required
                    aria-required="true"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="enquiry-budget">
                    Budget <span className="font-normal text-muted-foreground/70">(optional)</span>
                  </Label>
                  <Select value={form.budget} onValueChange={(v) => update("budget", v)}>
                    <SelectTrigger id="enquiry-budget" className="h-11">
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGETS.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(formError ?? status === "error") && (
                  <p role="alert" className="text-sm text-warn">
                    {formError ??
                      "Something went wrong while sending your enquiry. Please try again."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "submitting" ? (
                    "Sending…"
                  ) : (
                    <>
                      Send project enquiry
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
