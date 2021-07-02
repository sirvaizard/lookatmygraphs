import React, { useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import VerticesContext from '../../../contexts/vertices'
import { Container, ButtonsContainer } from './styles'

interface CreateEditFormProps {
    setShowSelf(b: boolean): void
}

const CreateEditForm: React.FC<CreateEditFormProps> = ({ setShowSelf }) => {
    const { selectedVertex, createVertex, currentValue, setCurrentValue, editVertex} = useContext(VerticesContext)
    const [invalidValue, setInvalidValue] = useState<boolean>(false)

    const handleCreateEditVertex = () => {
        if(!currentValue.trim()) {
            setInvalidValue(true)
            return
        }

        if(selectedVertex) {
            editVertex()
        }
        else
            createVertex()
        setShowSelf(false)
    }

    const handleValueInput = (e: any) => {
        setCurrentValue(e.target.value)
    }

    return (
        <Container>
            <TextField
                id="vertex-label"
                label="Value"
                variant="standard"
                error={invalidValue}
                onChange={handleValueInput}
                helperText={invalidValue && "Value cannot be empty"}
                />
            <ButtonsContainer>
                <Button variant="contained" onClick={handleCreateEditVertex}>{ selectedVertex ? 'Save' : 'Create'}</Button>
                <Button variant="contained" color="secondary" onClick={() => setShowSelf(false)}>Cancel</Button>
            </ButtonsContainer>
        </Container>
    )
}

export default CreateEditForm
