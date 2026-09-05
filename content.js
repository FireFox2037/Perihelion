/*
  =========================================================
  EDIT THIS FILE to put in your own content.
  You do not need to touch app.js or style.css to update
  your research, articles, bio, or contact details.
  =========================================================
*/

const SITE = {
  name: "Winnie Namashulua",
  tagline: "Physics, mathematics & the odd line of code."
};

/* ---------------------------------------------------------
   RESEARCH
   status: a short word like "Ongoing", "Draft", "Paused",
   "Completed" — shown as a small label next to each entry.
--------------------------------------------------------- */
const RESEARCH = [
  {
    status: "Ongoing",
    title: "Orbital resonance in compact multi-planet systems",
    description:
      "Looking at how mean-motion resonances shape the long-term stability of tightly packed exoplanet systems, using N-body simulations to test which configurations survive over gigayear timescales."
  },
  {
    status: "Ongoing",
    title: "A numerical model of stellar convection zones",
    description:
      "Building a simplified 1D model of energy transport in the outer layers of Sun-like stars, comparing convective and radiative regimes against published stellar structure models."
  },
  {
    status: "Draft",
    title: "Information loss and entropy in simple gravitational collapse",
    description:
      "An exploratory piece connecting undergraduate thermodynamics to the black hole information paradox, aimed at making the core tension legible without hand-waving the physics."
  },
  {
    status: "Paused",
    title: "Gravitational lensing as a teaching tool",
    description:
      "A small interactive tool that visualises how mass bends light, originally built to explain lensing to a physics club and since expanded with real cluster data."
  }
];

/* ---------------------------------------------------------
   ARTICLES
   tag is used for the filter chips at the top of the
   Writing page — keep tags short and consistent
   (e.g. "Astrophysics", "Mathematics", "Computer Science").
   date format is up to you, e.g. "Mar 2026".
--------------------------------------------------------- */
const ARTICLES = [
  {
    tag: "Astrophysics",
    title: "Why the three-body problem has no clean answer",
    excerpt:
      "A walk through Poincare's discovery of chaotic motion in gravitational systems, and what it means for predicting the paths of real planets.",
    date: "Aug 2026",
    readTime: "9 min",
    link: "#"
  },
  {
    tag: "Mathematics",
    title: "Fourier series, from a vibrating string to JPEG compression",
    excerpt:
      "Tracing one idea across two centuries: how decomposing a signal into sine waves ended up compressing every photo on your phone.",
    date: "Jul 2026",
    readTime: "11 min",
    link: "#"
  },
  {
    tag: "Computer Science",
    title: "Simulating an N-body system in 200 lines of Python",
    excerpt:
      "A from-scratch walkthrough of a leapfrog integrator, with the failure modes I hit before the orbits stopped drifting.",
    date: "Jun 2026",
    readTime: "13 min",
    link: "#"
  },
  {
    tag: "Astrophysics",
    title: "How we know what stars are made of",
    excerpt:
      "Spectroscopy, absorption lines, and the century-old technique that still tells us the chemical fingerprint of light-years-distant suns.",
    date: "May 2026",
    readTime: "7 min",
    link: "#"
  },
  {
    tag: "Mathematics",
    title: "A gentle proof of why pi is irrational",
    excerpt:
      "Working through Niven's short proof, and why a fact so easy to state can be so stubborn to justify.",
    date: "Apr 2026",
    readTime: "6 min",
    link: "#"
  }
];

/* ---------------------------------------------------------
   ABOUT
   bio: an array of paragraphs (each string becomes one <p>)
   facts: short label/value pairs shown at the bottom of the
   About page, e.g. education, location, current focus.
--------------------------------------------------------- */
const ABOUT = {
  bio: [
    "I'm a student with a persistent interest in how the universe holds itself together — from the orbits of planets to the statistics that describe a star's interior. This site is where I keep the longer, more considered version of that interest: research notes, working papers, and articles written to be read rather than skimmed.",
    "Most of what's here started as a question I couldn't answer quickly. I'd rather write the slow answer down properly than let it stay half-finished in a notebook.",
    "Outside of physics and mathematics, I spend a lot of time writing small programs to test ideas I can't easily do by hand — simulations, numerical solvers, the occasional visualisation."
  ],
  facts: [
    { label: "Currently", value: "Preparing for undergraduate study in physics" },
    { label: "Focus areas", value: "Astrophysics, applied mathematics, computation" },
    { label: "Based in", value: "Add your location" },
    { label: "Reading list", value: "Add a book or paper you're currently working through" }
  ]
};

/* ---------------------------------------------------------
   CONTACT
   Add or remove rows freely. url can be a mailto:, http(s)
   link, or "#" as a placeholder until you have a real one.
--------------------------------------------------------- */
const CONTACT = [
  { label: "Email", value: "you@example.com", url: "mailto:you@example.com" },
  { label: "GitHub", value: "github.com/yourusername", url: "https://github.com/yourusername" },
  { label: "arXiv", value: "arxiv.org/a/yourname", url: "#" },
  { label: "LinkedIn", value: "linkedin.com/in/yourusername", url: "#" }
];
