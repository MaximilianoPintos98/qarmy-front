import { useEffect, useState } from 'react'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

const AppBarContent = props => {
  // ** Props
  const { settings, saveSettings } = props
  
  const [user, setUser] = useState({
    first_name: '',
    last_name: ''
  })

  useEffect(() => {
    getProfile()
  }, [])
  
  const getProfile = async () => {
    await axios
      .get('/api/profile')
      .then(response => {
        setUser(response.data)
      })
      .catch(() => {
        setUser({
          first_name: '',
          last_name: ''
        })
      })
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}></Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {
          (user.first_name != '' && user.last_name != '') ? <UserDropdown /> : null
        }
      </Box>
    </Box>
  )
}

export default AppBarContent
