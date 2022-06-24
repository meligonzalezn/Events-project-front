import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { enable } from 'src/utils/userAxios';
import Link from 'next/link'

/**
 * 
 * @param {{id: int}} props 
 * @returns 
 */
export default function BasicMenu(props) {

  const handleInhabilitar = () => {
    enable(props.id)
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /**
   * Funcionalidad de inhabilitar a un usuario
   */
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <h2>:</h2>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <Link href={`Usuarios/[id]/Editar/`} as={`Usuarios/${props.id}/Editar/`}
        >Editar</Link></MenuItem>
      <MenuItem onClick={handleInhabilitar}>Inhabilitar</MenuItem>
    </Menu>
    </div >
  );
}