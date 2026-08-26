const isCoordinateString = (value) => {
  if (!value || typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;

  const coordPattern = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
  if (coordPattern.test(trimmed)) return true;

  const parenPattern = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*\(.*\)$/;
  return parenPattern.test(trimmed);
};

const formatDisplayLocation = (location) => {
  if (isCoordinateString(location)) return "Location shared";
  return location && String(location).trim() ? location : "Location not specified";
};

export default formatDisplayLocation;
