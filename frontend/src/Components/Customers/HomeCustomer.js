import React, { useState, useRef, useEffect } from 'react';

const HomeCustomer = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        // Perform search functionality based on the search term
        // Example: Call an API to fetch matching shops
        console.log('Searching for:', searchTerm);
    };

    // Focus on the search input when the component mounts
    useEffect(() => {
        searchInputRef.current.focus();
    }, []);

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <h1 className="text-center mb-4">Welcome to Digitize Business</h1>
                <p className="text-center">Find and explore various shops near you.</p>

                <form onSubmit={handleSearch} className="mt-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for shops..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            ref={searchInputRef}
                        />
                    </div>
                </form>

                {/* Display other content, such as featured shops, categories, etc. */}
            </div>
        </div>
    )
}

export default HomeCustomer