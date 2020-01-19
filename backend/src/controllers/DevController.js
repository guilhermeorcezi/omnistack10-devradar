const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

    async index (req,res){
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store (req,res) {
        const { github_username, techs, latitude, longitude } = req.body;
    
        const verificadev = await Dev.findOne( {github_username} );
        if (verificadev) return res.json(verificadev);

        const apiresponse = await axios.get(`https://api.github.com/users/${github_username}`)

        const { name = login, avatar_url, bio } = apiresponse.data;
        const techsArray = parseStringAsArray(techs);
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
    
        const dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });

        const sendSocketMessageTo = findConnections(
            {latitude, longitude},
            techsArray,
        )
            
        sendMessage(sendSocketMessageTo,'new-dev',dev);

        return res.json( dev );
      },

      async update(req, res){
        const { github_username } = req.params;
        const { techs, ...rest } = req.body;
        rest.github_username = github_username;
    
        const dev = await Dev.findOne( {github_username} );

        if(techs)
            var techsArray = parseStringAsArray(techs);

        const newdev = await Dev.updateOne({github_username},{
            techs : techs ? techsArray : dev.techs,
            ...rest
            });

        return res.json( {
            modifiedCount: newdev.nModified,
            ok: newdev.ok
        });
      },

      async read(req,res){
          const { github_username } = req.params;
          const dev = await Dev.findOne( {github_username} );

          return res.json(dev === null ? {} : dev);
       }, 

      async delete(req, res){
          const { github_username } = req.params;

          await Dev.deleteOne( {github_username} );
          return res.json();
      },
};