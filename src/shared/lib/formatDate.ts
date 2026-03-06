export const formatDate = (dateString: string) => {
  const utcString = dateString.endsWith("Z") ? dateString : dateString + "Z";
  const date = new Date(utcString);

  if (Number.isNaN(date.getTime())) return dateString;

  return (
    date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "") +
    " " +
    date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
};
