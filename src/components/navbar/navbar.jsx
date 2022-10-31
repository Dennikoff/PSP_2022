import React from 'react';
import {Link} from "react-router-dom";
import './navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='link__container'>
                <Link className='nav__link' to={'/'}>Главная</Link>
                <Link className='nav__link' to={'/management'}>Управление</Link>
                <Link className='nav__link' to={'/search'}>Поиск</Link>
                <Link className='nav__link' to={'/profile'}>Профиль</Link>
            </div>
        </div>
    );
};

export default Navbar;