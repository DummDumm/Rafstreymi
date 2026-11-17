// Lets the router wait until the old page has faded out before it scrolls,
// so the jump to the top happens while nothing is visible.
let leaving = false
let waiting = []

export function pageLeaveStart() {
  leaving = true
}

export function pageLeaveDone() {
  leaving = false
  waiting.forEach((resolve) => resolve())
  waiting = []
}

export function afterPageLeave() {
  if (!leaving) return Promise.resolve()
  return new Promise((resolve) => {
    waiting.push(resolve)
    // safety net in case the transition never reports back
    setTimeout(resolve, 600)
  })
}

export const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
