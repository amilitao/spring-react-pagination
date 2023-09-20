/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { findVeiculosByPage } from "./service/veiculo";
import { VeiculoPage } from "./service/veiculo/dto";
import { Col, Container, Form, Pagination, Row, Table } from "react-bootstrap";

function App() {
  const [veiculoPage, setVeiculoPage] = useState<VeiculoPage>(
    new VeiculoPage()
  );

  useEffect(() => {
    findVeiculos();
  }, []);

  const findVeiculos = async () => {
    try {
      const veiculosPage = await findVeiculosByPage(0, 10);
      setVeiculoPage(veiculosPage.data);
    } catch (error) {
      console.error(error);
    }
  };

  const findByPage = async (pageNumber: number) => {
    try {
      const veiculosPage = await findVeiculosByPage(pageNumber, 10);
      setVeiculoPage(veiculosPage.data);
    } catch (error) {
      console.error(error);
    }
  };
 

  const changeSize = async (e: any) => {
    const size = e.target.value;
    let pageNumber;
    let totalElements;

    if (Number(size) === 0) {
      pageNumber = 0;
      totalElements = veiculoPage.totalElements;    
      
    } else {
      pageNumber = veiculoPage.pageable.pageNumber;
      totalElements = size;
    }

    try {
      const veiculosPage = await findVeiculosByPage(pageNumber, totalElements);
      setVeiculoPage(veiculosPage.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row className="mt-3 mb-3 ">
        <h5>LISTA DE VEICULOS PAGINADA</h5>
      </Row>

      <Table>
        <thead>
          <th>ID</th>
          <th>MARCA</th>
          <th>MODELO</th>
          <th>ANO DE FABRICACAO</th>
        </thead>
        <tbody>
          {veiculoPage.content &&
            veiculoPage.content.map((v) => (
              <tr>
                <td>{v.id}</td>
                <td>{v.marca}</td>
                <td>{v.modelo}</td>
                <td>{v.anoFabricacao}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Row>
        <Col lg="auto">
          {" "}
          <Pagination>
            <Pagination.First
              onClick={() => findByPage(0)}
              disabled={veiculoPage.first}
            />
            <Pagination.Prev
              onClick={() => findByPage(veiculoPage.pageable.pageNumber - 1)}
              disabled={veiculoPage.first}
            />
            <Pagination.Next
              onClick={() => findByPage(veiculoPage.pageable.pageNumber + 1)}
              disabled={veiculoPage.last}
            />
            <Pagination.Last
              onClick={() => findByPage(veiculoPage.totalPages - 1)}
              disabled={veiculoPage.last}
            />
          </Pagination>
        </Col>
        <Col lg="auto">
          <label className="mt-1">
            {veiculoPage.pageable.pageNumber + 1} de {veiculoPage.totalPages}
          </label>
        </Col>
        <Col lg={2}>
          <Form.Select size="sm" defaultValue={5} onChange={changeSize}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={0}>Todos</option>
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
