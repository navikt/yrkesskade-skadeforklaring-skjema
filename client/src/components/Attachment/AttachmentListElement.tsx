import { Attachment } from '../../types/attachment';
import { Attachment as VedleggIkon, Delete } from '@navikt/ds-icons';
import './attachment.less';
import { Link, Loader } from '@navikt/ds-react';
import React from 'react';
import { bytesString } from '../../utils/filesize';

interface OwnProps {
  attachment: Attachment;
  showFileSize?: boolean;
  onDelete?: (file: Attachment) => void;
}

type Props = OwnProps;

const AttachmentListElement: React.FunctionComponent<Props> = ({
  attachment,
  showFileSize,
  onDelete,
}) => {
  //   const BEM = BEMHelper('attachment');
  //   const cls = classnames(BEM.block, {
  //       [BEM.modifier('pending')]: attachment.pending,
  //   });

  return (
    <div className="attachment">
      {attachment.pending && (
        <div className="spinner">
          <Loader size="small" />
        </div>
      )}
      <VedleggIkon className="icon" />
      <div className={'filename'}>
        <React.Fragment>{attachment.filename}</React.Fragment>
      </div>
      {showFileSize && (
        <div className="filesize">{bytesString(attachment.filesize)}</div>
      )}
      {onDelete && (
        <span className={'deleteButton'}>
          <Link onClick={() => onDelete(attachment)}>
            Slett <Delete />
          </Link>
        </span>
      )}
    </div>
  );
};

export default AttachmentListElement;
