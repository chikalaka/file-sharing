import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ExplanationPopover from 'Components/ExplanationPopover/ExplanationPopover'
import SharableUrlModal from 'Components/Modals/SharableUrlModal/SharableUrlModal'
import React, { useState } from 'react'
import { eventPreventDefault } from 'utils/utils'
import styles from './FileUploader.module.css'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

const FileUploader = ({acceptFileTypes, isValidType, url}) => {
  const [selectedFile, setSelectedFile] = useState()
  const [isFileSelected, setIsFileSelected] = useState(false)
  const [shareableUrl, setSharableUrl] = useState()
  const [ttl, setTtl] = useState(600)

  const setFile = file => {
    setSelectedFile(file)
    setIsFileSelected(true)
  }

  const clearFile = () => {
    setIsFileSelected(false)
    setSelectedFile(undefined)
  }

  const onInputFileChange = (event) => {
    const file = event.target.files[0]
    file ? setFile(file) : clearFile()
  }

  const onSubmit = () => {
    const formData = new FormData()

    formData.append('uploaded_file', selectedFile)
    formData.append('ttl', ttl)

    fetch(
      url,
      {
        method: 'POST',
        body: formData,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        headers: {
          'Accept': 'application/json',
        }
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setSharableUrl(result)
        clearFile()
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const onDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer?.files[0]
    const {type} = file || {}
    if (isValidType(type)) {
      setFile(file)
    } else {
      console.error('File type is not accepted')
    }
  }

  const onRetentionTimeChange = (event) => {
    setTtl(event.target.value)
  }

  return (
    <div>
      <input id={'inputFile'} className={styles.inputFile} type="file" name="file" accept={acceptFileTypes}
             onChange={onInputFileChange}/>
      <label htmlFor="inputFile">
        <div className={styles.dropZone} id="drop_zone" onDrop={onDrop} onDragOver={eventPreventDefault}>
          {isFileSelected ? (
            <div>
              <p>Selected file: {selectedFile.name}</p>
            </div>
          ) : (
            <div>
              <FileDownloadOutlinedIcon className={styles.downloadIcon}/>
              <div>
                Drag & drop or click here
              </div>
            </div>
          )
          }
        </div>
      </label>
      <div className={styles.retentionTimeContainer}>
        <div className={styles.retentionText}>Retention time:</div>
        <TextField className={styles.retentionInput} value={ttl} onChange={onRetentionTimeChange} type="number"/>
        <ExplanationPopover explanation={'Expiration time for the image; in seconds'}/>
      </div>
      <Button variant="contained" disabled={!selectedFile} onClick={onSubmit}>
        Submit
      </Button>
      <SharableUrlModal open={!!shareableUrl} onClose={() => setSharableUrl(null)} url={shareableUrl}/>
    </div>
  )
}

export default FileUploader