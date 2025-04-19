const ConcernPerson =  require("../models/concern_person");

const getConcernPersonList = async () => {
    try {
      const concernPerson = await ConcernPerson.findAll({
        where: { is_deleted: 0 },
        attributes: ['concern_person_id', 'concern_person_name', 'is_deleted'],
      });
      return concernPerson.map((concernPerson) => ({
        concernPerson: concernPerson.concern_person_id,
        concernPersonName: concernPerson.concern_person_name,
        IsDeleted: concernPerson.is_deleted,
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  };

const getConcernPersonById = async (concernPersonId) => {
    try {
      const concernPerson = await ConcernPerson.findOne({
        where: { concern_person_id: concernPersonId },
        attributes: ['concern_person_id', 'concern_person_name', 'is_deleted'],
      });
      if (!concernPerson) return null;
      return {
        concernPerson: concernPerson.concern_person_id,
        concernPersonName: concernPerson.concern_person_name,
        IsDeleted: concernPerson.is_deleted,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const insertNewConcernPerson = async (concernPersonData) => {
    try {
      const concernPerson = await ConcernPerson.create({
        concern_person_name: concernPersonData.ConcernPersonName,
        is_deleted: 0,
      });
      return {
        Status: 'Success',
        StatusCode: 200,
        Data: concernPerson.concern_person_id,
      };
    } catch (error) {
      return {
        Status: 'Failed',
        StatusCode: 500,
        Message: error.message,
      };
    }
  };


  const updateConcernPerson = async (concernPersonData) => {
    try {
      const concernPerson = await ConcernPerson.findByPk(concernPersonData.ConcernPersonId);
      if (!concernPerson) {
        return {
          Status: 'Failed',
          StatusCode: 404,
          Message: 'Concern Person not found',
        };
      }
      await ConcernPerson.update(
        {
          concern_person_name: concernPersonData.ConcernPersonName,
          is_deleted: 0,
        },
        {
          where: { concern_person_id: concernPersonData.ConcernPersonId },
        }
      );
      return {
        Status: 'Success',
        StatusCode: 200,
        Data: concernPerson.concern_person_id,
      };
    } catch (error) {
      return {
        Status: 'Failed',
        StatusCode: 500,
        Message: error.message,
      };
    }
  };

  const deleteConcernPerson = async (concernPersonId) => {
    try {
      const existingConcernPerson = await ConcernPerson.findByPk(concernPersonId);
  
      if (!existingConcernPerson) {
        return {
          Status: 'Failed',
          StatusCode: 404,
          Message: 'Concern Person not found',
        };
      }
  
      await ConcernPerson.update(
        { is_deleted: 1 },
        { where: { concern_person_id: concernPersonId } }
      );
  
      return {
        Status: 'Success',
        StatusCode: 200,
        Data: concernPersonId,
        Message: 'Concern Person marked as deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting concern person:', error); 
      return {
        Status: 'Failed',
        StatusCode: 500,
        Message: 'An error occurred while deleting the concern person',
        Error: error.message,
      };
    }
  };
  

  module.exports = {
    getConcernPersonList,
    getConcernPersonById,
    insertNewConcernPerson,
    updateConcernPerson,
    deleteConcernPerson,
  };