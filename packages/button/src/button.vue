<template>
  <button 
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Inject, Prop } from 'vue-property-decorator'

@Component
export default class ElButton extends Vue {
  name = 'ElButton'

  // provide/injet需要一起使用，以允许祖先组件
  // 其所有子孙后代注入一个依赖，不论组件层次有多深，
  // 并在其上下游关系成立的时间里始终生效

  // 根据祖先elForm的disabled状态判断按钮是否也disabled
  @Inject({ default: '' }) elForm!: any
  @Inject({ default: '' }) elFormItem!: any

  @Prop({ type: String, default: 'default', validator: (val) => {
    return ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text'].indexOf(val) !== -1
  }  }) type!: string
  @Prop({ type: String, default: '', validator: (val) => {
    return ['', 'medium', 'small', 'mini'].indexOf(val) !== -1
  }}) size!: string
  @Prop({ type: String, default: '' }) readonly icon!: string
  // 原生type属性 button/submit/reset
  @Prop({ type: String, default: 'button', validator: (val) => {
    return ['button', 'submit', 'reset'].indexOf(val) !== -1
  } }) readonly nativeType!: string
  @Prop(Boolean) readonly loading!: boolean
  @Prop(Boolean) readonly disabled!: boolean
  @Prop(Boolean) readonly plain!: boolean
  @Prop(Boolean) readonly autofocus!: boolean
  @Prop(Boolean) readonly round!: boolean
  @Prop(Boolean) readonly circle!: boolean

  get _elFormItemSize() {
    return (this.elFormItem || {}).elFormItemSize
  }
  
  get buttonSize() {
    return this.size || this._elFormItemSize || ((this as any).$ELEMENT || {}).size
  }
  
  get buttonDisabled() {
    return this.disabled || (this.elForm || {}).disabled
  }
  
  handleClick(evt: Event) {
    this.$emit('click', evt)
  }
}
</script>