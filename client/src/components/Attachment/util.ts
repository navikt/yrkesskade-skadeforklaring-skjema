import { Attachment, InnsendingsType } from '../../types/attachment';
import { v4 as uuid } from 'uuid';

export const generateAttachmentId = () => 'V'.concat(uuid().replace(/-/g, ''));

export const mapFileToAttachment = (
  file: File,
  innsendingsType?: InnsendingsType
): Attachment => ({
  id: generateAttachmentId(),
  file,
  filename: file.name,
  filesize: file.size,
  uploaded: false,
  pending: false,
  innsendingsType,
});

export const isAttachmentWithError = (attachment: Attachment) => {
  if (attachment === undefined || attachment === null) {
    return true;
  }

  const { innsendingsType, pending, uploaded, filesize } = attachment;
  return innsendingsType === InnsendingsType.SEND_SENERE
    ? false
    : (pending === false && uploaded === false) || filesize === 0;
};
