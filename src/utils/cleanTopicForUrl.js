export const cleanTopicForUrl = (topicName) => {
  if (!topicName) return "";
  const cleanName = topicName.split("(")[0].trim();
  return encodeURIComponent(cleanName);
};
