import React from 'react';
import Icon from '../Icon';
import { Grow } from '@material-ui/core';

import './style.css';

function DevItem({ dev, onEdit, onDelete }){
    const [{editMode, dev: oldDev}, setEditMode] = onEdit;

    function editDev(){
      setEditMode({editMode: 
          (oldDev._id !== dev._id) ? true : !editMode, // Se selecionou um Dev diferente, obrigatóriamente editMode deve ser true.
          dev // Novo Dev
      });
    }

    function deleteDev(){
      onDelete(dev.github_username);
    }

    return (
      <Grow in={dev} {...{ timeout: 1100 }} >
        <li className="dev-item">
            <div className="icons">
              <Icon onClick={editDev} type="pen"/>
              <Icon onClick={deleteDev} type="trash"/>
            </div>
          <header>
            <img src={dev.avatar_url} alt={dev.name === null ? dev.github_username : dev.name}/>
            <div className="user-info">
              <strong> {dev.name === null ? dev.github_username : dev.name} </strong>
              <span>{dev.techs.join(', ')}</span>
            </div>
          </header>
          <p>{dev.bio}</p>
          <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
        </li>
      </Grow>
    );
}

export default DevItem;