import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { TiHome } from 'react-icons/ti';
import '../../styles/App.css';

function App() {
    return (
        <nav className="Nav">
            <IconContext.Provider value={{ className: "Nav__icons" }}>
                <div className="Nav__container">
                    <ul className="Nav__item-wrapper">
                        <li className="Nav__item">
                            <Link className="Nav__link" to="/"><TiHome size={30} /></Link>
                        </li>
                    </ul>
                </div>
            </IconContext.Provider>
        </nav>
    );
}

export default App;

