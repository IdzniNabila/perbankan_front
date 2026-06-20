import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAPI } from '../../../actions/auth';
import jwt from 'jwt-decode';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faBook, faSync, faUsers, faSignOutAlt, faBookmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const history = useHistory();

    let jwtDecode;
    if (isAuthenticated && token) {
        try {
            jwtDecode = jwt(token);
        } catch (e) {
            // ignore invalid token
        }
    }

    const handleLogout = () => {
        dispatch(logoutAPI())
            .then(() => {
                history.push('/');
            });
    };

    return (
        <nav className="navbar navbar-expand-lg px-4 sticky-top">
            <div className="container-fluid">
                <span className="navbar-brand d-flex align-items-center">
                    <span className="mr-2" role="img" aria-label="books">📚</span>
                    <span>iPusnas</span>
                </span>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                                <FontAwesomeIcon icon={faChartPie} className="mr-2" />
                                Beranda
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/book" className="nav-link" activeClassName="active">
                                <FontAwesomeIcon icon={faBook} className="mr-2" />
                                e-Pustaka
                            </NavLink>
                        </li>
                        {isAuthenticated && (
                            <li className="nav-item">
                                <NavLink to="/rak-buku" className="nav-link" activeClassName="active">
                                    <FontAwesomeIcon icon={faBookmark} className="mr-2" />
                                    Rak Buku
                                </NavLink>
                            </li>
                        )}
                        {isAuthenticated && jwtDecode && jwtDecode.role === 'admin' && (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/peminjaman" className="nav-link" activeClassName="active">
                                        <FontAwesomeIcon icon={faSync} className="mr-2" />
                                        Sirkulasi
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/user" className="nav-link" activeClassName="active">
                                        <FontAwesomeIcon icon={faUsers} className="mr-2" />
                                        Pengguna
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    
                    <div className="d-flex align-items-center">
                        <div className="text-white mr-3 text-right">
                            <div className="font-weight-bold" style={{ fontSize: '14px' }}>
                                {isAuthenticated && jwtDecode ? jwtDecode.name : 'Guest'}
                            </div>
                            <div style={{ fontSize: '12px', opacity: 0.8 }}>
                                {isAuthenticated && jwtDecode && jwtDecode.role === 'admin' ? 'Librarian' : 'Visitor'}
                            </div>
                        </div>
                        <button onClick={handleLogout} className="btn btn-sm btn-light text-danger" title="Logout">
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
