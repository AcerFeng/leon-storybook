import ElButton from '@packages/button/src/button.vue'
import '@packages/theme-chalk/src/button.scss'

export default {
  title: 'Element-ui/Button',
  component: ElButton,
  argTypes: {
    size: { control: { type: 'select', options: ['medium', 'small', 'mini']}},
    type: { control: { type: 'select', options: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text']}},
    nativeType: { control: { type: 'select', options: ['button', 'submit', 'reset']}},
    click: { action: 'clicked' }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ElButton },
  template: `<el-button @click="click" v-bind="$props" >button</el-button>`
})

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary'
}

export const Medium = Template.bind({})
Medium.args = {
  size: 'medium'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small'
}

export const Mini = Template.bind({})
Mini.args = {
  size: 'mini'
}
