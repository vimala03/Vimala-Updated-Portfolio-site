import { motion, useReducedMotion } from 'framer-motion'

export interface EcosystemNode {
  id:    string
  label: string
}

interface EcosystemDiagramProps {
  /** Center label — the business/system these flows orbit. */
  hubLabel: string
  /** Arranged evenly around the hub, in the given order. */
  nodes:    EcosystemNode[]
  /** Cross-dependency connections between node ids, beyond the hub-spokes. */
  links:    [string, string][]
  /**
   * Which node (or 'all') is currently spotlighted. Omit/null for the
   * baseline "everything visible, nothing emphasized" overview state.
   */
  activeId?: string | 'all' | null
  className?: string
}

const VIEW    = 400
const CENTER  = VIEW / 2
const ORBIT_R = 148
const HUB_R   = 30
const NODE_R  = 15

const EASE = [0.22, 1, 0.36, 1] as const

export default function EcosystemDiagram({ hubLabel, nodes, links, activeId, className = '' }: EcosystemDiagramProps) {
  const reduceMotion = Boolean(useReducedMotion())
  const angleStep    = (Math.PI * 2) / nodes.length

  const positioned = nodes.map((node, i) => {
    const angle = -Math.PI / 2 + i * angleStep
    return {
      ...node,
      angle,
      x: CENTER + ORBIT_R * Math.cos(angle),
      y: CENTER + ORBIT_R * Math.sin(angle),
    }
  })
  const byId = Object.fromEntries(positioned.map((p) => [p.id, p]))

  const isActive     = (id: string) => activeId === 'all' || activeId === id
  const nodeOpacity   = (id: string) => (!activeId ? 0.85 : isActive(id) ? 1 : 0.3)
  const nodeRadius    = (id: string) => (!activeId ? NODE_R : isActive(id) ? NODE_R * 1.25 : NODE_R * 0.85)
  const spokeOpacity  = (id: string) => (!activeId ? 0.22 : isActive(id) ? 0.6 : 0.08)
  const linkOpacity   = (a: string, b: string) => (!activeId ? 0.16 : isActive(a) || isActive(b) ? 0.55 : 0.05)
  const labelOpacity  = (id: string) => (!activeId ? 0.65 : isActive(id) ? 1 : 0.28)

  const textAnchor = (x: number): 'start' | 'end' | 'middle' =>
    Math.abs(x - CENTER) < 24 ? 'middle' : x > CENTER ? 'start' : 'end'

  const t = { duration: reduceMotion ? 0.15 : 0.45, ease: EASE }

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {/* Orbit ring — a quiet grounding element, not a repeat of the hero's weave texture */}
      <circle cx={CENTER} cy={CENTER} r={ORBIT_R} fill="none" stroke="var(--cs-hairline)" strokeWidth="1" opacity="0.5" />

      {/* Cross-dependency links */}
      {links.map(([a, b], i) => {
        const from = byId[a]
        const to   = byId[b]
        if (!from || !to) return null
        return (
          <motion.line
            key={`${a}-${b}-${i}`}
            x1={from.x} y1={from.y} x2={to.x} y2={to.y}
            stroke="var(--cs-accent, #2f5c53)"
            strokeWidth="1"
            strokeDasharray="2 4"
            animate={{ opacity: linkOpacity(a, b) }}
            transition={t}
          />
        )
      })}

      {/* Hub spokes */}
      {positioned.map((p) => (
        <motion.line
          key={`spoke-${p.id}`}
          x1={CENTER} y1={CENTER} x2={p.x} y2={p.y}
          stroke="var(--cs-accent, #2f5c53)"
          strokeWidth="1"
          animate={{ opacity: spokeOpacity(p.id) }}
          transition={t}
        />
      ))}

      {/* Hub */}
      <circle cx={CENTER} cy={CENTER} r={HUB_R} fill="var(--cs-card-bg, #eef3f1)" stroke="var(--cs-ink)" strokeWidth="1.5" opacity="0.9" />
      <text
        x={CENTER} y={CENTER}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-body)"
        fontSize="9"
        letterSpacing="0.04em"
        fill="var(--cs-ink)"
        style={{ textTransform: 'uppercase' }}
      >
        {hubLabel}
      </text>

      {/* Satellite nodes + labels */}
      {positioned.map((p) => {
        const lx = p.x + Math.cos(p.angle) * 26
        const ly = p.y + Math.sin(p.angle) * 26
        return (
          <g key={p.id}>
            <motion.circle
              cx={p.x} cy={p.y}
              fill="var(--cs-card-bg, #eef3f1)"
              stroke="var(--cs-accent, #2f5c53)"
              strokeWidth="1.75"
              animate={{ r: nodeRadius(p.id), opacity: nodeOpacity(p.id) }}
              transition={t}
            />
            <motion.text
              x={lx} y={ly}
              textAnchor={textAnchor(p.x)}
              dominantBaseline="middle"
              fontFamily="var(--font-body)"
              fontSize="10.5"
              letterSpacing="0.06em"
              fill="var(--cs-accent, #2f5c53)"
              style={{ textTransform: 'uppercase' }}
              animate={{ opacity: labelOpacity(p.id) }}
              transition={t}
            >
              {p.label}
            </motion.text>
          </g>
        )
      })}
    </svg>
  )
}
