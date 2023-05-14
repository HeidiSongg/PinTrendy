import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import img from './logo.png'
import SearchBar from '../SearchBar';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	let sessionLinks;
	if (sessionUser && sessionUser.id) {
		sessionLinks = (
			<ul className='allNavLinks'>
				<li className='navLinks-logged-in'>
					<NavLink id='link' exact to="/" activeClassName="active">
					<div className='navigation-pin-logo-container'>
						<img className='navigation-pin-logo' src={img} alt=''></img>
						</div>
						</NavLink>
					<NavLink id='link' className="navigation-home" exact to="/">Home</NavLink>
					<NavLink title="Create a Pin" id='link' className="navigation-create-button" exact to="/pins/new">Create</NavLink>
					<SearchBar id='link' placeholder='Search' />
				</li>
				{isLoaded && (
					<li className='navLinks'>
						<ProfileButton title="Your account" id='profileLink' user={sessionUser} />
					</li>
				)}
			</ul>
		)
	} else {
		sessionLinks = (
			<ul className='allNavLinks'>
				<li className='navLinks-logged-out'>
					<NavLink id='link' exact to="/"><img className='navigation-pin-logo' src={img} alt=''></img></NavLink>
					<NavLink id='link' className="navigation-home" exact to="/">Home</NavLink>
					<SearchBar id='link' placeholder='Search' />
				</li>
				{isLoaded && (
					<li className='navLinks'>
						<ProfileButton id='profileLink' user={sessionUser} />
					</li>
				)}
			</ul>
		)
	}


	return (
		<div>
			{isLoaded && sessionLinks}
		</div>
	)

}

export default Navigation;
