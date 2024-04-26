const express = require('express');
const {addUser} = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register
 *     description: Register a new user with the provided credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request - User with this email already exists
 */

router.post('/register', addUser);

module.exports = {
    routes: router
}