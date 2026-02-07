interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group">
      {/* Glow effect on focus */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-center">
        {/* Terminal prompt */}
        <div className="absolute left-3 md:left-4 flex items-center gap-1.5 md:gap-2 font-mono text-xs md:text-sm text-gray-500 pointer-events-none">
          <span className="text-cyan-400">~</span>
          <span className="text-fuchsia-400">/</span>
          <span>search</span>
          <span className="text-cyan-400 animate-pulse">_</span>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="file-explorer, web-scraper, git..."
          className="w-full bg-[#12121a] border border-gray-800 hover:border-gray-700 focus:border-cyan-500/50 rounded-xl pl-28 md:pl-36 pr-4 py-3.5 md:py-4 font-mono text-sm md:text-base text-white placeholder-gray-600 outline-none transition-all duration-300"
        />

        {/* Search icon / shortcut hint */}
        <div className="absolute right-3 md:right-4 flex items-center gap-2">
          {value && (
            <button
              onClick={() => onChange('')}
              className="p-1 text-gray-500 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <div className="hidden md:flex items-center gap-1 text-[10px] font-mono text-gray-600 border border-gray-700 rounded px-1.5 py-0.5">
            <span>/</span>
          </div>
        </div>
      </div>
    </div>
  )
}
