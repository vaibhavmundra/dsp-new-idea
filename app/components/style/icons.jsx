export function Tick({ width, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={color}
      style={{ width: width, height: width }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function Pin({ width, color }) {
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth={1.5}
    stroke={color}
    style={{ width: width, height: width }}
  >
    <rect
      x="66.5117"
      y="10.7071"
      width="33.1503"
      height="53.8263"
      transform="rotate(45 66.5117 10.7071)"
      stroke={color}
    />
    <path d="M40.7376 61.5003L15.8644 86.3749" stroke={color} />
  </svg>;
}
