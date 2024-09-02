
function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export const stringAvatar = (name) => {
  const nameParts = name.split(' ');

  // Handle single name case
  const initials =
    nameParts.length === 1
      ? `${nameParts[0][0].toUpperCase()}${nameParts[0][0].toUpperCase()}`
      : `${nameParts[0][0].toUpperCase()}${nameParts[1][0].toUpperCase()}`;

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
};