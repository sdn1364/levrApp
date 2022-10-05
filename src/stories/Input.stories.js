import {FormControl} from 'levr';

export default {
    title: "Levr Design System/Form/FormControl",
    component:FormControl,
    args:{
        disable: true,
        flat: true,
        type: 'password'
    }
}

const Template = (args)=> <FormControl {...args}/>

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args={
    primary: true
}
export const Secondary = Template.bind({});
Secondary.args={
    secondary: true
}
export const Success = Template.bind({});
Success.args={
    success: true
}
export const Info = Template.bind({});
Info.args={
    info: true
}
export const Error = Template.bind({});
Error.args={
    error: true
}
export const Warning = Template.bind({});
Warning.args={
    warning: true
}