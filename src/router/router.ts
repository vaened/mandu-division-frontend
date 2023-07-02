import Laroute, {Parameters} from './laroute';

const BASE_URL = import.meta.env.VITE_API_URL;

export const Router = {
    get(routeName: string, params: Parameters = {}) {
        const url = new URL(Laroute.cleanURI(routeName, params), BASE_URL);
        return fetch(url);
    },
};

export default Router;
