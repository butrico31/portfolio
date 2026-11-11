const traces = [
  'M0 100H105L160 155H210',
  'M0 124H95L150 179H210',
  'M60 25V65L170 175V205H210',
  'M160 0V60L235 135V160',
  'M265 0V160',
  'M300 0V90L285 105V160',
  'M520 80H430L375 135V180H330',
  'M560 120H460L405 175V215H330',
  'M560 270H405L380 245H330',
  'M560 295H415L380 260H330',
  'M480 400V340L365 225H330',
  'M365 440V350L305 290V280',
  'M270 440V280',
  'M240 440V330L255 315V280',
  'M20 360H115L195 280H210',
  'M0 330H105L175 260H210',
  'M0 240H150L180 210H210',
  'M80 440V390L160 310H200',
]

export function Circuit() {
  return (
    <div className="circuit-art" aria-hidden="true">
      <svg viewBox="0 0 560 440" fill="none">
        <defs>
          <linearGradient
            id="trace"
            x1="0"
            y1="0"
            x2="560"
            y2="440"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#41dce4" />
            <stop offset=".5" stopColor="#63617f" />
            <stop offset="1" stopColor="#ee76ac" />
          </linearGradient>
          <pattern
            id="dotgrid"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".7" fill="#666980" opacity=".35" />
          </pattern>
        </defs>
        <rect width="560" height="440" fill="url(#dotgrid)" />
        <g className="circuit-traces" stroke="url(#trace)" strokeWidth="1">
          {traces.map((d, i) => (
            <path d={d} key={d} style={{ '--trace-delay': `${i * -0.7}s` }} />
          ))}
        </g>
        <g className="circuit-signals" stroke="url(#trace)" strokeWidth="2">
          {traces
            .filter((_, i) => i % 3 === 0)
            .map((d) => (
              <path d={d} key={d} />
            ))}
        </g>
        <g stroke="#4a5362" strokeWidth="1">
          <path d="M185 147h150l21 21v108l-21 21H185l-21-21V168Z" />
          <path
            d="M175 129h170l29 29v128l-29 29H175l-29-29V158Z"
            strokeDasharray="3 7"
          />
          <path
            d="M194 166h132l10 10v89l-10 10H194l-10-10v-89Z"
            fill="#0d131c"
            stroke="#9f73cf"
          />
        </g>
        <path
          d="M184 191v-15l10-10h25m92 109h15l10-10v-18"
          stroke="#41dce4"
          strokeWidth="2"
        />
        <text
          x="260"
          y="239"
          textAnchor="middle"
          fill="#d1a2f5"
          fontFamily="Neocrash, sans-serif"
          fontSize="53"
        >
          VB
        </text>
        <text
          x="260"
          y="260"
          textAnchor="middle"
          fill="#8b9aaa"
          fontFamily="monospace"
          fontSize="7"
          letterSpacing="2.5"
        >
          DEVELOPER CORE
        </text>
        <g fill="#41dce4">
          <circle cx="60" cy="25" r="3" />
          <circle cx="160" cy="60" r="3" />
          <circle cx="105" cy="100" r="3" />
          <circle cx="430" cy="80" r="3" />
          <circle cx="150" cy="240" r="3" />
          <circle cx="115" cy="360" r="3" />
        </g>
        <g fill="#ee76ac">
          <circle cx="480" cy="400" r="3" />
          <circle cx="365" cy="350" r="3" />
          <circle cx="415" cy="295" r="3" />
          <circle cx="240" cy="330" r="3" />
          <circle cx="405" cy="270" r="3" />
        </g>
        <g fontFamily="monospace" fontSize="9" letterSpacing="1" fill="#a0a9ba">
          <text x="48" y="17">
            REACT
          </text>
          <text x="310" y="65">
            NODE.JS
          </text>
          <text x="441" y="67">
            API
          </text>
          <text x="18" y="386">
            JAVA
          </text>
          <text x="380" y="370">
            AUTOMATION
          </text>
        </g>
        <path d="M0 40V0h40m480 440h40v-40" stroke="#41dce4" />
        <path d="M0 420v20h30m530-440h30v25" stroke="#ee76ac" />
      </svg>
      <span className="circuit-coordinates">23° S / 46° W</span>
      <span className="circuit-caption">SYSTEMS THAT CONNECT.</span>
    </div>
  )
}
