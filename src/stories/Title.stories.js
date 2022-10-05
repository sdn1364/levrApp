import {Title} from 'levr';

export default {
  title:'Levr Design System/Data Display/Title',
  component: Title,
  argTypes: {
    weight: {
      options: ['thin', 'extraLight', 'light', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      control: { type: 'select' },
    },
  },
  args:{
    children: 'title Text'
  }
}

const Template = (args)=> <Title {...args}/>

export const H1 = Template.bind({});
H1.args = {
  h1: true
}
export const H2 = Template.bind({});
H2.args = {
  h2: true
}
export const H3 = Template.bind({});
H3.args = {
  h3: true
}
export const H4 = Template.bind({});
H4.args = {
  h4: true
}
export const H5 = Template.bind({});
H5.args = {
  h5: true
}
export const H6 = Template.bind({});
H6.args = {
  h6: true
}