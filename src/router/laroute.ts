import config from './routes.json';

interface RouteOptions {
    withQueryString: boolean
}

export type Parameters = { [key: string]: any } | any;

export type Route = {
    name: string
    uri: string
    host?: string
}

const route = {
    create(name: string, parameters: Parameters, options: RouteOptions = {withQueryString: true}) {
        const route = this.getByName(name);
        const hostname = this.getHostname(route);
        const urn = this.replaceNamedParameters(route.uri, parameters);
        const qs = options.withQueryString ? this.getRouteQueryString(parameters) : '';
        return this.buildUri(hostname, urn, qs);
    },

    getByName(name: string): Route {
        const route = config.routes.find((route) => route.name === name);

        if (route === undefined) {
            throw new Error(`Not found route: ${name}`);
        }

        return route;
    },

    getHostname(route: string) {
        if (config.absolute) {
            return route.host === undefined ? config.rootUrl : `///${route.host}`;
        }
        return '';
    },

    replaceNamedParameters(uri: string, parameters: Parameters) {
        uri = uri.replace(/{(.*?)\??}/g, (match, key) => {
            if (!parameters.hasOwnProperty(key)) {
                return match;
            }
            const value = parameters[key];
            delete parameters[key];
            return value;
        });

        // Strip out any optional parameters that were not given
        return uri.replace(/\/{.[^}]*?\?}/g, '');
    },

    getRouteQueryString(parameters: Parameters) {
        return Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join('&');
    },

    buildUri(hostname: string, urn: string, queryString: string) {
        const removeForwardSlashes = (fragment) => fragment.replace(/(^\/?)|(\/?$)/g, '');
        const notEmpty = (fragment) => fragment != null && fragment != '';
        const fragments = [config.prefix, urn].filter(notEmpty).map(removeForwardSlashes).join('/');

        return `${removeForwardSlashes(hostname)}/${fragments}${queryString ?? '?' + queryString}`
    },

    hasRoute(name: string) {
        return config.routes.some((route) => route.name === name);
    },
};

export const Laroute = {
    // Check if a route exists  for a given named route.
    // Laroute.has('routeName')
    has(name: string) {
        return route.hasRoute(name);
    },

    // Generate an url without GET parameters for a given named route.
    // Laroute.cleanURI('routeName', [params = {}])
    cleanURI(name: string, parameters: Parameters = {}) {
        return route.create(name, parameters, {withQueryString: false});
    },

    // Generate an url for a given named route.
    // Laroute.route('routeName', [params = {}])
    completeURI(name: string, parameters: Parameters = {}) {
        return route.create(name, parameters, {withQueryString: true});
    },
};

export default Laroute;
