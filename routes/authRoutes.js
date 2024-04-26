const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login
 *     description: Authenticate user with provided credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Authentication successful
 *       '500':
 *         description: Internal server error
 */
router.post('/login', login);

module.exports = {
    routes: router
}
