import { Link } from "react-router-dom";


export function AppHeader() {

    return (
        <nav className="nav-header">
                    <ul>
                        <li ><Link to={"/favorite"}>My Favorites</Link></li> 
                        <li ><Link to={"/popular"}>Popular</Link></li> 
                        <li ><Link to={"/now_playing"}>Airing now</Link></li> 

                    </ul>
        </nav>
    )
}
