export const useMediaLink = () => {
  const getMediaHref = (mediaId: number, mediaType: string) => {
    const type = mediaType === "SERIES" ? "SERIES" : "CONTENTS";
    return `/contents/${mediaId}?type=${type}`;
  };

  return { getMediaHref };
};
