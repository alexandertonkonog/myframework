import { Framework } from '../framework';
import Main from './components/Main';

const root = document.querySelector('.root');
const app = Framework.create(Main, root);