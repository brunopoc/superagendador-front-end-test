import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tab from './Tab'


export default class Tabs extends Component {
    // USA A BIBLIOTECA PROPTYPES PARA TORNAR O CHILDREN UM ARRAY OBRIGATÓRIO.
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    }

    //COM O CONSTRUCTOR AS PROPS SÃO USADAS PARA ESTABELECER O PRIMEIRO ITEM COMO ATIVO POR PADRÃO
    constructor(props) {
        super(props);
    
        this.state = {
          activeTab: this.props.children[0].props.label,
          totalOfRepos: this.props.children[0].props.totalOfRepos,
          totalOfStarred: this.props.children[0].props.totalOfStarred
        };
    }
    //FUNÇÃO QUE EDITA A ABA SELECIONADA DE ACORDO COM O CLICK
    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    render(){
        //PEGA O FILHO E A ABA ATIVA
        const children = this.props.children;
        const activeTab = this.state.activeTab;
        return(
            <div className="tabs">
                <ol className="tab-list">
                    {children.map((child) => { // --- EXECUTA UM MAP PARA CADA ITEM E PASSA AS PROPS CORRETAS
                        const { label, totalOf } = child.props;

                        return (
                        <Tab
                            activeTab={activeTab}
                            key={label}
                            label={label}
                            onClick={this.onClickTabItem}
                            totalOf = {totalOf}
                        />
                        );
                    })}
                </ol>
                <div className="tab-content">
                    {children.map((child) => { // CASO A "LABEL" NÃO SEJA IGUAL A ATIVA RETORNA UNDEFINED
                        if (child.props.label !== activeTab) return undefined;
                        return child.props.children;
                    })}
                </div>
            </div>
        )
        
    }
}