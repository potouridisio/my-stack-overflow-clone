export function convertToRelativeDate(isoDate) {
  const currentDate = new Date();
  const parsedDate = new Date(isoDate);

  const timeDiff = Math.abs(currentDate - parsedDate);

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return seconds + " sec" + (seconds !== 1 ? "s" : "") + " ago";
  } else if (minutes < 60) {
    return minutes + " min" + (minutes !== 1 ? "s" : "") + " ago";
  } else if (hours < 24) {
    return hours + " hour" + (hours !== 1 ? "s" : "") + " ago";
  } else if (days < 30) {
    return days + " day" + (days !== 1 ? "s" : "") + " ago";
  } else if (months < 12) {
    return months + " month" + (months !== 1 ? "s" : "") + " ago";
  } else {
    return years + " year" + (years !== 1 ? "s" : "") + " ago";
  }
}

export function indexBy(array, key) {
  const indexedData = {};

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const keyValue = item[key];
    indexedData[keyValue] = item;
  }

  return indexedData;
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  let truncatedText = text.substr(0, maxLength);
  truncatedText = truncatedText.substr(
    0,
    Math.min(truncatedText.length, truncatedText.lastIndexOf(" "))
  );

  truncatedText += "...";

  return truncatedText;
}

export function selectedTabStyle(tab, selectedTab) {
  return `relative m-0 box-border inline-flex cursor-pointer select-none appearance-none items-center 
          justify-center rounded rounded-br-none rounded-tr-none border border-solid border-black 
          border-opacity-[0.12]${
            tab === selectedTab ? " bg-[rgba(25,_118,_210,_0.08)]" : ""
          } 
          p-[7px] align-middle text-[0.8125rem] font-medium uppercase leading-[1.75] tracking-[0.02857em]${
            tab === selectedTab ? " text-[rgb(25,_118,_210)]" : ""
          } no-underline outline-0 ${
    tab === selectedTab
      ? "hover:bg-[rgba(25,_118,_210,_0.12)]"
      : "hover:bg-[rgba(0,_0,_0,_0.04)]"
  } hover:no-underline`;
}
