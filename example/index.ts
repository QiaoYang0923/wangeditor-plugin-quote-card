/**
 * @description examples entry
 * @author wangfupeng
 */

import {
  IDomEditor,
  createEditor,
  createToolbar,
  Boot,
  IEditorConfig,
  i18nChangeLanguage,
} from '@wangeditor/editor'
import module from '../src/index'

// 注册
Boot.registerModule(module)

// i18nChangeLanguage('en')

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  onChange(editor: IDomEditor) {
    const html = editor.getHtml()
    // @ts-ignore
    document.getElementById('text-html').value = html
    const contentStr = JSON.stringify(editor.children, null, 2)
    // @ts-ignore
    document.getElementById('text-json').value = contentStr
  },
  hoverbarKeys: {
    link: {
      menuKeys: ['editLink', 'unLink', 'viewLink', 'convertToLinkCard'],
    },
  },
}

const linkCardHtml = `<div data-w-e-type="link-card" data-w-e-is-void data-title="引用原文"
data-link="察院向阜南县住房和城乡建设局发出检察建议书，督促该局纠正违法行为并采取环境补救措施"
data-iconImgSrc="啊啊啊啊啊啊啊"
data-json="1111111111111111">
  <div class="info-container">
    <div class="title-container"><p>百度新闻</p></div>
    <div class="text-container"><span>察院向阜南县住房和城乡建设局发出检察建议书，督促该局纠正违法行为并采取环境补救措施</span></div>
  </div>
</div>`

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: editorConfig,
  html: `<p>hello&nbsp;world</p>${linkCardHtml}`,
})
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {},
})

editor.on('link-card-click', dataJson => {
  console.log('Link card clicked:', dataJson)
  // 做任何你想做的事，比如弹窗、跳转等
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar
