/* ------------------------------------------------------------------ */
/*  Shared data model for the Hero product demo.                      */
/*  One fictional business — Crestline Home Services — with a single  */
/*  source of truth for customers, jobs and team, so the website and  */
/*  the software state reference the exact same records.              */
/* ------------------------------------------------------------------ */

export type JobStatus = "Unassigned" | "Scheduled" | "En route" | "In progress" | "Completed";

export interface ServiceOffering {
  id: string;
  name: string;
  shortName: string;
  duration: string;
  priceFrom: string;
  description: string;
  included: string[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  area: string;
  since: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface Job {
  id: string;
  serviceId: string;
  customerId: string;
  technicianId: string | null;
  status: JobStatus;
  time: string;
  area: string;
}

export const business = {
  name: "Crestline Home Services",
  city: "Bengaluru",
  hours: "Mon–Sat · 8am–8pm",
  phone: "080 4012 5566",
  areas: ["Koramangala", "HSR Layout", "Whitefield", "Indiranagar"],
};

export const services: ServiceOffering[] = [
  {
    id: "electrical",
    name: "Electrical repair & wiring",
    shortName: "Electrical repair",
    duration: "45–60 min",
    priceFrom: "From ₹399",
    description: "Faulty switches, MCB trips, wiring faults and new point installation.",
    included: ["Fault diagnosis included", "Genuine parts", "6-month workmanship warranty"],
  },
  {
    id: "plumbing",
    name: "Plumbing & leak repair",
    shortName: "Plumbing repair",
    duration: "45–60 min",
    priceFrom: "From ₹349",
    description: "Leaking taps, blocked drains, pipe joints and fitting replacements.",
    included: ["Leak test before & after", "No callback fee", "Same-day slots"],
  },
  {
    id: "ac",
    name: "AC service & installation",
    shortName: "AC service",
    duration: "60–90 min",
    priceFrom: "From ₹699",
    description: "Split & window AC servicing, gas top-up and new unit installation.",
    included: ["Manufacturer-trained techs", "Gas check included", "Post-service report"],
  },
  {
    id: "appliance",
    name: "Appliance installation",
    shortName: "Appliance install",
    duration: "45–60 min",
    priceFrom: "From ₹499",
    description: "Geysers, chimneys, washing machines and water purifiers, mounted and tested.",
    included: ["Wall-mount hardware included", "Old unit removed on request", "Tested before we leave"],
  },
];

export const customers: Customer[] = [
  { id: "aarav", name: "Aarav Sharma", phone: "+91 98••• ••42", area: "Koramangala", since: "Jan 2024" },
  { id: "farhan", name: "Farhan Ali", phone: "+91 96••• ••17", area: "HSR Layout", since: "Aug 2023" },
  { id: "rina", name: "Rina Kapoor", phone: "+91 99••• ••85", area: "Whitefield", since: "Mar 2025" },
  { id: "meera", name: "Meera Iyer", phone: "+91 97••• ••63", area: "Indiranagar", since: "Jun 2025" },
];

export const team: TeamMember[] = [
  { id: "imran", name: "Imran Shaikh", role: "Electrician" },
  { id: "suresh", name: "Suresh Kumar", role: "Plumber" },
  { id: "devika", name: "Devika Rao", role: "Installation technician" },
];

export const initialJobs: Job[] = [
  {
    id: "job1",
    serviceId: "ac",
    customerId: "aarav",
    technicianId: "devika",
    status: "En route",
    time: "Today, 11:00 AM",
    area: "Koramangala",
  },
  {
    id: "job2",
    serviceId: "plumbing",
    customerId: "farhan",
    technicianId: "suresh",
    status: "In progress",
    time: "9:40 AM",
    area: "HSR Layout",
  },
  {
    id: "job3",
    serviceId: "electrical",
    customerId: "rina",
    technicianId: "imran",
    status: "Completed",
    time: "8:15 AM",
    area: "Whitefield",
  },
  {
    id: "job4",
    serviceId: "appliance",
    customerId: "meera",
    technicianId: null,
    status: "Unassigned",
    time: "Tomorrow, 10 AM",
    area: "Indiranagar",
  },
];

export const automations = [
  {
    id: "booking",
    name: "New booking",
    trigger: "Runs when a customer confirms a booking on the website.",
    steps: ["Booking received from website", "Technician assigned", "Customer notified on WhatsApp", "Added to schedule"],
  },
  {
    id: "completion",
    name: "Job completed",
    trigger: "Runs when a technician marks a job complete.",
    steps: ["Job marked complete", "Invoice generated", "Receipt sent to customer"],
  },
];

export function serviceById(id: string) {
  return services.find((s) => s.id === id)!;
}
export function customerById(id: string) {
  return customers.find((c) => c.id === id)!;
}
export function technicianById(id: string | null) {
  return id ? team.find((t) => t.id === id) ?? null : null;
}
