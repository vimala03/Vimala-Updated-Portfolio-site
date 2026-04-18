/**
 * Portfolio Assistant Knowledge Base
 *
 * Two layers:
 *   1. CASE_STUDIES — matched first (specific projects)
 *   2. TOPICS       — matched second (process, skills, etc.)
 *
 * matchQuery() returns the best match or null (caller handles fallback).
 */

export interface MatchResult {
  response:   string  // ready-to-display bot text
  linkLabel?: string  // CTA label shown inside the bubble
  linkTo?:    string  // internal route or external URL
  isInternal?: boolean
}

/* ─── Case Studies ───────────────────────────────────────────── */
const CASE_STUDIES: Array<{
  keywords: string[]
  title:    string
  response: string
  linkTo?:  string
}> = [
  {
    keywords: ['cornerstone', 'csx', 'content manager', 'apollo ai', 'metadata', 'enterprise learning', 'workforce agility'],
    title:    'Cornerstone OnDemand',
    response: `I redesigned Cornerstone's Content Manager with three AI-first features:

· AI metadata generation — auto-fills title, description, keywords & skills from uploaded content
· Bulk multilingual translation — 40 repetitive clicks collapsed into a single action
· Smart session continuity — progress saved automatically so no work is ever lost

📊 Impact: 1,700+ admin mins/month saved · 40-click workflow → 1 click · 4,000+ pages accessible via AI-powered search`,
    linkTo: '/work/cornerstone',
  },
  {
    keywords: ['flyin', 'travel', 'tourism', 'booking', 'flight', 'hotel', 'trip planning'],
    title:    'Flyin Travel & Tourism',
    response: `For Flyin, I unified a fragmented travel booking experience:

· Redesigned the end-to-end search → checkout flow for speed and clarity
· Created a personalised trip planning layer across flights and hotels
· Eliminated UI inconsistencies between mobile and desktop

📊 Impact: Improved booking conversion · Unified cross-platform search experience`,
  },
  {
    keywords: ['buildzar', 'construction', 'b2b', 'marketplace', 'procurement', 'supplier', 'materials'],
    title:    'Buildzar',
    response: `Buildzar is a B2B construction materials marketplace:

· Redesigned supplier discovery and bulk product browsing
· Streamlined multi-line procurement and quote-request flows
· Built to handle a large SKU catalogue without overwhelming buyers

📊 Impact: Reduced procurement steps · Improved supplier–buyer matching`,
    linkTo: '/work/buildzar',
  },
  {
    keywords: ['moonraft', 'ust', 'intranet', 'employee portal', 'internal tool', 'global workforce'],
    title:    'Moonraft – UST Global',
    response: `For UST Global, I led the UX redesign of their internal intranet:

· Consolidated 40+ fragmented internal tools into one coherent experience
· Research-led process — employee interviews, card sorting, JTBD mapping
· Improved global navigation, unified search, and cross-team task flows

📊 Impact: Faster information access · Measurably reduced navigation steps`,
    linkTo: '/work/moonraft',
  },
  {
    keywords: ['aptia', 'pension', 'health benefits', 'hr administration', 'payroll'],
    title:    'Aptia',
    response: `For Aptia, I designed their corporate website end-to-end:

· Clear, trustworthy communication of pension & health benefits services
· Navigation architecture optimised for HR decision-makers
· Visual design aligned with enterprise credibility standards

📊 Impact: Improved navigation clarity · Stronger lead conversion`,
  },
  {
    keywords: ['civtech', 'menopause', 'women', 'health', 'wellbeing', 'concept'],
    title:    'CivTech – Menopause Care',
    response: `CivTech was a concept design sprint focused on menopause support:

· Built a personalised digital platform for symptom tracking and resources
· Designed community and peer-support features grounded in user research
· Focused on sensitive, inclusive UX for an underserved population

📊 Output: End-to-end concept prototype delivered in a sprint format`,
  },
]

