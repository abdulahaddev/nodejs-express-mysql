const express = require('express');
const router = express.Router();
const ConcernPersonService = require('../services/concernPersonService');

router.get('/concernPersonDashboard', async (req, res) => {
  try {
    const ConcernPerson = await ConcernPersonService.getConcernPersonList();
    res.status(200).json(ConcernPerson);
  } catch (error) {
    res.status(500).json({
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    });
  }
});

router.get('/GetConcernPersonByID/:ConcernPersonId', async (req, res) => {
  try {
    const concernPerson = await ConcernPersonService.getConcernPersonById(req.params.ConcernPersonId);
    if (!concernPerson) {
      return res.status(404).json({
        Status: 'Failed',
        StatusCode: 404,
        Message: 'Concern Person not found',
      });
    }
    res.status(200).json(concernPerson);
  } catch (error) {
    res.status(500).json({
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    });
  }
});

router.post('/InsertConcernPerson', async (req, res) => {
  try {
    const result = await ConcernPersonService.insertNewConcernPerson(req.body);
    res.status(result.StatusCode).json(result);
  } catch (error) {
    res.status(500).json({
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    });
  }
});

router.put('/UpdateConcernPerson', async (req, res) => {
  try {
    const result = await ConcernPersonService.updateConcernPerson(req.body);
    res.status(result.StatusCode).json(result);
  } catch (error) {
    res.status(500).json({
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    });
  }
});

router.put('/DeleteConcernPerson/:concernPersonId', async (req, res) => {
  try {
    const result = await ConcernPersonService.deleteConcernPerson(req.params.concernPersonId);
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