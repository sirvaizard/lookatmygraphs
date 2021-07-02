import styled from 'styled-components'

export const Container = styled.aside`
    display: flex;
    height: 100%;

    position: absolute;
    left: 0;

    margin-left: 0px;

    &.is-closed {
        left: -270px;
    }

    transition: all .3s;
`

export const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    width: 270px;
    padding-bottom: 20px;

    &::-webkit-scrollbar {
        background-color: #ffffff;
        width: 8px;
    }

    &::-webkit-scrollbar:hover {
        background-color: #e0e0e0;
    }
    
    &.is-closed, &.is-closed > *, &.is-closed::-webkit-scrollbar {
        background-color: transparent;
    }

    background-color: white;
    transition: all .2s;
`

export const ButtonContainer = styled.div`
    height: 48px;
    width: 48px;
    position: relative;

    left: -60px;

    &.is-closed {
        left: 0px;
    }

    transition: left .3s;
`