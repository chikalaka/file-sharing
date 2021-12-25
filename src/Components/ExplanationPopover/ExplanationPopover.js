import { HelpOutline } from '@mui/icons-material'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import React from 'react'

const ExplanationPopover = ({explanation}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const onClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const onClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <HelpOutline cursor="pointer" onClick={onClick}/>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{p: 1}}>{explanation}</Typography>
      </Popover>
    </div>
  )
}

export default ExplanationPopover