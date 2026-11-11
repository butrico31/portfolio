// Deterministic positions keep the background stable across React renders.
const layers = [
  { count: 30, depth: 'far', seed: 17 },
  { count: 22, depth: 'mid', seed: 43 },
  { count: 14, depth: 'near', seed: 79 },
]

export function ScrollStars() {
  return (
    <div className="scroll-stars" aria-hidden="true">
      {layers.map(({ count, depth, seed }) => (
        <div className={`star-layer star-layer--${depth}`} key={depth}>
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className="scroll-star"
              style={{
                left: `${((i * 347 + seed) % 997) / 10}%`,
                top: `${((i * 137 + seed * 11) % 991) / 10}%`,
                '--star-size': `${depth === 'near' ? 2.5 : depth === 'mid' ? 1.8 : 1.2}px`,
                '--star-alpha': 0.25 + (i % 5) * 0.1,
                '--star-max-length': `${depth === 'near' ? 22 : depth === 'mid' ? 14 : 8}px`,
                '--star-color':
                  i % 5 === 0
                    ? 'var(--pink)'
                    : i % 3 === 0
                      ? 'var(--cyan)'
                      : '#d4dded',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

const wires = [
  'M0 64H140L184 108H320L372 56H560L616 0',
  'M0 82H132L176 126H328L380 74H570L640 4',
  'M0 152H92L144 204H256L308 152H452L508 208H640',
  'M0 170H84L136 222H264L316 170H444L500 226H640',
  'M156 320V266L208 214V126',
  'M400 320V252L368 220V112L406 74',
]

export function SectionCircuit({ placement }) {
  return (
    <div
      className={`section-circuit section-circuit--${placement}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 640 320" fill="none">
        <g
          className="section-circuit-wires"
          stroke="currentColor"
          strokeWidth="1"
        >
          {wires.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g
          className="section-circuit-signals"
          stroke="currentColor"
          strokeWidth="2"
        >
          {[wires[0], wires[2], wires[5]].map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g
          className="section-circuit-nodes"
          fill="var(--bg)"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {[
            [140, 64],
            [320, 108],
            [560, 56],
            [92, 152],
            [256, 204],
            [452, 152],
            [156, 266],
            [400, 252],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" />
          ))}
        </g>
        <g stroke="currentColor" opacity=".6">
          <path d="M292 93v-7h7m12 0h7v7m0 12v7h-7m-12 0h-7v-7" />
          <path d="M470 240h35m-35 5h19m-19 5h27" />
        </g>
      </svg>
    </div>
  )
}
