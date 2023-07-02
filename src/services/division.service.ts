import {type Division} from "../models/divisions";
import {adaptFromRestApi} from "../adapters/divisions.adapter.ts";

export function listDivisions(): Promise<Division[]> {
    return fetch('http://localhost:8000/api/divisions')
        .then((response) => response.json())
        .then((response) => response.data)
        .then(adaptFromRestApi);
}
