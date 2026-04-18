/**
 * portfolioData.ts
 *
 * Single source of truth injected into the LLM system prompt.
 * The API never invents content — it only rephrases what's here.
 *
 * Update this file when case study details change.
 */

export const PORTFOLIO_CONTEXT = `
# Vimala Banavath — Portfolio Data

## ABOUT
Vimala Banavath is a Senior Product Designer with 8+ years of experience.
Specialises in: AI/ML products, Enterprise SaaS, B2B tools, Travel Tech, E-commerce.
Academic background: Design (IIT Delhi — systems thinking, visual rigour) + Psychology
(cognitive load theory, behavioural patterns, mental models).
Based in Hyderabad, India. Open to full remote (global), hybrid (Hyderabad), or relocation.
Available immediately for conversations.

---

## CASE STUDIES

### 1. CORNERSTONE ONDEMAND — AI-Powered Content Manager
Domain: Enterprise SaaS / EdTech / Learning Management
Role: Lead Product Designer

PROBLEM:
Cornerstone's Content Manager forced admins to manually fill metadata (title, description,
keywords, skills) for every learning content item uploaded. Translating content into multiple
languages required navigating 40 separate UI steps. If the browser refreshed mid-workflow,
all progress was lost — admins had to start over.

APPROACH:
- Designed AI metadata generation: one click auto-fills title, description, keywords, and
  skills from uploaded content using Apollo AI
- Used progressive disclosure — AI suggestions appear inline with easy human override;
  confidence indicators show where AI is uncertain (not a black box)
- Collapsed 40-click translation workflow into a single bulk action with batch processing
- Designed smart session continuity — auto-saves progress at every step, resume prompt
  shown on return to prevent data loss
- Ensured accessibility compliance across the full admin interface

OUTCOME:
- 1,700+ admin minutes saved per month
- 40-click workflow → 1 click
- 4,000+ pages now discoverable via AI-powered search
- Measurably reduced admin error rate
- Positive feedback from enterprise admins on reduced cognitive load

KEY DESIGN DECISIONS:
Designing AI transparency: confidence indicators and clear override controls ensured
admins trusted the system. Graceful fallback states for when AI is unavailable.

Internal route: /work/cornerstone

---

### 2. BUILDZAR — B2B Construction Materials Marketplace
Domain: B2B / Construction / Procurement
Role: Lead Product Designer

PROBLEM:
Buildzar needed construction companies (buyers) to efficiently discover and procure
materials from suppliers. The challenge: a massive SKU catalogue that overwhelmed buyers,
complex multi-line procurement workflows, and a poor supplier–buyer matching experience.

APPROACH:
- Redesigned supplier discovery with smart filters, category hierarchy, and featured
  supplier cards
- Built a bulk product browsing experience optimised for procurement managers scanning
  large catalogues (progressive loading, comparison shortcuts)
- Streamlined the quote-request flow — multi-line RFQ (Request for Quotation) submitted
  in one step instead of multiple forms
- Designed a supplier–buyer matching layer based on project type, material category,
  and region

OUTCOME:
- Significantly reduced procurement steps
- Improved supplier–buyer matching accuracy
- Positive procurement manager feedback on bulk ordering ease

Internal route: /work/buildzar

---

### 3. MOONRAFT — UST Global Intranet Redesign
Domain: Enterprise / Internal Tools / Intranet
Role: Lead UX Designer (via Moonraft consultancy, client: UST Global)

PROBLEM:
UST Global's intranet had grown into 40+ fragmented tools and portals built at different
times by different teams. Global employees across departments couldn't find information,
struggled with cross-team workflows, and wasted significant time navigating between systems.

APPROACH:
- Conducted deep user research: employee interviews across departments and geographies,
  card sorting sessions, JTBD (Jobs to Be Done) framework mapping
- Synthesised findings into a unified information architecture consolidating 40+ tools
- Designed role-based global navigation so each employee sees what's relevant to them
- Built unified search across all internal content (policies, people, projects, tools)
- Streamlined the five most common cross-team workflows (leave requests, IT tickets,
  HR queries, expense claims, onboarding)

OUTCOME:
- Measurably faster information access (validated via usability testing post-launch)
- Reduced navigation steps for common tasks
- Improved cross-team collaboration scores in post-launch employee survey
- Positive reception from UST Global leadership

Internal route: /work/moonraft

---

### 4. FLYIN — Travel & Tourism Booking Platform
Domain: Travel Tech / Consumer E-commerce
Role: Senior Product Designer

PROBLEM:
Flyin's booking experience was fragmented. Search, flight selection, hotel booking, and
checkout had inconsistent UI patterns and different interaction models across mobile and
desktop. Conversion was being lost at multiple drop-off points throughout the funnel.

APPROACH:
- Redesigned the full search → checkout flow from scratch, prioritising speed and clarity
- Created a personalised trip planning layer bridging flights and hotels in a unified view
- Eliminated UI inconsistencies between mobile and desktop (single design language)
- Improved loading states, error handling, and empty states throughout the funnel
- Reduced friction at high-abandonment checkout steps

OUTCOME:
- Improved booking conversion rate
- Unified cross-platform search experience
- Reduced drop-off at key checkout steps
- No internal route (Figma prototype only)

---

### 5. APTIA — Corporate Website
Domain: HR Tech / Benefits Administration / B2B
Role: Product Designer

PROBLEM:
Aptia provides pension and health benefits administration services. Their website needed
to clearly communicate complex services to HR decision-makers and generate qualified leads
without overwhelming visitors with jargon.

APPROACH:
- Designed clear, trustworthy communication of pension & health benefits services
- Navigation architecture optimised for HR decision-makers (not generic visitors)
- Visual design aligned with enterprise credibility standards (not a startup aesthetic)

OUTCOME:
- Improved navigation clarity
- Stronger lead conversion metrics
- No internal route

---

### 6. CIVTECH — Menopause Care (Design Sprint)
Domain: Women's Health / Digital Health / Civic Tech
Role: Lead UX Designer

PROBLEM:
Women experiencing menopause had limited access to personalised digital support,
symptom tracking, and peer community connection.

APPROACH:
- Built a personalised digital platform for symptom tracking and curated resources
- Designed community and peer-support features grounded in user research with affected women
- Prioritised sensitive, inclusive UX for an underserved population

OUTCOME:
- End-to-end concept prototype delivered in sprint format
- No internal route

---

## UX PROCESS

Vimala's design process is research-first, always:

1. DISCOVERY: Deep user interviews, JTBD (Jobs to Be Done) framework, stakeholder
   alignment sessions, heuristic analysis of existing products
2. SYNTHESIS: Affinity mapping, persona development, opportunity mapping
3. IDEATION: Lo-fi sketches, rapid wireframe iteration, design studio workshops
4. VALIDATION: Prototype testing with real users (not assumptions), usability sessions,
   iterative refinement
5. DELIVERY: Dev-ready Figma handoff with annotated edge cases, design system components,
   interaction specs

Core philosophy: Every project starts with "why does this matter to the user?" before
touching Figma.

---

## SKILLS & TOOLS

Design: Figma, Prototyping, Design Systems, Motion Design, FigJam
Research: User interviews, Usability testing, JTBD mapping, Card sorting, Dovetail, Maze
Strategy: Information architecture, Systems thinking, OKR alignment, Design Ops
AI & Vibe Coding: Cursor, Claude (Anthropic), v0 by Vercel, Framer AI, Midjourney,
                  ChatGPT, GitHub Copilot, Figma AI
Industries: AI/ML products, Enterprise SaaS, B2B platforms, Travel Tech, Healthcare,
            Fintech, EdTech/LMS, Gaming

---

## EDUCATION

IIT Delhi — Design background (systems thinking, visual craft, rigour)
Psychology background — Cognitive load theory, behavioural patterns, mental models

---

## CONTACT & AVAILABILITY

WhatsApp: +91 888 609 0063
Email: vimalabanavath.design@gmail.com
Location: Hyderabad, India
Availability: Immediately open to conversations
Seeking: Senior product design roles, especially AI, enterprise SaaS, or B2B tools
`
