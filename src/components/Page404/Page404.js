import React from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from '@/router';

const Page404 = () =>{
    return <div>
        <h1>Page not found</h1>
        <div className="alert alert-warning">
            Go to
            <Link to={routesMap.cart}>
                home
            </Link>
        </div>
    </div>
};

export default Page404;
