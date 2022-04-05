import { BodyLong, Link } from '@navikt/ds-react';

const Papir = () => {
  return (
    <div className="spacer">
      <BodyLong spacing>
        For å kunne sende dokumentasjonen din per post må du skrive ut
        førstesiden for å knytte skjemaet til riktig person og legge den ved
        innsendelsen. Her finner du også hvilken adresse du skal sende til.
      </BodyLong>
      <Link
        href="https://www.nav.no/soknader/nb/person/helse/yrkesskade/NAV%2013-07.05/ettersendelse/brev"
        target="_blank"
      >
        Last ned førstesiden til saken (åpnes i nytt vindu)
      </Link>
    </div>
  );
};

export default Papir;
