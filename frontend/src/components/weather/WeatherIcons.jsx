export const WeatherIcon = ({ type }) => {
  const iconKey = type.toLowerCase();

  const icons = {
    clear: (
      <svg viewBox="0 0 64 64" width="60" height="60">
        <circle cx="32" cy="32" r="14" fill="#FFD93B" />
      </svg>
    ),
    partlycloudy: (
      <svg viewBox="0 0 64 64" width="60" height="60">
        <circle cx="26" cy="26" r="10" fill="#FFD93B" />
        <ellipse cx="36" cy="36" rx="14" ry="10" fill="#A0AEC0" />
      </svg>
    ),
    cloudy: (
      <svg viewBox="0 0 64 64" width="60" height="60">
        <ellipse cx="32" cy="36" rx="18" ry="12" fill="#CBD5E0" />
        <ellipse cx="40" cy="32" rx="12" ry="10" fill="#A0AEC0" />
      </svg>
    ),
    rain: (
      <svg viewBox="0 0 64 64" width="60" height="60">
        <ellipse cx="32" cy="30" rx="16" ry="10" fill="#A0AEC0" />
        <line x1="22" y1="40" x2="22" y2="50" stroke="#3182CE" strokeWidth="2" />
        <line x1="32" y1="40" x2="32" y2="52" stroke="#3182CE" strokeWidth="2" />
        <line x1="42" y1="40" x2="42" y2="50" stroke="#3182CE" strokeWidth="2" />
      </svg>
    ),
    thunder: (
      <svg viewBox="0 0 64 64" width="60" height="60">
        <ellipse cx="32" cy="30" rx="16" ry="10" fill="#A0AEC0" />
        <polygon points="30,32 36,32 30,46 42,40 36,40 42,26" fill="#F6E05E" />
      </svg>
    ),
    snow: (
      <svg viewBox="0 0 64 64" width="60" height="60">
        <ellipse cx="32" cy="30" rx="16" ry="10" fill="#CBD5E0" />
        <text x="24" y="52" fontSize="20" fill="#63B3ED">❄️</text>
      </svg>
    ),
    default: (
      <svg viewBox="0 0 64 64" width="60" height="60">
        <circle cx="32" cy="32" r="12" fill="#E2E8F0" />
      </svg>
    )
  };

  // Normalize some OpenWeather descriptions
  const match = iconKey.includes('clear')
    ? 'clear'
    : iconKey.includes('partly') || iconKey.includes('few clouds')
    ? 'partlycloudy'
    : iconKey.includes('cloud')
    ? 'cloudy'
    : iconKey.includes('thunder')
    ? 'thunder'
    : iconKey.includes('rain')
    ? 'rain'
    : iconKey.includes('snow')
    ? 'snow'
    : 'default';

  return icons[match] || icons.default;
};
