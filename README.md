# Urban Rooftop Gardening Staff Portal

**Live Demo:** https://rooftop-gardening.netlify.app/

## Project Overview

This project is a static front-end web application developed for an Urban Rooftop Gardening service provider. The objective of this "Core Infrastructure Overhaul" epic is to transition their internal staff from manual paper systems and Excel sheets to a streamlined digital portal.

This UI allows floor staff to quickly search for, manage, and verify the status of various gardening services (e.g., Soil Testing, Irrigation Setup) on a mobile-responsive interface.

## Features & Edge Case Handling

This application was built with strict adherence to Enterprise Technical Requirements (TRD), focusing heavily on the "Unhappy Path" and resilient engineering:

- **Input Validation:** Prevents empty form submissions and highlights missing/invalid data with visual red borders and aria-live error messages.
- **Network Resilience (Simulated):** Implements a mock API architecture using asynchronous Promises to simulate network latency, displaying a smooth CSS loading spinner to account for spotty 3G connections.
- **Graceful Empty States:** If a search yields no results in the mock database, the app renders a clean "No data found." state rather than a blank screen.
- **Security:** Implements DOM-based XSS sanitization to neutralize malicious inputs before processing or rendering them to the DOM.
- **Telemetry Simulation:** Logs an analytics event to the console upon successful completion of a primary search action.

## 🛠 Tech Stack

- **HTML5:** Semantic architecture with strict ARIA labeling (`aria-live`, `aria-label`, `.sr-only`).
- **CSS3:** Mobile-first, responsive grid layout utilizing a strict monochromatic corporate design system. Zero external CSS frameworks (no Tailwind or Bootstrap).
- **Vanilla JavaScript (ES6+):** Zero-framework implementation for DOM manipulation, XSS sanitization, and Mock API data fetching.

## Testing Criteria

As this is a static Proof of Concept (POC) without a live backend database, a Mock API has been implemented to test UI states.

**The "Happy Path":**

- Search for terms like `"Soil"`, `"Irrigation"`, or `"Pest"`.
- _Expected Result:_ A 1.5-second loading spinner appears, followed by the rendering of the specific service cards. A telemetry ping will be logged in the DevTools console.

**The "Unhappy Path" (Empty State):**

- Search for a random string (e.g., `"asdf"`).
- _Expected Result:_ The loading spinner appears, followed by the "No data found." message.

- The "Unhappy Path" (Validation Error):\*\*
- Submit the search form while the input is completely empty.
- _Expected Result:_ The input border turns red, an error message appears, and no API fetch is initiated.

## Accessibility & Performance

- Achieves a **100% Lighthouse Accessibility and SEO Score**.
- Fully keyboard navigable.
- Implements a code-based monochromatic SVG Favicon.
- Responsive CSS ensures single-column readability on mobile devices and a multi-column grid on desktops.

---

_Engineered For Prodesk IT_
