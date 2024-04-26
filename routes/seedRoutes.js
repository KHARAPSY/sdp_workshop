const express = require('express');
const auth = require('../middleware/auth');
const {addSeed, getSeeds, getSeed, updateSeed, deleteSeed} = require('../controllers/seedController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       in: header
 *       name: x-auth-token
 */

/**
 * @swagger
 * /api/seed:
 *   post:
 *     summary: Add new seed
 *     description: Create new seed data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: string
 *               Seed_RepDate:
 *                  type: string
 *               Seed_Year:
 *                  type: string
 *               Seeds_YearWeek:
 *                  type: string
 *               Seed_Varity:
 *                  type: string
 *               Seed_RDCSD:
 *                  type: string
 *               Seed_Stock2Sale:
 *                  type: string
 *               Seed_Season:
 *                  type: string
 *               Seed_Crop_Year:
 *                  type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Seed created successfully
 *       '401':
 *         description: Unauthorized - Access token is missing or invalid
 *       '422':
 *         description: Unprocessable - Not allowed empty
 */
router.post('/seed', auth, addSeed);

/**
 * @swagger
 * /api/seeds:
 *   get:
 *     summary: Get all seeds
 *     description: Retrieve a list of all seeds
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of seeds
 *       '401':
 *         description: Unauthorized - Access token is missing or invalid
 *       '500':
 *         description: Internal server error
 */
router.get('/seeds', auth, getSeeds);

/**
 * @swagger
 * /api/seed/{_id}:
 *   get:
 *     summary: Get a seed by ID
 *     description: Retrieve a seed by its ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the seed to retrieve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A single seed object
 *       '401':
 *         description: Unauthorized - Access token is missing or invalid
 *       '404':
 *         description: Seed with the specified ID not found
 *       '500':
 *         description: Internal server error
 */
router.get('/seed/:_id', auth, getSeed);

/**
 * @swagger
 * /api/seed/{_id}:
 *   put:
 *     summary: Update a seed by ID
 *     description: Update a seed with the specified ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the seed to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: string
 *               Seed_RepDate:
 *                  type: string
 *               Seed_Year:
 *                  type: string
 *               Seeds_YearWeek:
 *                  type: string
 *               Seed_Varity:
 *                  type: string
 *               Seed_RDCSD:
 *                  type: string
 *               Seed_Stock2Sale:
 *                  type: string
 *               Seed_Season:
 *                  type: string
 *               Seed_Crop_Year:
 *                  type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Seed updated successfully
 *       '400':
 *         description: Bad request - Invalid request body
 *       '401':
 *         description: Unauthorized - Access token is missing or invalid
 *       '404':
 *         description: Seed with the specified ID not found
 *       '500':
 *         description: Internal server error
 */
router.put('/seed/:_id', auth, updateSeed);

/**
 * @swagger
 * /api/seed/{_id}:
 *   delete:
 *     summary: Delete a seed by ID
 *     description: Delete a seed with the specified ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the seed to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Seed deleted successfully
 *       '401':
 *         description: Unauthorized - Access token is missing or invalid
 *       '404':
 *         description: Seed with the specified ID not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/seed/:_id', auth, deleteSeed);

module.exports = {
    routes: router
}