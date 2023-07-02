export interface DivisionModel {
    id: number;
    name: string;
    ambassador_name: string;
    parent_division_id?: number;
    collaborators: number;
    nivel: number;
    parent?: DivisionModel;
    subdivisions: DivisionModel[];
}
