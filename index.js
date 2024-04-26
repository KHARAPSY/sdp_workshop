'use strict';

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const environments = require('./environments');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const seedRoutes = require('./routes/seedRoutes');
const error = require('./middleware/error');
const winston = require('winston');
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const csv = require('csv-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();

require('./startup/config')();
require('./startup/db')();
require('./startup/logging')();
require('./startup/validation')();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes.routes);
app.use('/api', authRoutes.routes);
app.use('/api', seedRoutes.routes);
app.use(error);

const uri = process.env.MONGODB_URI;

app.post('/upload', async (req, res) => {
    try {
        const data = [];
        // Read the CSV file
        fs.createReadStream('./csv/data.csv')
            .pipe(csv())
            .on('data', (row) => {
                // Remove spaces from column headers
                const newRow = {};
                Object.keys(row).forEach((key) => {
                    newRow[key.replace(/\s+/g, '')] = row[key];
                });
                data.push(newRow);
            })
            .on('end', async () => {
                // Connect to MongoDB Atlas
                const client = new MongoClient(uri, {
                    serverApi: {
                        version: ServerApiVersion.v1,
                        strict: true,
                        deprecationErrors: true,
                    }
                });
                await client.connect();

                // Insert data into the collection
                const db = client.db('sdp_workshop');
                const collection = db.collection('seeds');
                await collection.insertMany(data);

                await client.close();

                res.send('Data uploaded to MongoDB successfully.');
            });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SDP Workshop API',
            version: '1.0.0',
            description: 'API documentation for the SDP Workshop',
        },
        servers: [
            {
                url: 'http://localhost:' + environments.port,
            },
        ],
    },
    apis: ['./routes/*.js', './index.js'], // Paths to the files containing Swagger annotations
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(environments.port, () => winston.info('App listening on url: http://localhost:' + environments.port));