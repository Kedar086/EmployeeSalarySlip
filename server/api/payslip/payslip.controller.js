'use strict';

const _ = require('lodash');
const moment = require('moment');
const {tax_slabs: brackets} = require('./../../config/environment');
const Joi = require('joi');

// function to generate payslip as per tax deduction.
const create = (req, res) => {
  try{
    const { body } = req;
    const data = { ...body };

    const { error } = validateSchema(data);

    if(error){
      const { details: errorDetails } = error;
      return res.status(400).send({status:400,message: errorDetails[0].message.replace(/"/g,"")});
    }
    const dateRange = getMonthDateRange(data.date);
    const gross = Math.round(data.salary/12);
    const bracket = _.find(brackets, function(d){ return data.salary >= d.lowest && data.salary <= d.highest });
    const tax = Math.round((bracket.base + (data.salary - bracket.threshold) * bracket.rate) / 12);
    const payslip = [];
    payslip.push({
      fullName: data.fname +' '+ data.lname,
      period: moment(dateRange.startDate).format('LL') +'-'+ moment(dateRange.endDate).format('LL'),
      gross: gross,
      tax: tax,
      net: gross - tax,
      super: Math.round(gross * data.srate / 100),
    });
    return res.status(200).send(payslip);
  }catch(err){
    debugger;
    handleError(res,err);
  }
};

const validateSchema = (inputSchema) => {

  const schema = Joi.object().keys({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    salary: Joi.number().min(1),
    srate: Joi.number().min(1).max(12),
    date: Joi.date()
  });

  // Return result.
  const result = Joi.validate(inputSchema, schema);

  return result;
};

const getMonthDateRange = (date) => {
  const year = moment(date).format('YYYY');
  const month = moment(date).format('M');
  const startDate = moment([year, month - 1]);
  const endDate = moment(startDate).endOf('month');
  return { startDate, endDate };
}

const handleError = (res, err) => {
  return res.status(500).send(err);
}
module.exports = {
  create
}
