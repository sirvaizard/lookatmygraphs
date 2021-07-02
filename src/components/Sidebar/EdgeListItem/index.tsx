import React, { useState, useContext } from 'react'
import Delete from '@material-ui/icons/Delete'
import ArrowForward from '@material-ui/icons/ArrowForward'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'

import Edge from '../../../drawables/Edge'
import VerticesContext from '../../../contexts/vertices'

interface EdgeListItemProps {
    edge: Edge
    forceRender(o: {}):void
}

const EdgeListItem: React.FC<EdgeListItemProps> = ({ edge, forceRender }) => {
    const [cost, setCost] = useState<number>(edge.cost)
    const { disconnectVertex } = useContext(VerticesContext)

    const handleDisconnectVertex = () => {
        disconnectVertex(edge.destination)
        forceRender({})
    }

    const handleChangeEdgeCost = (e: any) => {
        setCost(e.target.value)
        edge.cost = e.target.value
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <ArrowForward />
                <span title={edge.destination.value} style={{ fontSize: '14px'}}>{edge.destination.value.slice(0, 9)}</span>
            </div>
            <div>
                <TextField type="number" label="cost" size="small" value={cost} style={{ width: '80px'}} onChange={handleChangeEdgeCost} />
                <IconButton edge="end" onClick={handleDisconnectVertex}>
                    <Delete />
                </IconButton>
            </div>
        </div>
    )
}

export default EdgeListItem