/* ─── Topics ─────────────────────────────────────────────────── */
const TOPICS: Array<{
  keywords: string[]
  response: string
  linkTo?:  string
}> = [
  {
    keywords: ['outcome', 'result', 'impact', 'metric', 'number', 'measur', 'success', 'kpi', 'data'],
    response: `Here's measurable impact across my work:

· 1,700+ admin mins/month saved — Cornerstone OnDemand
· 40-click workflow reduced to 1 click — Cornerstone
· 4,000+ pages navigated via AI-powered search
· Booking conversion improved — Flyin Travel
· Cross-team collaboration increased — UST Global intranet`,
  },
  {
    keywords: ['process', 'how do you', 'approach', 'method', 'design thinking', 'research', 'workflow'],
    response: `My UX process is research-first, always:

1. Deep user interviews & JTBD framework
2. Competitive benchmarking & heuristic analysis
3. Lo-fi sketches → rapid wireframe iteration
4. Prototype testing with real users (not assumptions)
5. Dev-ready handoff with annotated edge cases

Every project starts with "why does this matter to the user?" before touching Figma.`,
  },
  {
    keywords: ['hire', 'hiring', 'job', 'role', 'full-time', 'opportunity', 'open to work', 'available'],
    response: `I'm open to senior product design roles at companies building meaningful, complex products — especially in AI, enterprise SaaS, or B2B tools.

Based in Hyderabad · Open to remote, hybrid, or relocation · Available immediately for conversations.`,
  },
  {
    keywords: ['skill', 'tool', 'figma', 'expertise', 'capability', 'proficien', 'stack', 'what can you'],
    response: `My core design stack:

🎨 Design: Figma, Prototyping, Design Systems, Motion
🔬 Research: User interviews, Usability testing, JTBD mapping
🧠 Strategy: Information architecture, Systems thinking, OKR alignment
🏢 Domain expertise: AI/ML products, Enterprise SaaS, B2B tools, E-commerce`,
  },
  {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'intelligent', 'llm', 'generative', 'genai', 'chatgpt'],
    response: `I've designed multiple AI-powered product experiences:

· AI metadata generation with progressive disclosure — Cornerstone
· Intent-based navigation replacing static menus
· Designing for AI uncertainty — confidence indicators, fallback states, graceful errors

My core belief: AI should reduce cognitive load, not add to it.`,
  },
  {
    keywords: ['remote', 'location', 'hyderabad', 'relocat', 'hybrid', 'where are you', 'based'],
    response: `I'm based in Hyderabad, India.

Open to:
· Full remote — global teams
· Hybrid — in Hyderabad
· Relocation — for the right opportunity

Available for calls across IST, GMT, and EST time zones.`,
  },
  {
    keywords: ['education', 'iit', 'psychology', 'degree', 'background', 'study', 'qualification'],
    response: `My academic foundation is deliberately cross-disciplinary:

· Design background from IIT Delhi — systems thinking, rigour, visual craft
· Psychology background — cognitive load theory, behavioural patterns, mental models

This combination lets me design for how people actually think, not just how they should think.`,
  },
]

/* ─── Matcher ────────────────────────────────────────────────── */
/**
 * Returns the best match for a free-text user query.
 * Case studies are checked before topics (more specific wins).
 * Returns null when nothing matches — caller shows a fallback.
 */
export function matchQuery(input: string): MatchResult | null {
  const q = input.toLowerCase().trim()
  if (!q) return null

  for (const cs of CASE_STUDIES) {
    if (cs.keywords.some(kw => q.includes(kw))) {
      return {
        response:   cs.response,
        linkLabel:  cs.linkTo ? `View case study: ${cs.title} →` : undefined,
        linkTo:     cs.linkTo,
        isInternal: true,
      }
    }
  }

  for (const topic of TOPICS) {
    if (topic.keywords.some(kw => q.includes(kw))) {
      return {
        response:   topic.response,
        linkTo:     topic.linkTo,
        isInternal: !!topic.linkTo,
      }
    }
  }

  return null
}
