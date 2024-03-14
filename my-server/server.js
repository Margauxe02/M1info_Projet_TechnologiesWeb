const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 3000;

//Requête API
app.get('/', (req, res) => {
    res.send('Bienvenue dans le back end');
});


//Requête API récupération des régions
app.get('/apiRegions', async (req, res) => {
    try {
        const response = await axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/osm-france-sport-facility/records?group_by=meta_name_reg&limit=100');
        regions = response.data.results.map(results => results.meta_name_reg);
        res.send(regions);
        console.log(regions);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

//Requête API récupération des départements
app.get('/apiDepartments/:region', async (req, res) => {
    try {
        const region = req.params.region;
        const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/osm-france-sport-facility/records?select=meta_name_dep&where=meta_name_reg%20like%20%22${region}%22&group_by=meta_name_dep&limit=100`);
        const departments = response.data.results.map(result => result.meta_name_dep);
        res.send(departments);
        console.log(departments);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

//Requête API récupération des sports
app.get('/apiSports/:department', async (req, res) => {
    try {
        const department = req.params.department;
        const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/osm-france-sport-facility/records?select=sport&where=meta_name_dep%20like%20%22${department}%22&group_by=sport&limit=100`);
        const sports = response.data.results.map(result => result.sport);
        res.send(sports);
        console.log(sports);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

//Requête API récupération des communes
app.get('/apiCommunes/:department/:sport', async (req, res) => {
    try {
        const department = req.params.department;
        const sport = req.params.sport;
        const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/osm-france-sport-facility/records?select=meta_name_com&where=meta_name_dep%20like%20%22${department}%22%20and%20sport%20like%20%22${sport}%22&group_by=meta_name_com&limit=100`);
        const communes = response.data.results.map(result => result.meta_name_com);
        res.send(communes);
        console.log(communes);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


/*
//Devoir Requête API GET
app.get('/apiGET', async (req, res) => {
    try {
        const response = await axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/osm-france-sport-facility/records?select=sport%2C%20meta_name_com%2C%20meta_code_com%2C%20meta_geo_point%20&limit=50');
        res.send(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

//Devoir Requête API POST
app.post('/apiPOST', async (req, res) => {
    try {
        const response = await axios.post('https://public.opendatasoft.com/explore/dataset/osm-france-sport-facility/api/?location=15,48.93381,2.36049&basemap=jawg.light', {
        // Vos données POST vont ici
        });
        res.send(response.data);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

//Devoir Requête API écriture dans fichier
app.get('/apiFichier', async (req, res) => {
    try {
        const response = await axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/osm-france-sport-facility/records?select=sport%2C%20meta_name_com%2C%20meta_code_com%2C%20meta_geo_point%20&limit=100');
        fs.writeFileSync('data.json', JSON.stringify(response.data));
        res.send('Les données ont été écrites dans data.json');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});
*/