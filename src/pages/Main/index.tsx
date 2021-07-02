import React from 'react';
import { SnackbarProvider } from 'notistack'

import Canvas from '../../components/Canvas'
import Sidebar from '../../components/Sidebar'

import { Container } from './styles'
import { VerticesProvider } from '../../contexts/vertices'
import { CanvasProvider } from '../../contexts/canvas'

const Main: React.FC = () => {
  return (
    <Container>
        <SnackbarProvider maxSnack={3}>
            <VerticesProvider>
                <CanvasProvider>
                    <Sidebar />
                    <Canvas />
                </CanvasProvider>
            </VerticesProvider>
        </SnackbarProvider>
    </Container>
  );
}

export default Main
