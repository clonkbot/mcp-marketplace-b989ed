interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="relative">
      {/* Horizontal scroll container */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`relative flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 font-mono text-xs md:text-sm rounded-lg transition-all duration-300 ${
              selected === category
                ? 'text-black bg-gradient-to-r from-cyan-400 to-cyan-300 shadow-lg shadow-cyan-500/25'
                : 'text-gray-400 bg-[#12121a] border border-gray-800 hover:border-gray-600 hover:text-white'
            }`}
          >
            {selected === category && (
              <span className="mr-1 opacity-70">#</span>
            )}
            {category}

            {/* Active indicator glow */}
            {selected === category && (
              <div className="absolute inset-0 rounded-lg bg-cyan-400/30 blur-md -z-10" />
            )}
          </button>
        ))}
      </div>

      {/* Fade edges for scroll indication on mobile */}
      <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none md:hidden" />
    </div>
  )
}
