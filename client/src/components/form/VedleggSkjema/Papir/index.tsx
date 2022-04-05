import { BodyLong, BodyShort, Link } from '@navikt/ds-react';

const Papir = () => {
  return (
    <>
      <BodyLong spacing>
        Du kan sende inn dokumentasjonen din per post til:
      </BodyLong>
      <div data-test-id="post-adresse">
        <BodyShort>NAV Skanning</BodyShort>
        <BodyShort>Postboks 1400</BodyShort>
        <BodyShort spacing>0109 OSLO</BodyShort>
      </div>
      <BodyLong spacing>
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
