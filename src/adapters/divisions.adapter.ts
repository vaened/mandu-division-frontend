import {type Division} from "../models/divisions";
import {type DivisionModel} from "../types";

export function adaptFromRestApi(divisions: DivisionModel[]) {
    return divisions.map(convert)
}

const convert = (model: DivisionModel): Division => ({
    id: model.id,
    name: model.name,
    ambassadorName: model.ambassador_name,
    collaborators: model.collaborators,
    nivel: model.nivel,
    totalSubdivisions: model.subdivisions.length,
    parentDivisionName: model.parent?.name || '-'
});