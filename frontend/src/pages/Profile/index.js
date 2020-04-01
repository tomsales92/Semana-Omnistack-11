import React, { useState, useEffect}from 'react';
import { Link, useHistory} from 'react-router-dom';

import{ FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';


import api from '../../services/api';
import './styles.css';

export default function Profile() {

    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(()=>{
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteincident(id){
       
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="btn" to="/incidents/new">Cadastrar Novo Caso</Link>
                <button type="button" onClick={handleLogout}> 
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            
           <ul>
               {incidents.map(item => (
                   <li key={item.id}>
                   <strong>Caso:</strong>
                    <p>{item.title}</p>

                   <strong>Descrição</strong>
                    <p>{item.description}</p>

                   <strong>Valor</strong>
                  {/*  Sensacional formatação de Moeda */}
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(item.value)}</p>

                   <button type="button" onClick={()=>{handleDeleteincident(item.id)}}>
                        <FiTrash2 size={20} color="#a8a8b3" />
                   </button>
               </li>
               ))}
           </ul>

        </div>
    );
}