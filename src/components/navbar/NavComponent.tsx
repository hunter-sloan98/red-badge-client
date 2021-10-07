import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { Link, Switch, Route, Router } from "react-router-dom";
import UserHome from '../userPage/UserHome'
import CharacterCreator from '../characterCreation/CharacterCreator';
import Blog from '../blogPage/Blog'
import NavBar from './Navbar'
import MyProfile from '../profile/MyProfile';
import AuthAdmin from '../auth/AdminAuth/AuthAdmin';


type PropsType = {
  logout: () => void
  token: string | null
}

const NavbarComponent = (props: PropsType) => {
  return(
    <div className='MaidDiv'>
      <div className='NavStyling'>
        <ul className='NavList'>
          <li><Link to='/userhome'>User Home</Link></li>
          <li><Link to='/character'>Character Creator</Link></li>
          <li><Link to='/blog'>Blog Posts</Link></li>
          <li><Link to='/myprofile'>My Profile</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
          <li><button className='logoutBtn' onClick={props.logout}>Logout</button></li>
        </ul>
      </div>
      <div className='Routes'>
        <Switch>
          <Route exact path='/userhome'><UserHome/></Route>
          <Route exact path='/character'><CharacterCreator token={props.token}/></Route>
          <Route exact path='/blog'><Blog token={props.token}/></Route>
          <Route exact path='/myprofile'><MyProfile token={props.token} logout={props.logout}/></Route>
          <Route exact path='/admin'><AuthAdmin token={props.token}/></Route>
        </Switch>
      </div>
    </div>
  )
}

export default NavbarComponent;









































// export default function NavbarComponent() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: any) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Router>
//       <Button
//         id="basic-button"
//         aria-controls="basic-menu"
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         Menu
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//       >
//         <Link to='/myprofile'><MenuItem onClick={handleClose}>My Profile</MenuItem></Link>


//         <MenuItem onClick={handleClose}>Character Creator</MenuItem>


//         <MenuItem onClick={handleClose}>Blog</MenuItem>


//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>
//       <Switch>
//         <Route>

//         </Route>
//       </Switch>
//       </Router>

//     </div>
//   );
// }











