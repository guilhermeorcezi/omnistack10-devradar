import React, { useState, useEffect } from 'react';

import './style.css';

function DevForm({ onAdd, onEdit, editModeState }){
    const [{editMode, dev}, setEditMode] = editModeState;  
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
      if (!editMode) { // Localização do navegador (Pois o usuário está cadastrando)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          }, {
            timeout: 30000
          }
        )
      } else { // Localização do dev selecionado (Pois o usuário está editando)
        const { github_username, techs, location: { coordinates: [longitude, latitude]}} = dev;
        setGithubUsername(github_username);
        setTechs(techs.join(", "));
        setLatitude(latitude);
        setLongitude(longitude);
      }
    }, [editMode, dev]);

    async function handleSubmit(e){
        e.preventDefault();
        if (editMode) {
          await onEdit(dev, {
            techs,
          })
          setEditMode({editMode: false, dev: {}});
        } else 
        await onAdd({
            github_username,
            techs,
            latitude,
            longitude
        });
        setGithubUsername('');
        setTechs('');
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="img-box img-edit">
          <img src={dev.avatar_url} alt={dev.name === null ? dev.github_username : dev.name} 
          hidden={!editMode} style={{borderRadius: '50%', minWidth:70, minHeight:70, marginBottom:20}}/>
        </div>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do GitHub</label>
          <input 
            name="github_username" 
            id="github_username" 
            required
            value={github_username}
            disabled={editMode}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input 
            name="techs" 
            id="techs" 
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>
    
        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input 
              name="latitude" 
              id="latitude" 
              value={latitude} 
              required
              disabled={editMode}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input 
              name="longitude"
              id="longitude" 
              value={longitude} 
              required
              disabled={editMode}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>
    
        <button type="submit">{editMode ? 'Salvar alterações' : 'Cadastrar'}</button>
      </form>
    );
}

export default DevForm;