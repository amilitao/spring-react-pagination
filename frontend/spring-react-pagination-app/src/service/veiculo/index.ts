
import BaseApi from "../BaseApi"
import { VeiculoPage } from "./dto"

export const findVeiculosByPage = (page: number, size: number) => BaseApi.get<VeiculoPage>("/veiculos", {
    params: {
        page: page, size: size
    }
})