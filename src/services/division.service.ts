import {type Division} from "../models/divisions";
import {adaptFromRestApi} from "../adapters/divisions.adapter.ts";
import Router from "../router/router.ts";

export function listDivisions(): Promise<Division[]> {
    return Router.get('api.divisions')
        .then((response) => response.json())
        .then((response) => response.data)
        .then(adaptFromRestApi);
}
