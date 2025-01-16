import './NavBar.css';

export default function NavBar() {
    return (
        <nav className="nav-container">
            <ul>
                <li><a href="#">Roster</a></li>
                <li><a href="#">League</a></li>
                <li><a href="#">Stats</a></li>
            </ul>
        </nav>
    );
}