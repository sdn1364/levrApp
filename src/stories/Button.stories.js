import React from 'react';
import {Button} from 'levr';


export default {
    title:'Levr Design System/Actions/Button',
    component: Button,
    argTypes: {
        size: {
            options: ['xs','sm','lg', 'xlg'],
            control: { type: 'radio' },
        },
        type: {
            options: ['submit','button'],
            control: { type: 'radio' },
        },
        align: {
            options: ['left','right','center'],
            control: { type: 'radio' },
        },
    },
    args:{
        children: 'button',
        rounded: false,
        outline: false,
        full: false,

    }
};

const Template = (args)=><Button {...args}></Button>

export const Primary = Template.bind({})
Primary.args={
    primary: true,
}
export const Secondary = Template.bind({})
Secondary.args={
    secondary: true,
}
export const Error = Template.bind({})
Error.args={
    error: true,
}
export const Warning = Template.bind({})
Warning.args={
    warning: true,
}
export const Info = Template.bind({})
Info.args={
    info: true,
}
export const Success = Template.bind({})
Success.args={
    success: true,
}