import React from 'react';
import '../Styles/Navbar.css';
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <div className='navbar'>
            <div className='tableContainer'>
                <Link to='/'>
                    <button >
                        View Table
                    </button>
                </Link>
            </div>


            <div className='columnContainer'>
            <Link to='/columns'>
                <button>
                    Add Column(s)
                </button>
                </Link>
            </div>


            <div className='logContainer'>
            <Link to='/logs'>
                <button>
                    View Logs
                </button>
                </Link>
            </div>


            <div className='recordContainer'>
            <Link to='/form'>
                <button>
                    Add Record(s)
                </button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar