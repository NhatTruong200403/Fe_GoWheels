// src/models/InvoiceVM.js

import BookingVM from './BookingVM';
import BaseModel from './BaseModelVM';
export default class InvoiceVM extends BaseModel{
  constructor(data = {}) {
    super(data.id || null, data.createdById, data.createdOn, data.modifiedById, data.modifiedOn, data.isDeleted);
    this.total = data.total || 0;
    this.returnOn = data.returnOn || null; // Date
    this.booking = new BookingVM(data.booking || {});
  }
}
