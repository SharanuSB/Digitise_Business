import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSearchShops } from '../../Redux/Actions/shopsActions';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const HomeCustomer = () => {

    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef(null);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        dispatch(startSearchShops(e.target.value))
    };

    useEffect(() => {
        searchInputRef.current.focus();
    }, []);

    const shops = useSelector((state) => {
        return state.shops.searchedShops
    })

    console.log(shops)

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <h1 className="text-center mb-4">Welcome to Digitize Business</h1>
                <p className="text-center">Find and explore various shops near you.</p>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for shops..."
                        value={searchTerm}
                        onChange={handleSearch}
                        ref={searchInputRef}
                    />
                </div>
                <ul className="list-group mt-4">
                    {shops.map((shop) => (
                        <li key={shop._id} className="text-center text-uppercase fs-4 list-group-item">
                           <span className='fw-bold'> <Link to ={`/shopProducts/${shop._id}`}>{shop.name}</Link></span>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default HomeCustomer