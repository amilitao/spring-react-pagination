export class VeiculoDto {
    id = 0;
    marca = "";
    modelo = "";
    anoFabricacao = 0;
}

export class VeiculoPage {
    content: VeiculoDto[] = []
    pageable: PageableDto = new PageableDto()
    last = false;
    first = false;
    totalPages = 0;
    totalElements = 0;
}

class PageableDto {
    pageSize = 0;
    pageNumber = 0;
}