export const useCancel = () => {
  const handleCancel = () => {
    window.location.href =
      'https://www.nav.no/soknader/nb/person/helse/yrkesskade';
  };

  return handleCancel;
};
