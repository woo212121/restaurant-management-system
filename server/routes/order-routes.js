/**
 * @file Manges all order routes.
 * @version 1.1.0
 */

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controllers');


/**
 * place an order
 */
router.post('/', async (req, res) => {
  const { customerId, staffId, orderStatus, orderAllergies, items } = req.body;
  try {
    const orderSummary = await orderController.placeOrder(customerId, staffId, orderStatus, orderAllergies, items);
    // Send the order summary as JSON response
    res.status(200).json(orderSummary);
  } catch (error) {
    console.error(`Error placing order: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});


/**
 * delete order route
 */
router.delete('/cancel-order/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  try {
    await orderController.cancelOrder(orderId);
    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: `Error canceling order: ${error.message}`});
  }
});


/**
 * mark an order as delivered
 */
router.post('/mark-delivered', async (req, res) => {
  const { orderId, staffId } = req.body;
  try {
    await orderController.orderDelivered(orderId, staffId);
    res.status(200).json({ message: 'Order marked devlivered successfully' });
  } catch (error) {
    console.error(`Error confirming delivery: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});


/**
 * Retrieves the count of orders marked as delivered.
 */
router.get('/get-delivered', async (req, res) => {
  try {
    const deliveredOrderCount = await orderController.getDeliveredOrderCount();
    res.status(200).json({ deliveredOrderCount });
  } catch (error) {
    console.error(`Error retrieving delivered order count: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Retrieves the count of pending orders.
 */
router.get('/get-pending-orders', async (req, res) => {
  try {
    const pendingOrderCount = await orderController.getPendingOrderCount();
    res.status(200).json({ pendingOrderCount });
  } catch (error) {
    console.error(`Error retrieving pending order count: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;