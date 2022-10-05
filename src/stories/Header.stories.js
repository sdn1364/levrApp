import React from 'react';

import {Header} from 'levr'

export default {
    title: 'Levr Design System/Layout/Header',
    component: Header,
    argType: {},
    args:{}
}

const Template = (args) => <Header {...args}></Header>

export const Flat = Template.bind({});

Flat.args = {
    background: 'solid'
}