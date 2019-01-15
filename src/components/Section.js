import React from 'react';
import { Radio } from 'antd';

const Section = props => (
    <Radio.Group buttonStyle='solid'>
        {props.sections.map((section,index) => (
            <Radio.Button value={index} key={index}>{section.hours}</Radio.Button>
        ))}
    </Radio.Group>
)

export default Section