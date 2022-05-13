export const endpointUrls = {
  innlogget: '**/innlogget',
  skadeforklaringer: '**/api/*/skadeforklaringer',
  brukerinfo: '**/api/*/brukerinfo',
  toggle: '**/toggles',
  log: '**/log',
  print: '**/print*',
  kodeverk: {
    fravaertyper: '**/api/*/kodeverk/typer/fravaertype/kodeverdier',
    foerteDinSkadeEllerSykdomTilFravaer:
      '**/api/*/kodeverk/typer/foerteDinSkadeEllerSykdomTilFravaer/kodeverdier',
    land: '**/api/*/kodeverk/typer/landkoder/kategorier/*/kodeverdier',
    tidsrom: '**/api/*/kodeverk/typer/tidsrom/kategorier/*/kodeverdier',
  },
  vedlegg: '**/api/*/vedlegg',
  amplitude: '**/collect-auto',
};
