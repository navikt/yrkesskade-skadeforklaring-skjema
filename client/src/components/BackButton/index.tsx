import { Button } from '@navikt/ds-react';
import { Left } from '@navikt/ds-icons';
import './BackButton.less';

import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="backButton no-print">
      <Button
        onClick={handleBack}
        variant="tertiary"
        size="small"
        data-test-id="tilbake-steg"
      >
        <Left />
        Tilbake
      </Button>
    </div>
  );
};

export default BackButton;
