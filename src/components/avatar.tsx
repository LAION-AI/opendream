import { Component } from "solid-js"
import hash from 'string-hash'
import color from 'tinycolor2'

const HashAvatar: Component<{name: string, height: number, width: number, radius: number}> = (props) => {

      const { name, height, width, radius } = props
  
      const n = hash(name)
      const c1 = color({ h: n % 360, s: 0.95, l: 0.5 })
      const c1_ = c1.toHexString()
      const c2 = c1.triad()[1].toHexString()
  
      return (
        <svg class="animated animated-rotate-in animated-duration-2000 animated-delay-300" width={width} height={height} style={`borderRadius: ${radius}`} viewBox="0 0 80 80">
          <defs>
            <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id={name}>
              <stop stop-color={c1_} offset="0%"></stop>
              <stop stop-color={c2} offset="100%"></stop>
            </linearGradient>
          </defs>
          <g stroke="none" stroke-width="1" fill="none">
            <rect fill={`url(#${name})`} x="0" y="0" width="80" height="80" />
          </g>
        </svg>
      )
  }

export default HashAvatar;