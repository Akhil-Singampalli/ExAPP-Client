import axios from 'axios';
import React, { Component } from 'react';
import ReactTable from "react-table";

export default class DocAddPatDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {

            patdata: [],

            successMessage: "",
            errorMessage: "",
            login: false,
            showFieldEdit: false,
            columns : [{
                Header: 'Name',
                accessor: 'patientName'
            }, {
                Header: 'Contact Number',
                accessor: 'contactNumber'
            }, {
                Header: 'Email Id',
                accessor: 'emailId'
            },]
        };

    }



    componentDidMount() {

        axios.get("http://localhost:8080/docAPI/patdata/1")
            .then(response => this.setState({

                patData: response.data,
                successMessage: "Submit Successfull !!",
                errorMessage: "",
                login: true
            })).catch(error => {
                if (error.response) {
                    this.setState({ errorMessage: error.response.data.message, successMessage: "" });
                } else {
                    this.setState({ errorMessage: "Server is down", successMessage: "" });
                }
            });
    }

    render() {

       

        return (
            <div class="br-table" data-search="data-search" data-selection="data-selection" data-collapse="data-collapse" data-random="data-random">
  <div class="table-header">
    <div class="top-bar">
      <div class="table-title">Título da Tabela</div>
      <div class="actions-trigger text-nowrap">
        <button class="br-button circle" type="button" title="Ver mais opções" data-toggle="dropdown" data-target="target01-4527" aria-label="Ver mais opções"><i class="fas fa-ellipsis-v" aria-hidden="true"></i>
        </button>
        <div class="br-list" id="target01-4527" hidden="hidden">
          <button class="br-item" type="button" data-density="small">Densidade alta
          </button><span class="br-divider"></span>
          <button class="br-item" type="button" data-density="medium">Densidade média
          </button><span class="br-divider"></span>
          <button class="br-item" type="button" data-density="large">Densidade baixa
          </button>
        </div>
      </div>
      <div class="search-trigger">
        <button class="br-button circle" type="button" data-toggle="search" aria-label="Abrir busca"><i class="fas fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div class="search-bar">
      <div class="br-input">
        <label for="table-searchbox-4527">Buscar</label>
        <input id="table-searchbox-4527" type="text" placeholder="Buscar na tabela"/>
        <button class="br-button circle" type="button" aria-label="Buscar"><i class="fas fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <button class="br-button circle" type="button" data-dismiss="search" aria-label="Fechar busca"><i class="fas fa-times" aria-hidden="true"></i>
      </button>
    </div>
    <div class="selected-bar">
      <div class="info"><span class="count">0</span><span class="text">item selecionado</span></div>
      <div class="actions-trigger text-nowrap">
        <button class="br-button circle inverted" type="button" data-toggle="dropdown" data-target="target02-4527" aria-label="Ver mais opções"><i class="fas fa-ellipsis-v" aria-hidden="true"></i>
        </button>
        <div class="br-list" id="target02-4527" hidden="hidden">
          <button class="br-item" type="button" data-toggle="">Ação 1
          </button><span class="br-divider"></span>
          <button class="br-item" type="button">Ação 2
          </button>
        </div>
      </div>
    </div>
  </div>
  <table>
    <caption>Título da Tabela</caption>
    <thead>
      <tr>
        <th class="column-collapse" scope="col"></th>
        <th class="column-checkbox" scope="col">
          <div class="br-checkbox hidden-label">
            <input id="check-all-4527" name="check-all-4527" type="checkbox" aria-label="Selecionar tudo" data-parent="check-01"/>
            <label for="check-all-4527">Selecionar todas as linhas</label>
          </div>
        </th>
        <th scope="col">Título coluna 1</th>
        <th scope="col">Título coluna 2</th>
        <th scope="col">Título coluna 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <button class="br-button circle small" type="button" aria-label="Expandir/Retrair Rótulo 01" data-toggle="collapse" data-target="collapse-1-4-4527"><i class="fas fa-chevron-down" aria-hidden="true"></i>
          </button>
        </td>
        <td>
          <div class="br-checkbox hidden-label">
            <input id="check-line-1-4527" name="check-line-1-4527" type="checkbox" aria-label="Selecionar linha 1" data-child="check-01"/>
            <label for="check-line-1-4527">Selecionar linha 1</label>
          </div>
        </td>
        <td data-th="Título coluna 1">Linha 1 coluna 1</td>
        <td data-th="Título coluna 2">Linha 1 coluna 2</td>
        <td data-th="Título coluna 3">Linha 1 coluna 3</td>
      </tr>
      <tr class="collapse">
        <td id="collapse-1-4-4527" aria-hidden="true" hidden="hidden" colspan="6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies aliquet lacinia. Vestibulum in interdum eros. Donec vel tempus diam. Aenean pulvinar mattis nisi in laoreet. Integer felis mi, vehicula sed pretium sit amet, pellentesque vel nisl. Curabitur metus ante, pellentesque in lectus a, sagittis imperdiet mi.</td>
      </tr>
      <tr>
        <td>
          <button class="br-button circle small" type="button" aria-label="Expandir/Retrair Rótulo 01" data-toggle="collapse" data-target="collapse-2-4-4527"><i class="fas fa-chevron-down" aria-hidden="true"></i>
          </button>
        </td>
        <td>
          <div class="br-checkbox hidden-label">
            <input id="check-line-2-4527" name="check-line-2-4527" type="checkbox" aria-label="Selecionar linha 2" data-child="check-01"/>
            <label for="check-line-2-4527">Selecionar linha 2</label>
          </div>
        </td>
        <td data-th="Título coluna 1">Linha 2 coluna 1</td>
        <td data-th="Título coluna 2">Linha 2 coluna 2</td>
        <td data-th="Título coluna 3">Linha 2 coluna 3</td>
      </tr>
      <tr class="collapse">
        <td id="collapse-2-4-4527" aria-hidden="true" hidden="hidden" colspan="6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies aliquet lacinia. Vestibulum in interdum eros. Donec vel tempus diam. Aenean pulvinar mattis nisi in laoreet. Integer felis mi, vehicula sed pretium sit amet, pellentesque vel nisl. Curabitur metus ante, pellentesque in lectus a, sagittis imperdiet mi.</td>
      </tr>
      <tr>
        <td>
          <button class="br-button circle small" type="button" aria-label="Expandir/Retrair Rótulo 01" data-toggle="collapse" data-target="collapse-3-4-4527"><i class="fas fa-chevron-down" aria-hidden="true"></i>
          </button>
        </td>
        <td>
          <div class="br-checkbox hidden-label">
            <input id="check-line-3-4527" name="check-line-3-4527" type="checkbox" aria-label="Selecionar linha 3" data-child="check-01"/>
            <label for="check-line-3-4527">Selecionar linha 3</label>
          </div>
        </td>
        <td data-th="Título coluna 1">Linha 3 coluna 1</td>
        <td data-th="Título coluna 2">Linha 3 coluna 2</td>
        <td data-th="Título coluna 3">Linha 3 coluna 3</td>
      </tr>
      <tr class="collapse">
        <td id="collapse-3-4-4527" aria-hidden="true" hidden="hidden" colspan="6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies aliquet lacinia. Vestibulum in interdum eros. Donec vel tempus diam. Aenean pulvinar mattis nisi in laoreet. Integer felis mi, vehicula sed pretium sit amet, pellentesque vel nisl. Curabitur metus ante, pellentesque in lectus a, sagittis imperdiet mi.</td>
      </tr>
    </tbody>
  </table>
  <div class="table-footer">
    <nav class="br-pagination" aria-label="Paginação de resultados" data-total="50" data-current="1" data-per-page="20">
      <div class="pagination-per-page">
        <div class="br-select">
          <div class="br-input">
            <label for="per-page-selection-random-47569">Exibir</label>
            <input id="per-page-selection-random-47569" type="text" placeholder=" "/>
            <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1" data-trigger="data-trigger"><i class="fas fa-angle-down" aria-hidden="true"></i>
            </button>
          </div>
          <div class="br-list" tabindex="0">
            <div class="br-item" tabindex="-1">
              <div class="br-radio">
                <input id="per-page-10-random-47569" type="radio" name="per-page-random-47569" value="per-page-10-random-47569" checked="checked"/>
                <label for="per-page-10-random-47569">10</label>
              </div>
            </div>
            <div class="br-item" tabindex="-1">
              <div class="br-radio">
                <input id="per-page-20-random-47569" type="radio" name="per-page-random-47569" value="per-page-20-random-47569"/>
                <label for="per-page-20-random-47569">20</label>
              </div>
            </div>
            <div class="br-item" tabindex="-1">
              <div class="br-radio">
                <input id="per-page-30-random-47569" type="radio" name="per-page-random-47569" value="per-page-30-random-47569"/>
                <label for="per-page-30-random-47569">30</label>
              </div>
            </div>
          </div>
        </div>
      </div><span class="br-divider d-none d-sm-block mx-3"></span>
      <div class="pagination-information d-none d-sm-flex"><span class="current">1</span>&ndash;<span class="per-page">20</span>&nbsp;de&nbsp;<span class="total">50</span>&nbsp;itens</div>
      <div class="pagination-go-to-page d-none d-sm-flex ml-auto">
        <div class="br-select">
          <div class="br-input">
            <label for="go-to-selection-random-63756">Página</label>
            <input id="go-to-selection-random-63756" type="text" placeholder=" "/>
            <button class="br-button" type="button" aria-label="Exibir lista" tabindex="-1" data-trigger="data-trigger"><i class="fas fa-angle-down" aria-hidden="true"></i>
            </button>
          </div>
          <div class="br-list" tabindex="0">
            <div class="br-item" tabindex="-1">
              <div class="br-radio">
                <input id="go-to-1-random-63756" type="radio" name="go-to-random-63756" value="go-to-1-random-63756" checked="checked"/>
                <label for="go-to-1-random-63756">1</label>
              </div>
            </div>
            <div class="br-item" tabindex="-1">
              <div class="br-radio">
                <input id="go-to-2-random-63756" type="radio" name="go-to-random-63756" value="go-to-2-random-63756"/>
                <label for="go-to-2-random-63756">2</label>
              </div>
            </div>
            <div class="br-item" tabindex="-1">
              <div class="br-radio">
                <input id="go-to-3-random-63756" type="radio" name="go-to-random-63756" value="go-to-3-random-63756"/>
                <label for="go-to-3-random-63756">3</label>
              </div>
            </div>
          </div>
        </div>
      </div><span class="br-divider d-none d-sm-block mx-3"></span>
      <div class="pagination-arrows ml-auto ml-sm-0">
        <button class="br-button circle" type="button" aria-label="Voltar página"><i class="fas fa-angle-left" aria-hidden="true"></i>
        </button>
        <button class="br-button circle" type="button" aria-label="Avançar página"><i class="fas fa-angle-right" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  </div>
</div>
        )
            ;
    }
}

