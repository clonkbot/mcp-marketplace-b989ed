import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center font-mono font-bold text-black text-sm md:text-base">
                M
              </div>
              <div className="absolute inset-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 blur-lg opacity-50" />
            </div>
            <div>
              <h1 className="font-mono font-bold text-base md:text-lg tracking-tight">
                <span className="text-cyan-400">MCP</span>
                <span className="text-white">::</span>
                <span className="text-fuchsia-400">Market</span>
              </h1>
              <p className="hidden md:block text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                Agent Protocol Registry
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink active>Browse</NavLink>
            <NavLink>Popular</NavLink>
            <NavLink>New</NavLink>
            <NavLink>Docs</NavLink>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 font-mono text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              Sign In
            </button>
            <button className="relative group px-4 py-2 font-mono text-sm bg-cyan-400/10 text-cyan-400 rounded-lg border border-cyan-400/30 hover:bg-cyan-400/20 transition-all">
              <span className="relative z-10">Publish</span>
              <div className="absolute inset-0 rounded-lg bg-cyan-400/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-cyan-500/10 mt-2 pt-4">
            <nav className="flex flex-col gap-2">
              <MobileNavLink active>Browse</MobileNavLink>
              <MobileNavLink>Popular</MobileNavLink>
              <MobileNavLink>New</MobileNavLink>
              <MobileNavLink>Docs</MobileNavLink>
            </nav>
            <div className="flex gap-3 mt-4 pt-4 border-t border-cyan-500/10">
              <button className="flex-1 px-4 py-3 font-mono text-sm text-gray-400 hover:text-cyan-400 transition-colors border border-gray-700 rounded-lg">
                Sign In
              </button>
              <button className="flex-1 px-4 py-3 font-mono text-sm bg-cyan-400/10 text-cyan-400 rounded-lg border border-cyan-400/30">
                Publish
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animated border line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </header>
  )
}

function NavLink({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <a
      href="#"
      className={`font-mono text-sm transition-colors relative py-1 ${
        active
          ? 'text-cyan-400'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {active && <span className="mr-1 text-fuchsia-400">&gt;</span>}
      {children}
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-cyan-400 to-fuchsia-400" />
      )}
    </a>
  )
}

function MobileNavLink({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <a
      href="#"
      className={`font-mono text-sm px-3 py-3 rounded-lg transition-colors ${
        active
          ? 'text-cyan-400 bg-cyan-400/10'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {active && <span className="mr-2 text-fuchsia-400">&gt;</span>}
      {children}
    </a>
  )
}
