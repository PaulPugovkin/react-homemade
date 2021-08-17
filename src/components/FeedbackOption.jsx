import React from 'react';
import { Button } from 'semantic-ui-react';

import './FeedbackOptions.module.css';

const FeedbackOption = ({ options, onLeaveFeedback, colors }) => {
    return (
        <div>
            {options.map(type => (
                <Button
                    className={type}
                    key={type.toString()}
                    onClick={() => onLeaveFeedback(type)}
                >
                    {type}
                </Button>
            ))}
        </div>
    );
};

export default FeedbackOption;
