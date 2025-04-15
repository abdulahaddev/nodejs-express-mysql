const express = require('express');
const router = express.Router();
const companyService = require('../services/companyService');

router.get('/CompanyDashboard', async (req, res) => {
  try {
    const companies = await companyService.getCompanyList();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    });
  }
});

router.get('/GetCompanyByID/:companyId', async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.companyId);
    if (!company) {
      return res.status(404).json({
        Status: 'Failed',
        StatusCode: 404,
        Message: 'Company not found',
      });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    });
  }
});

router.post('/InsertNewCompany', async (req, res) => {
  try {
    const result = await companyService.insertNewCompany(req.body);
    res.status(result.StatusCode).json(result);
  } catch (error) {
    res.status(500).json({
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    });
  }
});

router.put('/UpdateCompany', async (req, res) => {
  try {
    const result = await companyService.updateCompany(req.body);
    res.status(result.StatusCode).json(result);
  } catch (error) {
    res.status(500).json({
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    });
  }
});

router.put('/DeleteCompany/:companyId', async (req, res) => {
  try {
    const result = await companyService.deleteCompany(req.params.companyId);
    res.status(result.StatusCode).json(result);
  } catch (error) {
    res.status(500).json({
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    });
  }
});

module.exports = router;