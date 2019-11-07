import LeftNode from './leaf-node';

require('./_base.scss');

function generateLevel(createElement, items, level, defaultOpenLevel) {
  const children = [];
  let childrenNodeList = [];

  items.forEach((item) => {
    childrenNodeList = [];
    const nameItem = createElement(LeftNode, {
      props: {
        level,
        item,
      }
    }, [`${item.cataname}（${item.videos}）`]);

    childrenNodeList.push(nameItem);

    if (Object.prototype.hasOwnProperty.call(item, 'nodes')) {
      const tree = createElement('ul', {
        props: {
          level,
          defaultOpenLevel,
        },
      }, [
        ...generateLevel(createElement, item.nodes, level + 1, defaultOpenLevel),
      ]);
      childrenNodeList.push(tree);
    }

    children.push(createElement('li', {
      class: {
        opened: level <= defaultOpenLevel
      },
      attrs: {
        'data-itemid': item.cataid,
        'data-itemname': item.cataname
      }
    }, [...childrenNodeList]));
  });

  return children;
}

const CataTree = {
  name: 'cata-tree-navigation',

  data() {
    return {
      classes: ['live-cata-tree'],
      lastSelectedNode: null,
    };
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
    defaultOpenLevel: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    getParent(target, tagName = 'LI') {
      while (target.tagName !== tagName) {
        target = target.parentNode;
      }
      return target;
    },

    clickHandler(event) {
      const target = event.target;
      const type = target.getAttribute('data-type') || target.parentNode.getAttribute('data-type');
      if (!type) {
        return;
      }
      const liNode = this.getParent(target);
      const curClass = liNode.getAttribute('class').trim() || '';
      const openedClassname = 'opened';
      const selectedClassname = 'selected';

      switch (type) {
        case 'toggle': {
          if (curClass.indexOf(openedClassname) >= 0) {
            liNode.setAttribute('class', curClass.replace(openedClassname, ''));
          } else {
            liNode.setAttribute('class', `${curClass} ${openedClassname}`);
          }
          break;
        }
        case 'select': {
          const cataid = liNode.getAttribute('data-itemid');
          const cataname = liNode.getAttribute('data-itemname');

          if (curClass.indexOf(selectedClassname) < 0) {
            const lastNode = this.lastSelectedNode;
            if (lastNode) {
              const lastNodeClass = lastNode.getAttribute('class') || '';
              lastNode.setAttribute('class', lastNodeClass.replace(selectedClassname, ''));
            }
            this.lastSelectedNode = liNode;
            liNode.setAttribute('class', `${curClass} ${selectedClassname}`);
          }
          this.$emit('select', { cataid, cataname });
          break;
        }
        default:
          break;
      }
    }
  },

  render(createElement) {
    const level = 1;
    const tree = createElement('ul', generateLevel(createElement, this.items, level, this.defaultOpenLevel));

    return createElement('div', {
      class: this.classes,
      on: {
        click: this.clickHandler
      }
    }, [
      tree,
    ]);
  },
};

export default CataTree;
