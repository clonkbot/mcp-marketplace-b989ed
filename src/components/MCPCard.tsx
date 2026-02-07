import { useState } from 'react'
import type { MCPAgent } from '../App'

interface MCPCardProps {
  agent: MCPAgent
  index: number
  installed: boolean
  onInstall: () => void
}

export function MCPCard({ agent, index, installed, onInstall }: MCPCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDownloads = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <div
      className="group relative"
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border gradient */}
      <div
        className={`absolute -inset-px rounded-xl bg-gradient-to-r transition-opacity duration-500 ${
          installed
            ? 'from-green-500/50 via-green-400/50 to-green-500/50 opacity-100'
            : 'from-cyan-500/50 via-fuchsia-500/50 to-cyan-500/50 opacity-0 group-hover:opacity-100'
        }`}
      />

      {/* Card content */}
      <div className="relative bg-[#0f0f17] rounded-xl p-4 md:p-5 border border-gray-800/50 backdrop-blur-sm h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-mono font-semibold text-sm md:text-base text-white truncate">
                {agent.name}
              </h3>
              {agent.verified && (
                <div className="flex-shrink-0 relative group/verify">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-green-500/30 rounded text-[10px] font-mono text-green-400 opacity-0 group-hover/verify:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Verified
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <span>by</span>
              <span className="text-fuchsia-400/70">@{agent.author}</span>
            </div>
          </div>

          {/* Version badge */}
          <div className="flex-shrink-0 px-2 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded text-[10px] font-mono text-cyan-400">
            v{agent.version}
          </div>
        </div>

        {/* Description */}
        <p
          className={`text-gray-400 text-xs md:text-sm leading-relaxed mb-4 flex-1 ${
            isExpanded ? '' : 'line-clamp-2'
          }`}
        >
          {agent.description}
        </p>

        {agent.description.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-cyan-400/60 hover:text-cyan-400 text-xs font-mono mb-3 text-left transition-colors"
          >
            {isExpanded ? '- collapse' : '+ expand'}
          </button>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {agent.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-800/50 border border-gray-700/50 rounded text-[10px] font-mono text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{formatDownloads(agent.downloads)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-yellow-500/70" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{agent.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-gray-600">{agent.category}</span>
          </div>
        </div>

        {/* Install button */}
        <button
          onClick={onInstall}
          className={`relative w-full py-3 rounded-lg font-mono text-xs md:text-sm transition-all duration-300 overflow-hidden group/btn ${
            installed
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20'
          }`}
        >
          {/* Button glow */}
          <div
            className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ${
              installed ? 'bg-green-400/10' : 'bg-cyan-400/10'
            }`}
          />

          <span className="relative z-10 flex items-center justify-center gap-2">
            {installed ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Installed
              </>
            ) : (
              <>
                <span className="text-fuchsia-400">$</span>
                mcp install {agent.name}
              </>
            )}
          </span>
        </button>

        {/* Terminal cursor animation on hover */}
        {isHovered && !installed && (
          <div className="absolute bottom-[70px] right-5 font-mono text-cyan-400/50 animate-pulse text-sm hidden md:block">
            _
          </div>
        )}
      </div>
    </div>
  )
}
