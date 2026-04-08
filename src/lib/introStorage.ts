const INTRO_STORAGE_KEY = 'mastersPool_intro_v1'

export function hasCompletedIntro(): boolean {
  try {
    return localStorage.getItem(INTRO_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function completeIntro(): void {
  try {
    localStorage.setItem(INTRO_STORAGE_KEY, '1')
  } catch {
    /* ignore quota / private mode */
  }
}
