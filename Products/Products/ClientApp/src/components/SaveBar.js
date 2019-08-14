import React from 'react';
import PropTypes from 'prop-types';

import './SaveBar.css';

const SaveBar = ({
    onDiscardAction,
    open,
    onSaveAction,
}) => (
        open ?
            <div className="SaveBar">
                <br />
                <span>Seems like you modified something, want to save it ? <br /></span>
                <br />
                <button  onClick={onDiscardAction}>DISCARD</button>
                <button onClick={onSaveAction}>SAVE</button>
                <br />
            </div>
            :
            null
    );

SaveBar.propTypes = {
    onDiscardAction: PropTypes.func,
    open: PropTypes.bool.isRequired,
    onSaveAction: PropTypes.func,
};

SaveBar.defaultProps = {
    onDiscardAction: () => console.info('Discard'),
    onSaveAction: () => console.info('Save'),
};

export default SaveBar;
