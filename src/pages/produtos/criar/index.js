import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                Nome: "",
                Descricao: "",
                Preco: "",
                QuantidadeEstoque: "",
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produto" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Produtos</legend>
                        <div className="produto-insert">
                            <label htmlFor="Nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="Nome"
                                name="Nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.Nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="Descricao">Descrição </label>
                            <br />
                            <input
                                type="text"
                                id="Descricao"
                                name="Descricao"
                                placeholder="Descrição"
                                required
                                value={this.state.produto.Descricao}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="Preco">Preço </label>
                            <br />
                            <input
                                type="text"
                                id="Preco"
                                name="Preco"
                                placeholder="Preço"
                                required
                                value={this.state.produto.Preco}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <div className="produto-insert">
                            <label htmlFor="QuantidadeEstoque">Quantidade em Estoque </label>
                            <br />
                            <input
                                type="text"
                                id="QuantidadeEstoque"
                                name="QuantidadeEstoque"
                                placeholder="Quantidade em Estoque"
                                required
                                value={this.state.produto.QuantidadeEstoque}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}`, {
            method: "post",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default CriarProduto;
