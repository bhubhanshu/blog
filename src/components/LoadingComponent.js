import Loader from 'react-loader-spinner'
import React from 'react';

export const Loading = () => {
    return(
        <div className="col-12">
            <div className="row  justify-content-center">
                <Loader type="Bars" color="#00BFFF" height={80} width={80} />
            </div>
            <div className="row  justify-content-center">
                <p>Loading</p>
            </div>
        </div>
    );
};