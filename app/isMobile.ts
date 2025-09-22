export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  const userAgent = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent,
  );
};
