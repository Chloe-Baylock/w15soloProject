import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { ChevronDownIcon } from "@heroicons/react/solid"
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = e => {
    if (showMenu) return;
    else {
      e.currentTarget.style.backgroundColor = "rgb(187, 187, 187)";
      setShowMenu(true);
    }
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
      let dropB = document.getElementById('nav-dropdown-button');
      dropB.style.backgroundColor = 'white';
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
  };

  return (
    <>
      <div
        id='nav-dropdown-button'
        className='nav-dropdown-button'
        onClick={e => openMenu(e)}
      >
        {user.username}
        <ChevronDownIcon className="nav-chevron-down-icon" />
      </div>
      {showMenu && (
        <ul className="nav-dropdown-ul">
          <li className="nav-dropdown-li">{user.email}</li>
          <li className="nav-dropdown-li">
            <button
              className="global-button-style"
              onClick={logout}
            >Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;