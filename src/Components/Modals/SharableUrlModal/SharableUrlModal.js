import { ContentCopy } from '@mui/icons-material'
import Fab from '@mui/material/Fab'
import Modal from 'Components/Modal/Modal'
import copy from 'copy-to-clipboard'
import React from 'react'
import styles from './SharableUrlModal.module.css'

const SharableUrlModal = ({url, ...props}) => {
  return (
    <Modal title={<ModalTitle url={url}/>}
           description={<ModalDescription url={url} />}
           {...props}
    />
  )
}

const ModalTitle = ({url}) => {
  console.log("url", url)
  const copyUrlToClipboard = () => copy(url)

  return <div className={styles.titleContainer}>
    <div>Share your URL :)</div>
    <Fab size={"small"} onClick={copyUrlToClipboard} color="primary" aria-label="add">
      <ContentCopy fontSize={'small'}/>
    </Fab>
  </div>
}

const ModalDescription = ({url}) => {
  return <div>
    {url}
  </div>
}

export default SharableUrlModal