import React, { useContext, useState } from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Popover from '@material-ui/core/Popover'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import AddIcon from '@material-ui/icons/Add'

import CreateEditForm from './CreateEditForm'
import VerticesContext from '../../contexts/vertices'


interface CanvasMenuProps {
    left: number
    top: number
    setShouldOpen(b: boolean): void
}

const CanvasMenu: React.FC<CanvasMenuProps> = ({ left, top, setShouldOpen }) => {
    const { deleteVertex, selectedVertex } = useContext(VerticesContext)
    const [openForm, setOpenForm] = useState<boolean>(false)

    const handleDeleteVertex = () => {
        deleteVertex()
        setShouldOpen(false)
    }

    const renderCreate = () => {
        return (
            <MenuList>
                <MenuItem onClick={() => setOpenForm(true)}>
                        <ListItemIcon>
                            <AddIcon color="primary" />
                        </ListItemIcon>
                            Create
                </MenuItem>
                <MenuItem onClick={() => setShouldOpen(false)}>
                        <ListItemIcon>
                            <NotInterestedIcon color="secondary" />
                        </ListItemIcon>
                            Cancel
                </MenuItem>
            </MenuList>
        )
    }

    const renderDelete = () => {
        return (
            <MenuList>
                <MenuItem onClick={() => setOpenForm(true)}>
                        <ListItemIcon>
                            <EditIcon color="primary" />
                        </ListItemIcon>
                            Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteVertex}>
                        <ListItemIcon>
                            <DeleteIcon color="secondary" />
                        </ListItemIcon>
                            Delete
                </MenuItem>
                <MenuItem onClick={() => setShouldOpen(false)}>
                        <ListItemIcon>
                            <NotInterestedIcon color="secondary" />
                        </ListItemIcon>
                            Cancel
                </MenuItem>
            </MenuList>
        )
    }

    const renderMenu = () => {
        if(selectedVertex)
            return renderDelete()
        return renderCreate()
    }

    return (
        <Popover 
            anchorReference="anchorPosition"
            anchorPosition={{ top, left }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={true}
            >
                { openForm ? <CreateEditForm setShowSelf={setShouldOpen} /> : renderMenu() }
        </Popover>
    )
}

export default CanvasMenu