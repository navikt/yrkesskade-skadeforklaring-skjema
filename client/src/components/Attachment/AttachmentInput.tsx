import { Upload } from '@navikt/ds-icons';
import './attachment.less';

interface AttachmentInputProps {
  id: string;
  onFilesSelect: (files: File[]) => void;
  onClick: () => void;
}

const AttachmentInput = (props: AttachmentInputProps) => {
  const { id, onClick } = props;
  const inputId = `${id}-input`;

  const isFileExtensionValid = (filename: string): boolean => {
    const validExtensions = ['pdf', 'jpeg', 'jpg', 'png'];
    const extension = filename.split('.').pop();
    if (extension) {
      return validExtensions.includes(extension.toLowerCase());
    }
    return false;
  };

  const getValidFiles = (files: File[]): File[] => {
    return files.filter((file: File) => {
      return isFileExtensionValid(file.name);
    });
  };

  const fileSelectHandler = (fileList: FileList) => {
    const validFiles = getValidFiles(Array.from(fileList));
    if (validFiles.length > 0) {
      props.onFilesSelect(validFiles);
    }
  };

  const onFileDragOverHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const onFileDropHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    fileSelectHandler(e.dataTransfer.files);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      fileSelectHandler(e.target.files);
      e.target.value = '';
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    const { id } = props;
    const ENTER_KEYCODE = 13;
    const inputElement = document.getElementById(id);
    if (e.which === ENTER_KEYCODE && inputElement !== null) {
      inputElement.click();
    }
  };

  return (
    <label
      role="button"
      aria-label={'label'}
      id={id}
      tabIndex={0}
      htmlFor={inputId}
      className={'attachmentButton'}
      onDragOver={(e) => onFileDragOverHandler(e)}
      onDrop={(e) => onFileDropHandler(e)}
      onKeyPress={(e) => onKeyPress(e)}
    >
      <div className={'icon'}>
        <Upload />
      </div>
      <div className={'label'}>Last opp dokumentasjon</div>
      <input
        id={inputId}
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={(e) => onFileSelect(e)}
        multiple={true}
        onClick={onClick}
      />
    </label>
  );
};

export default AttachmentInput;
