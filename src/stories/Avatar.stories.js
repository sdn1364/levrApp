import {Avatar} from 'levr';

export default {
    title:'Levr Design System/Data Display/Avatar',
    component: Avatar,
    argTypes:{
        size: {
            options: ['xs','sm','lg', 'xlg'],
            control: { type: 'radio' },
        },
    },
    args:{

    }
}
const Template = (args)=><Avatar {...args}/>

export const Rounded = Template.bind({});
Rounded.args = {
    rounded: true
}
export const Regular = Template.bind({});
Regular.args = {
    rounded: false
}