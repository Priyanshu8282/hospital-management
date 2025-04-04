import express from 'express';
import {

  getBillingById,
  updateBilling

} from '../../controller/Patient/billingController.js';

const billingRouter = express.Router();


billingRouter
  .route('/billing/:id')
  .get(getBillingById)
  .put(updateBilling)

export default billingRouter;