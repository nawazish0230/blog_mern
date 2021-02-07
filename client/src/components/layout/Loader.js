import React, { Fragment } from 'react'
import loader from './loader.gif'

export default () => (
    <Fragment>
        <img src={loader}
            style={{ width: '50px', margin: '3rem auto', display: 'block' }}
            alt="loading" />
    </Fragment>
)
