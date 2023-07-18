import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearchedShops, startSearchShops } from '../../Redux/Actions/shopsActions'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const HomeCustomer = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('')
    const searchInputRef = useRef(null)

    useEffect(() => {
        searchInputRef.current.focus()

        return () => {
            dispatch(clearSearchedShops([]))
        }
    }, [dispatch]);

    // Debounce Function for Preventing the Unnecessary function calls

    const debounce = (func, delay) => {
        let timerId
        return function (...args) {
            clearTimeout(timerId)
            timerId = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }

    const handleSearch = useCallback(
        debounce((value) => {
          dispatch(startSearchShops(value))
        }, 250), 
        [dispatch]  
      )
    
      const handleChange = (e) => {
        const inputValue = e.target.value
        setSearchTerm(inputValue)
        handleSearch(inputValue)
      }

    const shops = useSelector((state) => {
        return state.shops.searchedShops?.filter((ele) => ele.isVerified === true)
    })

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
                        onChange={handleChange}
                        ref={searchInputRef}
                    />
                </div>
                <ul className="list-group mt-4">
                    {shops.map((shop) => (
                        <li key={shop._id} className="text-center text-uppercase fs-4 list-group-item">
                            <span className='fw-bold'> <Link to={`/${shop.name.toLowerCase()}/products`}>{shop.name}</Link></span>
                        </li>
                    ))}
                </ul>


                <div className="text-center mt-5">
                    <h2>Discover Amazing Shops Near You!</h2>
                    <p>Support local businesses and find unique products.</p>
                </div>
            </div>
        </div>
    )
}

export default HomeCustomer;
