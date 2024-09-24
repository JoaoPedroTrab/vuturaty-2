import React, { useState, useEffect, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { login, logout, getCurrentUser } from '../services/api';
import Login from '../pages/Login';

const NavBar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [visibleMobileMenu, setVisibleMobileMenu] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);

        const checkLoginStatus = async () => {
            try {
                const userData = await getCurrentUser();
                setIsLoggedIn(true);
                setUser(userData);
            } catch (error) {
                console.error('Erro ao verificar o status de login:', error);
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        checkLoginStatus();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Buscando por:', searchQuery);
        setVisibleMobileMenu(false);
    };

    const handleLogin = async (credentials) => {
        try {
            const userData = await login(credentials);
            setIsLoggedIn(true);
            setUser(userData.user);
            setIsLoginOpen(false);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            // Aqui você pode adicionar uma lógica para mostrar uma mensagem de erro ao usuário
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setIsLoggedIn(false);
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const items = [
        {
            label: 'Início',
            icon: 'pi pi-fw pi-home',
            command: () => { navigate('/'); setVisibleMobileMenu(false); }
        },
        {
            label: 'Sobre',
            icon: 'pi pi-fw pi-info-circle',
            command: () => { navigate('/sobre'); setVisibleMobileMenu(false); }
        },
        {
            label: 'Atividades',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Próximos Eventos',
                    icon: 'pi pi-fw pi-calendar-plus',
                    command: () => { navigate('/eventos'); setVisibleMobileMenu(false); }
                },
                {
                    label: 'Galeria de Fotos',
                    icon: 'pi pi-fw pi-images',
                    command: () => { navigate('/galeria'); setVisibleMobileMenu(false); }
                }
            ]
        },
        {
            label: 'Contato',
            icon: 'pi pi-fw pi-envelope',
            command: () => { navigate('/contato'); setVisibleMobileMenu(false); }
        }
    ];

    const userMenuItems = [
        {
            label: 'Perfil',
            icon: 'pi pi-user',
            command: () => { navigate('/perfil'); }
        },
        {
            label: 'Configurações',
            icon: 'pi pi-cog',
            command: () => { navigate('/configuracoes'); }
        },
        {
            separator: true
        },
        {
            label: 'Sair',
            icon: 'pi pi-power-off',
            command: handleLogout
        }
    ];

    const start = (
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <img alt="logo" src="/logo.png" className="h-12 mr-3" />
            <span className="text-2xl font-bold font-oswald text-primary-blue-dark mr-6">VUTURATY</span>
        </div>
    );

    const searchForm = (
        <form onSubmit={handleSearch} className="relative flex-grow md:flex-grow-0 mb-4 md:mb-0">
            <span className="p-input-icon-left w-full">
                <i className="pi pi-search" style={{ left: '0.75rem' }} />
                <InputText 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="Buscar..." 
                    className="p-inputtext-sm w-full md:w-auto pl-8"
                    style={{ paddingLeft: '2.5rem' }}
                />
            </span>
        </form>
    );

    const accountButton = isLoggedIn ? (
        <div className="relative">
            <Avatar 
                image={user?.fotoPerfil} 
                shape="circle" 
                size="large"
                onClick={(e) => menuRef.current.toggle(e)}
                className="cursor-pointer"
            >
                {!user?.fotoPerfil && user?.nomeCompleto?.charAt(0).toUpperCase()}
            </Avatar>
            <Menu model={userMenuItems} popup ref={menuRef} />
        </div>
    ) : (
        <Button 
            label="Acessar sua conta" 
            className="p-button-raised p-button-rounded bg-primary-yellow-main text-primary-blue-dark hover:bg-primary-yellow-light transition-colors duration-300 py-2 px-4 w-full md:w-auto"
            onClick={() => setIsLoginOpen(true)}
        />
    );

    const end = isMobile ? (
        <Button icon="pi pi-bars" onClick={() => setVisibleMobileMenu(true)} className="p-button-text" />
    ) : (
        <div className="flex items-center gap-4 flex-wrap">
            {searchForm}
            {accountButton}
        </div>
    );

    const mobileMenuContent = (
        <div className="flex flex-col gap-4 p-4">
            {items.map((item, index) => (
                <div key={index} onClick={item.command} className="cursor-pointer">
                    <i className={`${item.icon} mr-2`}></i>
                    {item.label}
                </div>
            ))}
            {searchForm}
            {accountButton}
        </div>
    );

    return (
        <>
            <div className="card shadow-md">
                <Menubar 
                    model={isMobile ? [] : items} 
                    start={start} 
                    end={end} 
                    className="bg-neutral-white border-none flex-wrap"
                    style={{
                        '--highlight-bg': 'var(--primary-blue-light)',
                        '--highlight-text-color': 'var(--neutral-white)',
                    }}
                />
            </div>
            <Sidebar visible={visibleMobileMenu} onHide={() => setVisibleMobileMenu(false)} fullScreen>
                {mobileMenuContent}
            </Sidebar>
            <Login 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
                onLoginSuccess={handleLogin}
            />
        </>
    );
};

export default NavBar;