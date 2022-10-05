import {Sidebar} from 'levr';

export default {
    title: "Levr Design System/Layout/Side bar",
    component: Sidebar,
    argTypes: {
    },
    args:{
    }
}
const Template = (args)=> <Sidebar {...args}/>

export const Detached = Template.bind({});
Detached.args ={
    detached: true
}
export const Flat = Template.bind({});
Flat.args = {
    detached: false
}