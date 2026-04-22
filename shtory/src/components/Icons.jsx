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
  whatsapp: (
    <path
      d="M12 4a7 7 0 0 0-6.1 10.44L5 20l5.72-.88A7 7 0 1 0 12 4Zm3.27 10.05c-.13.36-.75.68-1.03.73-.27.06-.61.08-.98-.04-.22-.07-.5-.16-.87-.32-1.52-.66-2.5-2.24-2.57-2.34-.07-.1-.61-.81-.61-1.54s.38-1.09.52-1.24c.13-.15.28-.18.37-.18h.27c.08 0 .2-.03.31.24.11.27.38.92.41.99.03.07.05.16.01.26-.04.1-.07.16-.15.24-.07.08-.16.18-.23.24-.08.08-.16.16-.07.32.09.16.4.66.86 1.07.59.53 1.08.69 1.24.77.16.08.25.07.35-.04.1-.11.41-.48.52-.65.11-.17.22-.14.36-.08.15.05.93.44 1.09.52.16.08.27.12.31.19.03.07.03.41-.1.77Z"
      fill="currentColor"
    />
  ),
  telegram: (
    <path
      d="M19.44 5.57 4.86 11.2c-.99.4-.98.95-.18 1.2l3.74 1.17 1.45 4.53c.18.5.09.7.62.7.41 0 .59-.19.82-.42.14-.13.97-.95 1.86-1.81l3.87 2.86c.71.39 1.22.19 1.4-.66l2.48-11.7c.26-1.04-.4-1.51-1.08-1.2ZM9 13.3l8.55-5.39c.43-.27.83-.12.51.16l-7.05 6.36-.27 2.9L9 13.3Z"
      fill="currentColor"
    />
  ),
  vk: (
    <path
      d="M5.96 7.5c.1 4.84 2.53 7.75 6.8 7.75h.26v-2.77c1.56.15 2.73 1.27 3.21 2.77H19c-.61-2.24-2.24-3.48-3.26-3.96 1.02-.59 2.46-2.03 2.81-3.79H15.9c-.46 1.44-1.78 2.88-2.88 3V7.5H10.4v5.25c-1.11-.28-2.52-1.82-2.58-5.25H5.96Z"
      fill="currentColor"
    />
  ),
  phone: (
    <path
      d="M7.63 5.3c.3-.3.8-.3 1.1 0l1.59 1.59c.3.3.3.79 0 1.09l-1 1c.74 1.42 1.9 2.58 3.32 3.32l1-1c.3-.3.79-.3 1.09 0l1.59 1.59c.3.3.3.8 0 1.1l-.9.9c-.41.41-1.02.58-1.58.44-5.27-1.31-9.43-5.47-10.74-10.74-.14-.56.03-1.17.44-1.58l.9-.9Z"
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

export function ChannelIcon({ name }) {
  return (
    <span className="channel-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{iconMap[name]}</svg>
    </span>
  )
}
