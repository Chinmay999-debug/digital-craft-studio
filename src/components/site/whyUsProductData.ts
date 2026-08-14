/* ------------------------------------------------------------------ */
/*  Shared data model for the "Why Startup Setup" mini-product.        */
/*  One fictional business — Bloom Dental Studio — so every state the  */
/*  section cycles through (pipeline, customer record, modules,        */
/*  today's bookings, activity log) reads from the same records.       */
/* ------------------------------------------------------------------ */

export type Stage = "New enquiry" | "Qualified" | "Follow-up" | "Booked" | "Completed";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface Lead {
  id: string;
  name: string;
  source: "Website" | "Phone" | "Referral" | "Instagram";
  service: string;
  stage: Stage;
  assignedTo: string | null;
  bookingTime: string | null;
  whatsapp: "Sent" | "Pending" | "—";
  email: "Sent" | "Pending" | "—";
}

export const business = {
  name: "Bloom Dental Studio",
  city: "Mumbai",
  domain: "app.bloomdental.studio",
};

export const team: TeamMember[] = [
  { id: "ananya", name: "Dr. Ananya Rao", role: "Dentist" },
  { id: "kabir", name: "Dr. Kabir Malhotra", role: "Orthodontist" },
  { id: "neha", name: "Neha Joshi", role: "Care coordinator" },
];

export const leads: Lead[] = [
  {
    id: "rohan",
    name: "Rohan Verma",
    source: "Website",
    service: "Invisalign consult",
    stage: "New enquiry",
    assignedTo: null,
    bookingTime: null,
    whatsapp: "Pending",
    email: "—",
  },
  {
    id: "kavya",
    name: "Kavya Reddy",
    source: "Referral",
    service: "Dental cleaning",
    stage: "Qualified",
    assignedTo: "neha",
    bookingTime: null,
    whatsapp: "Sent",
    email: "—",
  },
  {
    id: "priya",
    name: "Priya Mehta",
    source: "Website",
    service: "Teeth whitening",
    stage: "Follow-up",
    assignedTo: "neha",
    bookingTime: "14 Aug · 4:30 PM",
    whatsapp: "Sent",
    email: "Sent",
  },
  {
    id: "aarav",
    name: "Aarav Sharma",
    source: "Phone",
    service: "Root canal",
    stage: "Booked",
    assignedTo: "ananya",
    bookingTime: "13 Aug · 11:00 AM",
    whatsapp: "Sent",
    email: "Sent",
  },
  {
    id: "farah",
    name: "Farah Sheikh",
    source: "Website",
    service: "Dental cleaning",
    stage: "Booked",
    assignedTo: "neha",
    bookingTime: "13 Aug · 3:00 PM",
    whatsapp: "Sent",
    email: "Pending",
  },
  {
    id: "aditya",
    name: "Aditya Bose",
    source: "Website",
    service: "Cavity filling",
    stage: "Completed",
    assignedTo: "kabir",
    bookingTime: "11 Aug · 9:30 AM",
    whatsapp: "Sent",
    email: "Sent",
  },
];

export const automations = [
  {
    id: "enquiry",
    name: "New enquiry",
    trigger: "Runs when someone submits the website enquiry form.",
    steps: [
      "Website enquiry received",
      "Customer record created",
      "WhatsApp confirmation sent",
      "Assigned to care team",
    ],
  },
  {
    id: "reminder",
    name: "Booking reminder",
    trigger: "Runs 24 hours before a confirmed appointment.",
    steps: ["Appointment confirmed", "Reminder scheduled", "WhatsApp + SMS sent"],
  },
  {
    id: "followup",
    name: "Follow-up nudge",
    trigger: "Runs when a lead has had no reply in 48 hours.",
    steps: ["No reply in 48h", "Follow-up message sent", "Care coordinator notified"],
  },
] as const;

export const activityLog = [
  { time: "09:42", text: "Booking reminder automation updated" },
  { time: "10:18", text: "New follow-up rule added" },
  { time: "11:03", text: "Priya Mehta's status updated to Follow-up" },
  { time: "Yesterday", text: '"Qualified" stage renamed for clarity' },
  { time: "2 days ago", text: "Instagram DM capture automation added" },
] as const;

export const modules = [
  {
    id: "website",
    label: "Website",
    stat: "6 enquiries this week",
    detail: "Booking + enquiry forms",
  },
  { id: "crm", label: "CRM", stat: `${leads.length} active records`, detail: "Leads & customers" },
  { id: "bookings", label: "Bookings", stat: "2 today", detail: "Calendar & scheduling" },
  {
    id: "automations",
    label: "Automations",
    stat: `${automations.length} running`,
    detail: "Reminders & follow-ups",
  },
] as const;

export function leadById(id: string) {
  return leads.find((l) => l.id === id)!;
}
export function teamById(id: string | null) {
  return id ? (team.find((t) => t.id === id) ?? null) : null;
}
export function leadsByStage(stage: Stage) {
  return leads.filter((l) => l.stage === stage);
}

export const stages: Stage[] = ["New enquiry", "Qualified", "Follow-up", "Booked", "Completed"];

export const todaysBookings = leads.filter((l) => l.bookingTime?.startsWith("13 Aug"));
