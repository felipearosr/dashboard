"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

const DEFAULT_THEME = "default"

type ThemeContextType = {
  activeTheme: string
  setActiveTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType>({
  activeTheme: DEFAULT_THEME,
  setActiveTheme: () => {},
})

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode
  initialTheme?: string
}) {
  const [activeTheme, setActiveTheme] = useState<string>(
    () => initialTheme || DEFAULT_THEME
  )

  useEffect(() => {
    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className)
      })
    document.body.classList.add(`theme-${activeTheme}`)
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled")
    }
  }, [activeTheme])

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeConfig() {
  return useContext(ThemeContext)
}