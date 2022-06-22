export const endpointUrls = {
  skadeforklaringer: '**/api/*/skadeforklaringer',
  brukerinfo: '**/user/profile',
  toggle: '**/toggles',
  log: '**/log',
  print: '**/print*',
  kodeverk: {
    fravaertyper: '**/api/*/kodeverk/typer/fravaertype/kodeverdier',
    foerteDinSkadeEllerSykdomTilFravaer:
      '**/api/*/kodeverk/typer/foerteDinSkadeEllerSykdomTilFravaer/kodeverdier',
    land: '**/api/*/kodeverk/typer/landkoder/kategorier/*/kodeverdier',
    tidsrom: '**/api/*/kodeverk/typer/tidsrom/kategorier/*/kodeverdier',
    innmelderroller: '**/api/*/kodeverk/typer/innmelderrolle/kodeverdier',
  },
  vedlegg: '**/api/*/vedlegg',
  amplitude: '**/collect-auto',
};
