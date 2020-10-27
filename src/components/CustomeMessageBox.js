import Vue from "vue";

let messageButton = {
  template: `<div :style="style">
                <el-button size="mini" @click="onSubmit">确定</el-button>
                <el-button size="mini" type="primary" @click="onCancel">取消</el-button>
             </div>`,
  data() {
    return {
      style: { opacity: "1", 'position': "absolute", 'bottom': "0.5rem", right: "0.8rem" }
    }
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.$parent.$refs.detail.form);
    },
    onCancel() {
      this.$emit("onCancel");
    },
  },
}

export default function MessageBox({ title, content, propsData, width, height, onSubmit, onCancel }) {
  function render(createElem) {
    return createElem("div", {
      style: {
        position: "fixed", 'z-index': "9999", top: '7rem', width: '85%', height: '70%',
        background: "rgba(128,128,128,.4)", display: "flex", 'align-items': 'center',
        'justify-content': 'center'
      }
    }, [
      createElem(
        "div",
        {
          style: {
            width: `${width}rem`, height: `${height}rem`, 'position': 'relative',
            'background-color': 'white', 'border-radius': `${width * 0.02}rem`,
            'box-shadow': '0 0 3px rgba(128,128,128,.5)', resize: 'both',
            overflow: 'auto'
          },
          props: {}, attrs: { draggable: "true" }
        }, [
        createElem("div", { style: { 'padding': '0.8rem' } },
          [createElem("span", { style: { color: "black", 'font-size': "1rem" } }, title),
          createElem("i", {
            class: "el-icon-close", style: {
              position: 'absolute',
              right: '0.8rem'
            }, on: {
              click: onCancel
            }
          })]),
        createElem("div", { attr: { scroll: "auto" } },
          [typeof content === "object" ? createElem(content, { ...propsData, ref: "detail" }) : createElem("span", content)]),
        createElem(messageButton, { on: { onSubmit, onCancel } })
      ])
    ])
  }
  let Mess = Vue.extend({ name: "custome-message-box", render: (h) => render(h) });
  new Mess().$mount(document.querySelector("#mark-main-content"));



}

