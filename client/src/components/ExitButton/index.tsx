import { useState, useEffect } from 'react';
import { Button, Modal, Heading } from '@navikt/ds-react';

import './ExitButton.less';

import { useCancel } from '../../core/hooks/cancel.hooks';

const ExitButton = () => {
  const cancel = useCancel();

  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = () => {
    setIsOpen(true);
  };
  const onCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (Modal && Modal.setAppElement) {
      Modal.setAppElement('#root');
    }
  }, []);

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleButtonClick}
        data-test-id="avbryt-skadeforklaring"
      >
        Avbryt
      </Button>
      <Modal
        open={isOpen}
        onClose={onCloseModal}
        aria-label="Modal for å lukke skjemadialogen"
      >
        <Modal.Content className="ModalContent">
          <Heading className="spacer" level="1" size="large">
            Avbryt
          </Heading>
          <Heading className="spacer" level="2" size="medium">
            Er du sikker på at du vil avbryte?
          </Heading>
          <div className="buttonSection buttonGroup">
            <Button
              onClick={onCloseModal}
              data-test-id="avbryt-skadeforklaring-tilbake"
            >
              Nei, tilbake
            </Button>
            <Button
              variant="tertiary"
              onClick={cancel}
              data-test-id="avbryt-skadeforklaring-bekreft"
            >
              Ja, avbryt
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ExitButton;
