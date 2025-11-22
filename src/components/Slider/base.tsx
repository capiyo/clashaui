import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Games from "./games";
import Posts from './posts';

const styles = {
    slide: {
        padding: 1,
        minHeight: 100,
        color: '#fff',
    },
    slide1: {
        background: '#FEA900',
    },
    slide2: {
        background: '#B3DC4A',
    },

};

const Base = () => (
    <SwipeableViews>
        <div style={Object.assign({}, styles.slide, styles.slide1)}>
            <Games/>
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide2)}>
            <Posts/>
        </div>

    </SwipeableViews>
);

export default Base;