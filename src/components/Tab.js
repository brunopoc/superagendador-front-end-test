import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
    //PROPS OBRIGATÓRIAS
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };
    //FUNÇÃO DE CLICK PEGA A LABEL E A FUNÇÃO DAS PROPS E RETORNA A FUNÇÃO COM A LABEL NO PARAMETRO
    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

    render() {
        const { activeTab, label, totalOf } = this.props

        let className = 'tab-list-item';
        //VERIFICA SE ESTÁ ATIVA E ADICIONA OS ESTILOS
        if (activeTab === label) {
            className += ' tab-list-active';
        }
        console.log(label)
        //RETORNA OS ITEMS COM AS CLASSES CORRETAS PARA OS ESTILOS
        return (
            <li className={className} onClick={this.onClick} >
                {label} <span className="totalOf">{ totalOf ? totalOf : totalOf }</span>
            </li>
        );
    }
}

export default Tab;