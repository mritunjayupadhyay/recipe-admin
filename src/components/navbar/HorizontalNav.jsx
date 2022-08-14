import React from 'react';
import './horizontal-nav.scss';
import { authActions } from '../../store/index';

import Button from '../button/Button';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function HorizontalNav({ show }) {
    const dispatch = useDispatch();

    if (show === false) {
        return null;
    }
    const logout = () => {
        return dispatch(authActions.logout());
    }
  return (
    <div className='HorizontalNav'>
        <div className='inner-container'>
            <div className='logo-container'>
                <Link to="/">
                <span>Logo</span></Link>
            </div>
            <div>
                <Button 
                    size='small' 
                    buttonText={'Log out'} 
                    buttonType={'primary'} 
                    onClickFunc={logout}
                />
            </div>
        </div>
        
    </div>
  )
}

export default HorizontalNav