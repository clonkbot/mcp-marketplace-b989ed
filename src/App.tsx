import { useState } from 'react'
import { MCPCard } from './components/MCPCard'
import { SearchBar } from './components/SearchBar'
import { CategoryFilter } from './components/CategoryFilter'
import { Header } from './components/Header'

export interface MCPAgent {
  id: string
  name: string
  description: string
  author: string
  category: string
  downloads: number
  rating: number
  verified: boolean
  tags: string[]
  version: string
}

const mcpAgents: MCPAgent[] = [
  {
    id: '1',
    name: 'file-explorer',
    description: 'Navigate, read, write, and manage local filesystem operations with advanced glob patterns and recursive search capabilities.',
    author: 'mcp-core',
    category: 'Filesystem',
    downloads: 45200,
    rating: 4.9,
    verified: true,
    tags: ['files', 'io', 'core'],
    version: '2.4.1'
  },
  {
    id: '2',
    name: 'web-scraper',
    description: 'Extract structured data from websites with intelligent parsing, pagination handling, and rate limiting built-in.',
    author: 'dataforge',
    category: 'Data',
    downloads: 32100,
    rating: 4.7,
    verified: true,
    tags: ['scraping', 'web', 'extraction'],
    version: '1.8.3'
  },
  {
    id: '3',
    name: 'git-commander',
    description: 'Full git operations support including commits, branches, merges, rebases, and intelligent conflict resolution.',
    author: 'devtools-inc',
    category: 'Development',
    downloads: 28900,
    rating: 4.8,
    verified: true,
    tags: ['git', 'vcs', 'code'],
    version: '3.1.0'
  },
  {
    id: '4',
    name: 'sql-agent',
    description: 'Connect to PostgreSQL, MySQL, SQLite databases. Execute queries, manage schemas, and analyze data structures.',
    author: 'db-collective',
    category: 'Database',
    downloads: 21400,
    rating: 4.6,
    verified: false,
    tags: ['sql', 'database', 'query'],
    version: '1.2.7'
  },
  {
    id: '5',
    name: 'shell-exec',
    description: 'Execute shell commands with sandboxing, timeout controls, and streaming output. Supports bash, zsh, and fish.',
    author: 'mcp-core',
    category: 'System',
    downloads: 67800,
    rating: 4.9,
    verified: true,
    tags: ['shell', 'terminal', 'exec'],
    version: '4.0.2'
  },
  {
    id: '6',
    name: 'image-gen',
    description: 'Generate, edit, and manipulate images using various AI models. Supports DALL-E, Stable Diffusion, and Midjourney APIs.',
    author: 'creative-ai',
    category: 'Media',
    downloads: 15600,
    rating: 4.4,
    verified: false,
    tags: ['images', 'ai', 'generation'],
    version: '0.9.4'
  },
  {
    id: '7',
    name: 'browser-pilot',
    description: 'Automate browser interactions with headless Chrome. Click, type, screenshot, and navigate with natural language commands.',
    author: 'automate-labs',
    category: 'Automation',
    downloads: 19300,
    rating: 4.5,
    verified: true,
    tags: ['browser', 'automation', 'puppeteer'],
    version: '2.0.1'
  },
  {
    id: '8',
    name: 'memory-store',
    description: 'Persistent memory for agents. Store and retrieve context across sessions with semantic search and vector embeddings.',
    author: 'cognition-sys',
    category: 'Memory',
    downloads: 24700,
    rating: 4.8,
    verified: true,
    tags: ['memory', 'vectors', 'persistence'],
    version: '1.5.0'
  },
  {
    id: '9',
    name: 'api-bridge',
    description: 'Universal REST and GraphQL client. Auto-generate type-safe clients from OpenAPI specs with retry logic.',
    author: 'netweave',
    category: 'Network',
    downloads: 11200,
    rating: 4.3,
    verified: false,
    tags: ['api', 'http', 'graphql'],
    version: '1.1.2'
  }
]

const categories = ['All', 'Filesystem', 'Data', 'Development', 'Database', 'System', 'Media', 'Automation', 'Memory', 'Network']

function App() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [installedAgents, setInstalledAgents] = useState<Set<string>>(new Set())

  const filteredAgents = mcpAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase()) ||
      agent.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleInstall = (id: string) => {
    setInstalledAgents(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      {/* Scan lines overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)'
           }}
      />

      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
          {/* Search and filters */}
          <div className="mb-8 md:mb-12 space-y-4 md:space-y-6">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          {/* Results count */}
          <div className="mb-4 md:mb-6 flex items-center gap-2 font-mono text-xs md:text-sm text-gray-500">
            <span className="text-cyan-400">&gt;</span>
            <span>Found <span className="text-cyan-400">{filteredAgents.length}</span> agents</span>
            {selectedCategory !== 'All' && (
              <span>in <span className="text-fuchsia-400">{selectedCategory}</span></span>
            )}
          </div>

          {/* Agent grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredAgents.map((agent, index) => (
              <MCPCard
                key={agent.id}
                agent={agent}
                index={index}
                installed={installedAgents.has(agent.id)}
                onInstall={() => handleInstall(agent.id)}
              />
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-16 md:py-20 font-mono">
              <div className="text-4xl md:text-6xl mb-4 opacity-20">:/</div>
              <p className="text-gray-500 text-sm md:text-base">No agents found matching your query</p>
              <p className="text-cyan-400/50 text-xs md:text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-6 md:py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="border-t border-gray-800/50 pt-6 md:pt-8 text-center">
              <p className="font-mono text-[10px] md:text-xs text-gray-600 tracking-wider">
                Requested by <span className="text-gray-500">@SoulSnipesFN</span> · Built by <span className="text-gray-500">@clonkbot</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
