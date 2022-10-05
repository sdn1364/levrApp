import {Text} from 'levr';

export default {
  title:'Levr Design System/Data Display/Text',
  component: Text,
  argTypes: {
    weight: {
      options: ['thin', 'extraLight', 'light', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      control: { type: 'select' },
    },
  },
  args:{
    children: 'Text'
  }
}

const Template = (args)=> <Text {...args}/>

export const Paragraph = Template.bind({});
