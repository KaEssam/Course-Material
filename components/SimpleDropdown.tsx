'use client'

import { ChevronDown, BookOpen, Code, Zap, FileText } from 'lucide-react'
import { useState } from 'react'

interface DropdownItem {
  label: string
  description?: string
  href?: string
  icon?: 'project' | 'practice' | 'resources' | 'description'
}

interface SimpleDropdownProps {
  title: string
  items: DropdownItem[]
  variant?: 'primary' | 'secondary' | 'success' | 'warning'
}

const iconMap = {
  project: Code,
  practice: Zap,
  resources: BookOpen,
  description: FileText,
}

const variantStyles = {
  primary: {
    button: 'bg-blue-600/10 border-blue-500/30 hover:bg-blue-600/20 hover:border-blue-500/50 text-blue-400',
    dropdown: 'bg-blue-950/30 border-blue-500/20',
    item: 'hover:bg-blue-600/10 hover:text-blue-300'
  },
  secondary: {
    button: 'bg-purple-600/10 border-purple-500/30 hover:bg-purple-600/20 hover:border-purple-500/50 text-purple-400',
    dropdown: 'bg-purple-950/30 border-purple-500/20',
    item: 'hover:bg-purple-600/10 hover:text-purple-300'
  },
  success: {
    button: 'bg-green-600/10 border-green-500/30 hover:bg-green-600/20 hover:border-green-500/50 text-green-400',
    dropdown: 'bg-green-950/30 border-green-500/20',
    item: 'hover:bg-green-600/10 hover:text-green-300'
  },
  warning: {
    button: 'bg-orange-600/10 border-orange-500/30 hover:bg-orange-600/20 hover:border-orange-500/50 text-orange-400',
    dropdown: 'bg-orange-950/30 border-orange-500/20',
    item: 'hover:bg-orange-600/10 hover:text-orange-300'
  }
}

export default function SimpleDropdown({ title, items, variant = 'primary' }: SimpleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const styles = variantStyles[variant]

  return (
    <div className="relative inline-block w-full max-w-md mx-auto my-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 flex items-center justify-between ${styles.button}`}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
        />
      </button>

      <div
        className={`absolute top-full left-0 right-0 mt-1 rounded-lg border overflow-hidden transition-all duration-200 z-10 ${
          isOpen ? 'opacity-100 visible max-h-96' : 'opacity-0 invisible max-h-0'
        } ${styles.dropdown}`}
      >
        <div className="py-2">
          {items.map((item, index) => {
            const IconComponent = item.icon ? iconMap[item.icon] : null
            const content = (
              <div className={`px-4 py-3 transition-colors duration-150 cursor-pointer ${styles.item} flex items-start gap-3`}>
                {IconComponent && (
                  <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.label}</div>
                  {item.description && (
                    <div className="text-xs text-text-muted mt-1">{item.description}</div>
                  )}
                </div>
              </div>
            )

            if (item.href) {
              return (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  {content}
                </a>
              )
            }

            return (
              <div key={index}>
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
