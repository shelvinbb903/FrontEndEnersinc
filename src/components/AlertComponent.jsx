import { Alert } from "@mui/material"
import { Stack } from "@mui/system"

export const AlertComponent = ({type, message}) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={ type }>{ message }</Alert>
    </Stack>
  )
}

AlertComponent.defaultProps = {
    type: 'info',
    message: ''
}
