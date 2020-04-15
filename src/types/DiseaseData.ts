import {CountyDiseaseData} from "./CountyDiseaseData";

export interface DiseaseData {
    total: number,
    data: Array<CountyDiseaseData>
}