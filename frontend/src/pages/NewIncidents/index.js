import React, {useState} from 'react';
import{ FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import api  from '../../services/api';
import './styles.css';

export default function NewIncidents() {

    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    async function addIncidents(e) {

        e.preventDefault();
        const data = {
            title,
            description,
            value
        };
        try{
            await api.post('incidents', data,{
                headers:{
                    Authorization: ongId,
                }
            });
        history.push('/profile');

        }catch(err){
            alert('Não foi possivel salvar')
        }

        console.log(data)

    }
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Escreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                   
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft  size={16} color="#e02041"/>
                        Voltar para a Home
                    </Link>

                </section>
                <form onSubmit={addIncidents}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}  
                    />
                    <input
                         placeholder="Valor em reais"
                         value={value}
                         onChange={e => setValue(e.target.value)}  
                    />
                     <button className="btn" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}