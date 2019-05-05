import Vue from 'vue'
import IconSupports from '../../../src/components/IconSupports'

describe('IconSupports.vue', () => {
  it('测试开始', () => {
    const Constructor = Vue.extend(IconSupports)
    const vm = new Constructor().$mount()
     expect(vm.$el.querySelector('.supports-icon').textContent)
      .toEqual('测试组件')
  })
})
