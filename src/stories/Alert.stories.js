import React from 'react';
import {Alert} from 'levr'

export default {
    title:'Levr Design System/Data Display/Alert',
    component: Alert,
    argTypes:{

    },
    args:{
        children: 'This is an alert',
        rounded: true,
        outline: true,
        icon: true
    }
}

const Template = (args)=> <Alert {...args}/>;

export const Primary = Template.bind({});
Primary.args={
    primary:true
}
export const Secondary = Template.bind({});
Secondary.args={
    secondary:true
}
export const Error = Template.bind({});
Error.args={
    error:true
}
export const Info = Template.bind({});
Info.args={
    info:true
}
export const Warning = Template.bind({});
Warning.args={
    warning:true
}
export const Success = Template.bind({});
Success.args={
    success:true
}