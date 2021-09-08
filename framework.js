const store = {

}

class FrameworkController {

    create(component, root) {
        this.component = component;
        this.root = root;
        this.component.isComponent = true;
        this.html = this.component();
        this.root.innerHTML =  '';
        this.root.append(this.html);
    }

    refresh() {
        this.html = this.component();
        this.root.innerHTML =  '';
        this.root.append(this.html);
    }
}

class ViewController {

    constructor(framework) {
        this.framework = framework;
        this.root = document.createElement('div');
    }

    create(view, props) {
        this.root.innerHTML = view;
        this.swapNodes(this.root, props);
        return this.root.children[0];
    }

    swapNodes(node, props) {
        const arrAttrs = Array.from(node.attributes);
        if (arrAttrs.length) {
            const specAttrs = arrAttrs.filter(item => item.name.startsWith('@'));
            node.eventsList = [];
            specAttrs.forEach(item => {
                const regVal = item.nodeValue.match(/{{(.*?)}}/);
                if (regVal) {
                    const name = regVal[1].trim();
                    const func = this.getProp(name, props);
                    const eventType = item.name.slice(1);
                    node.eventsList.push({var: name, value: func, name: eventType});
                    node.addEventListener(eventType, func);
                    node.removeAttribute(item.name);
                }
            });
        }

        if (node.children.length) {
            const arr = Array.from(node.children);
            arr.forEach(item => this.swapNodes(item, props));
        } else {
            const regVal = node.textContent.match(/{{(.*?)}}/);
            if (regVal) {
                const name = regVal[1].trim();
                const text = this.getProp(name, props);
                node.textContent = text;
                node.saveValue = { name, value: text }
            }
        }
    }

    getProp(str, props) {
        if (!str) throw new Error('Не введена переменная');
        const array = str.split('.');
        const getObj = (arr, prop) => {
            if (!prop) throw new Error(`Переменной ${arr} не существует`);
            if (arr.length === 1) {
                return prop[arr[0]];
            } else {
                const nextProp = prop[arr[0]];
                arr.shift();
                return getObj(arr, nextProp);
            }
        }
        const result = getObj(array, props);
        return result;
    }
}

export const Framework = new FrameworkController();
export const View = new ViewController(Framework);


export const useState = (val) => {
    const setValue = (newVal) => {
        store[setValue.caller.name] = newVal;
        Framework.refresh();
    }

    if (!store[useState.caller.name]) {
        store[useState.caller.name] = val
    }  

    return [store[useState.caller.name], setValue];
}

