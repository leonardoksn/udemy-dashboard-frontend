import React, { useState } from 'react';
import logo from '../../assets/logo.svg'
import { Toggle } from '../Toggle';

import {
    Container,
    Header,
    LogImg,
    Title,
    MenuItemLink,
    MenuContainer,
    MenuItemButton,
    ToggleMenu,
    ThemeToggleFooter
} from './style';

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu,

} from 'react-icons/md';

import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import { useNavigate } from 'react-router-dom';


const Aside: React.FC = () => {

    const { signOut } = useAuth()
    const { toggleTheme, theme } = useTheme()

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false)
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened)
    }

    const handleChangeTheme = () => {
        setDarkTheme(state => !state)
        toggleTheme()
    }
    const navigate = useNavigate()
    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
                </ToggleMenu>

                <LogImg src={logo} alt="Logo Minha Carteira" />
                <Title>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink onClick={() => { navigate("/dashboard") }}>
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink onClick={() => { navigate("/list/entry-balance") }} >
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink onClick={() => { navigate("/list/exit-balance") }}>
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemButton onClick={signOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>
            <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
                <Toggle
                    labelLeft='Light'
                    labelRight='Dark'
                    checked={darkTheme}
                    onChange={handleChangeTheme} />

            </ThemeToggleFooter>
        </Container>

    );
}

export default Aside;