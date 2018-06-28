'use strict';

const _ = require('lodash');
const moment = require('moment');
const {tax_slabs: brackets} = require('./../../config/environment');

// function to generate payslip as per tax deduction.
const create = (req, res) => {
  try{
    const { body } = req;
    const data = { ...body };

    const isvalid = validations(data);
    if(isvalid.success === false){
      return res.status(400).send(isvalid);
    }
    const dateRange = getMonthDateRange(data.date);
    const gross = Math.round(data.salary/12);
    const bracket = _.find(brackets, function(d){ return data.salary >= d.lowest && data.salary <= d.highest });
    const tax = Math.round((bracket.base + (data.salary - bracket.threshold) * bracket.rate) / 12);
    const payslip = []
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
    handleError(res,err);
  }
};

const validations = (data) => {
  if(data.salary>=0){
    return {success : true,message:"Valid salary"};
  }else{
    return {success : false,message:"Invalid salary, should not be less then zero"};
  }
};

const getMonthDateRange = (date) => {
  try {
    const year = moment(date).format('YYYY');
    const month = moment(date).format('M');
    const startDate = moment([year, month - 1]);
    const endDate = moment(startDate).endOf('month');
    return { startDate, endDate };
  } catch (error) {
    throw new Error(error);
  }
}

const handleError = (res, err) => {
  return res.status(500).send(err);
}
module.exports = {
  create
}