import { View, useState, Framework } from '../../framework';
import template from '../templates/template.html';
import '../css/index.css';

const Main = () => {
    let [options, setOptions] = useState({
        variable: {
            var: 1
        },
        item: 'item',
        text: 'alert'
    });
    const func = () => {
        setOptions({
            variable: {
                var: options.variable.var + 1
            },
            item: 'item1',
            text: 'alert1'
        });
    }
    return View.create(template, {...options, func});
}

export default Main;