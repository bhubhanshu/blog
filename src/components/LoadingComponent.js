import Loader from 'react-loader-spinner'
import React from 'react';

export const Loading = () => {
    return(
        <div className="col-12">
            <Loader type="Bars" color="#00BFFF" height={80} width={80} />
            <p>Loading</p>
        </div>
    );
};