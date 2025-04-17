/**
 * @description render elem
 * @author wangfupeng
 */

import { h, VNode } from 'snabbdom'
import { DomEditor, IDomEditor, SlateElement } from '@wangeditor/editor'
import { LinkCardElement } from './custom-types'

function renderLinkCard(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  const selected = DomEditor.isNodeSelected(editor, elem) // 当前节点是否选中
  const { title, link, iconImgSrc, json } = elem as LinkCardElement

  // 文字部分
  const infoVnode = h(
    'div',
    {
      props: {
        className: 'w-e-textarea-link-card-text-container',
      },
    },
    [
      h(
        'p',
        {
          props: {},
          style: {
            color: '#999',
            display: 'block',
            cursor: 'pointer',
          },
          on: {
            click() {
              editor.emit('link-card-click', json) // 自定义事件名 + 数据
            },
          },
        },
        '引用原文'
      ),
      h(
        'span',
        {
          props: {
            contentEditable: false,
          },
        },
        link
      ),
    ]
  )

  // 容器
  const vnode = h(
    'div',
    {
      props: {
        contentEditable: true,
        className: 'w-e-textarea-link-card-container',
      },
      dataset: {
        selected: selected ? 'true' : '', // 标记为 选中
      },
      on: {
        mousedown: event => event.preventDefault(),
      },
    },
    [infoVnode]
  )

  return vnode
}

const conf = {
  type: 'link-card', // 节点 type ，重要！！！
  renderElem: renderLinkCard,
}

export default conf
