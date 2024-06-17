import { Router } from "express";
import { getChartData } from "../controllers/chartController";

const router: Router = Router();

/**
 * @swagger
 * /api/charts/{chartType}:
 *   get:
 *     summary: Get chart data
 *     description: Get data for a specific type of chart within a date range
 *     parameters:
 *       - in: path
 *         name: chartType
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of chart (e.g., pie, line)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date for the data range
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date for the data range
 *     responses:
 *       200:
 *         description: Successful response with chart data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 labels:
 *                   type: array
 *                   items:
 *                     type: string
 *                 datasets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       data:
 *                         type: array
 *                         items:
 *                           type: number
 *       400:
 *         description: Missing or invalid date parameters
 *       500:
 *         description: Internal server error
 */
router.get("/:chartType", getChartData);

export default router;
