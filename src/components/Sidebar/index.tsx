import React, { useContext, useRef, useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'
import Close from '@material-ui/icons/Close'
import DeviceHub from '@material-ui/icons/DeviceHub'
import Code from '@material-ui/icons/Code'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'

import EdgeListItem from './EdgeListItem'

import { Container, MenuContainer, ButtonContainer } from './styles'
import VerticesContext from '../../contexts/vertices'
import Vertex from '../../drawables/Vertex'
import Edge from '../../drawables/Edge'

import depthFirstSearch from '../../utils/algorithms/depthFirstSearch'
import breadthFirstSearch from '../../utils/algorithms/breadthFirstSearch'
import bestFirstSearch from '../../utils/algorithms/bestFirstSearch'
import restoreGraph from '../../utils/restoreGraph'

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        margin: '40px',
    }
})

const Sidebar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(true)
    const [, forceRender] = useState({})
    const [connectEdgeCost, setConnectEdgeCost] = useState<number>(0)
    const [selectVertexIndex, setSelectedVertexIndex] = useState<number>(0)
    const [openSelectConnectWithVertex, setOpenSelectConnectWithVertex] = useState<boolean>(false)
    const [selectConnectWithVertexIndex, setSelectConnectWithVertexIndex] = useState<string>('')

    const [showCost, setShowCost] = useState<boolean>(true)
    const [vertexColor, setVertexColor] = useState<string>('#ffffff')

    const navRef = useRef<HTMLDivElement>(null)
    const navContRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const { vertices,
            selectedVertex,
            getNotConnectedVertices,
            deleteGraph,
            randomCosts } = useContext(VerticesContext)

    const [stepMili, setStepMili] = useState<number>(Vertex.stepMili)

    const classes = useStyles()

    const toggleMenu = () => {
        setOpen(!open)

        if(navRef.current)
            navRef.current.classList.toggle('is-closed')
        if(buttonRef.current)
            buttonRef.current.classList.toggle('is-closed')
        if(navContRef.current)
            navContRef.current.classList.toggle('is-closed')

    };

    const toggleOpenSelectConnectWithVertex = () => {
        if(openSelectConnectWithVertex)
            setOpenSelectConnectWithVertex(false)
        else
            setOpenSelectConnectWithVertex(true)
    }

    const handleChangeSelectConnectWithVertex = (e: any) => {
        setSelectConnectWithVertexIndex(e.target.value)
    }

    const handleConnectVertex = () => {
        if(selectedVertex) {
            selectedVertex.connect(
                vertices[Number(selectConnectWithVertexIndex)],
                connectEdgeCost
            )
        }
    }

    const handleShowCostSwitch = (e: any) => {
        setShowCost(!showCost)
        Edge.showCost = !Edge.showCost
    }

    const handleChangeVertexColor = (e: any) => {
        const { value } = e.target

        Vertex.borderColorSelected = value
        setVertexColor(value)
    }

    const handleChangeSlider = (e: any) => {
        const value = Number(e.target.value)
        setStepMili(value)
        Vertex.stepMili = value
    }

    useEffect(() => {
        let idx = -1
        if(selectedVertex)
            idx = vertices.indexOf(selectedVertex)
        if(idx !== -1)
            setSelectedVertexIndex(idx)

    }, [selectedVertex, vertices])

    return (
        <Container ref={navRef}>
            <MenuContainer ref={navContRef}>
                <div className={classes.root}>
                    <Typography fontSize="22px">
                        Settings
                    </Typography>
                </div>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <DeviceHub />
                        <Typography>Vertex Connections</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Create New</Typography>
                        <div style={{ display: 'flex' }}>
                            <InputLabel id="select-connect-with-label">Connect with</InputLabel>
                            <Select
                                labelId="select-connect-with-label"
                                id="select-connect-with-vertex"
                                name="select-connect-with-vertex"
                                open={openSelectConnectWithVertex}
                                onOpen={toggleOpenSelectConnectWithVertex}
                                onClose={toggleOpenSelectConnectWithVertex}
                                value={selectConnectWithVertexIndex}
                                onChange={handleChangeSelectConnectWithVertex}>
                                { getNotConnectedVertices().map(vertex => (
                                    <MenuItem value={vertices.indexOf(vertex)} key={vertex.value}>{vertex.value}</MenuItem>
                                ))}
                            </Select>
                            <TextField id="edge-cost" label="cost" size="small"
                                value={connectEdgeCost}
                                onChange={e => setConnectEdgeCost(Number(e.target.value))}/>
                        </div>
                        <Button color="primary" variant="contained" onClick={handleConnectVertex}>Connect</Button>
                        <Typography>Current Connections</Typography>
                        <List>
                            { vertices[selectVertexIndex] && vertices[selectVertexIndex].adjacents.map(edge => (
                                <ListItem key={String(edge.source.value) + String(edge.destination.value)} style={{ padding: '0 8px'}} >
                                    <ListItemText primary={<EdgeListItem edge={edge} forceRender={forceRender} />} />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Code />
                        <Typography>Algorithms</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Here we go</Typography>
                        <Button onClick={async () => {
                            if(selectedVertex)
                                console.log(await depthFirstSearch(selectedVertex, ''))
                        }}>Depth First Search</Button>
                        <Button onClick={async () => {
                            if(selectedVertex)
                                console.log(await breadthFirstSearch(selectedVertex, '10'))
                        }}>Breadth First Search</Button>
                        <Button onClick={async () => {
                            if(selectedVertex)
                                console.log(await bestFirstSearch(selectedVertex, 'Bucharest'))
                        }}>Best First Search</Button>
                        <Button onClick={e => restoreGraph(vertices)}>Restore</Button>
                        <Button onClick={deleteGraph}>Delete Graph</Button>
                    </AccordionDetails>
                </Accordion>
                <FormControlLabel
                    control={
                        <Switch
                            checked={showCost}
                            onChange={handleShowCostSwitch}
                            name="showCost"
                            color="secondary"/>
                    }
                    label="Show cost"
                />
                <Slider
                    defaultValue={300}
                    valueLabelDisplay="auto"
                    step={50}
                    max={1000}
                    marks
                    onChange={handleChangeSlider}
                    value={stepMili}
                />
                <Button onClick={e => randomCosts()} >Random Costs</Button>
                <Typography>Node</Typography>
                <input type="color" value={vertexColor} name="vertex-color" onChange={handleChangeVertexColor} /> Color
            </MenuContainer>
            <ButtonContainer ref={buttonRef}>
                <IconButton color="secondary" onClick={toggleMenu}>
                    { open ? <Close fontSize="large" /> : <Menu fontSize="large" /> }
                </IconButton>
            </ButtonContainer>
        </Container>
    )
}

export default Sidebar
