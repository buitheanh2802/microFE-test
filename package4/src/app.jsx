import React, { useEffect } from 'react';
import chunk from 'lodash/chunk';

const Package4 = () => {

    useEffect(() => {
        console.log('hello package4');
        console.log(chunk);
    })

    return (
        <div className='app-wrapper'>
            packge4 hello world
        </div>
    );
};

export default Package4;