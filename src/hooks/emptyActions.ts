export type Actions = {
  show: () => void
  showWhile: (callback: () => Promise<void>) => Promise<void>
  close: () => void
}

export const emptyActions = {
  show(): void {
    // No operation function for context initialization.
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async showWhile(_callback: () => Promise<void>): Promise<void> {
    // No operation function for context initialization.
  },
  close(): void {
    // No operation function for context initialization.
  },
}
