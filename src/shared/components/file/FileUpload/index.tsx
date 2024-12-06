import { css } from '@emotion/react';
import { useState, ChangeEvent, useRef, FC } from 'react';
import Flex from '../../flex';
import Label from '../../label';

interface UploadedFile {
  file: File;
}

interface FileUploadProps {
  // eslint-disable-next-line
  onImagesChange: (files: File[]) => void;
}

const styles = {
  container: css`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    overflow-x: auto;
    @media (max-width: 768px) {
      overflow-x: hidden;
    }
  `,
  uploadBox: css`
    width: 60px;
    height: 60px;
    border: 1px dashed #c4c4c4;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    font-size: 24px;
  `,
  previewImageContainer: css`
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;
  `,
  previewImage: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  deleteButton: css`
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
  `
};

const FileUpload: FC<FileUploadProps> = function FileUpload({ onImagesChange }) {
  const [images, setImages] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => ({ file }));
    const updatedImages = [...images, ...newImages];

    setImages(updatedImages);
    onImagesChange(updatedImages.map((image) => image.file));
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages.map((image) => image.file));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Flex direction='column' alignItems='flex-start'>
      <Label text='사진' fontSize='1rem' color='black' />
      <div css={styles.container}>
        <button css={styles.uploadBox} onClick={handleUploadClick} type='button'>
          +
          <input
            type='file'
            ref={fileInputRef}
            accept='image/*'
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </button>
        {images.map((image, index) => (
          <div key={image.file.lastModified} css={styles.previewImageContainer}>
            <img src={URL.createObjectURL(image.file)} alt={`Uploaded preview ${index}`} css={styles.previewImage} />
            <button css={styles.deleteButton} onClick={() => handleDeleteImage(index)} type='button'>
              x
            </button>
          </div>
        ))}
      </div>
    </Flex>
  );
};

export default FileUpload;
