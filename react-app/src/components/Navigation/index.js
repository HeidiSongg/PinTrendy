import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import img from './pinterest.jpeg'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	let sessionLinks;
	if (sessionUser && sessionUser.id) {
		sessionLinks = (
			<ul className='allNavLinks'>
				<li className='navLinks-logged-in'>
					<NavLink id='link' exact to="/"><img className='navigation-pin-logo' src={img} alt=''></img></NavLink>
					<NavLink title="Create a Product Listing" id='link' className="navigation-create-a-product" exact to="/products/create"><i class="fa-solid fa-store"></i></NavLink>
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
