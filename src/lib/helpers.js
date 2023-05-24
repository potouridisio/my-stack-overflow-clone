export function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);
  const months = Math.floor(seconds / 2592000);
  const years = Math.floor(seconds / 31536000);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes === 1) {
    return `${minutes} minute`;
  } else if (minutes < 60 && minutes > 1) {
    return `${minutes} minutes`;
  } else if (hours === 1) {
    return `${hours} hour`;
  } else if (hours < 24 && hours > 1) {
    return `${hours} hours`;
  } else if (days === 1) {
    return `${days} day`;
  } else if (days < 30 && days > 1) {
    return `${days} days`;
  } else if (months === 1) {
    return `${months} month`;
  } else if (months < 12 && months > 1) {
    return `${months}months`;
  } else if (years === 1) {
    return `${years} year`;
  } else {
    return `${years} years`;
  }
}
