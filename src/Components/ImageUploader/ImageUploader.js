import FileUploader from 'Components/FileUploader/FileUploader'
import React from 'react'
import styles from './ImageUploader.module.css'

const ImageUploader = () => {
  const acceptFileTypes = 'image/*'
  const isValidType = (type) => type.slice(0, 6) === 'image/'
  const url = 'http://localhost:9000/images'

  return (
    <FileUploader isValidType={isValidType}
                  acceptFileTypes={acceptFileTypes}
                  url={url}
    />
  )
}

export default ImageUploader