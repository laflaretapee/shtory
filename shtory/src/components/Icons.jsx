const iconMap = {
  scissors: (
    <path
      d="M7 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm10 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM9 10l8-5m-8 4 8 9"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  ),
  measure: (
    <path
      d="M5 8.5 8.5 5H19v10L15.5 19H5V8.5Zm4 .5v2m3-2v1m3-1v2m-9 3h8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  ),
  fabric: (
    <path
      d="M6 6c1.6 2.4 3.2 3.6 5 3.6S14.4 8.4 16 6c1.6 2.4 3.2 3.6 5 3.6V18H6V6Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  ),
  window: (
    <path
      d="M6 5h12a1 1 0 0 1 1 1v12H5V6a1 1 0 0 1 1-1Zm6 0v13M5 10h14"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  ),
  install: (
    <path
      d="M6 8h12M8 8v8m8-8v8M5 18h14M11 5h2"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  ),
  wallet: (
    <path
      d="M5 8.5A2.5 2.5 0 0 1 7.5 6H18v12H7.5A2.5 2.5 0 0 1 5 15.5v-7Zm10 3.5h3m-8-6 5-2"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  ),
}

export function SectionIcon({ name }) {
  return (
    <span className="card-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{iconMap[name]}</svg>
    </span>
  )
}
