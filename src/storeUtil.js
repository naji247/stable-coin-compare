import { createStore } from 'store/src/store-engine';
import sessionStorage from 'store/storages/sessionStorage';
import expirePlugin from 'store/plugins/expire';
export default createStore([sessionStorage], [expirePlugin]);
