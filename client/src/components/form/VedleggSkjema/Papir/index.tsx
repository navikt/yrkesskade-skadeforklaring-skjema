import { BodyLong, Link } from '@navikt/ds-react';

const Papir = () => {
  return (
    <>
      <BodyLong spacing>
        Du kan sende inn dokumentasjonen din per post til:
      </BodyLong>
      <BodyLong>
        <span>NAV Skanning</span>
        <span>Postboks 1400</span>
        <span>0109 OSLO</span>
      </BodyLong>
      <BodyLong>
        Husk å skrive ut førstesiden for å knytte skjemaet til riktig person og
        legge den ved innsendelsen.
      </BodyLong>
      <Link href="#" target="_blank">
        Last ned førstesiden til saken (åpnes i nytt vindu)
      </Link>
    </>
  );
};

export default Papir;
