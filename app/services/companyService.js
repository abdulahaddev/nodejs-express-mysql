const Company = require('../models/company');

const getCompanyList = async () => {
  try {
    const companies = await Company.findAll({
      where: { is_deleted: 0 },
      attributes: ['company_id', 'company_name', 'picture', 'is_deleted'],
    });
    return companies.map((company) => ({
      CompanyId: company.company_id,
      CompanyName: company.company_name,
      Picture: company.picture,
      IsDeleted: company.is_deleted,
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCompanyById = async (companyId) => {
  try {
    const company = await Company.findOne({
      where: { company_id: companyId },
      attributes: ['company_id', 'company_name', 'picture', 'is_deleted'],
    });
    if (!company) return null;
    return {
      CompanyId: company.company_id,
      CompanyName: company.company_name,
      Picture: company.picture,
      IsDeleted: company.is_deleted,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const insertNewCompany = async (companyData) => {
  try {
    const company = await Company.create({
      company_name: companyData.CompanyName,
      picture: companyData.Picture || '',
      is_deleted: 0,
    });
    return {
      Status: 'Success',
      StatusCode: 200,
      Data: company.company_id,
    };
  } catch (error) {
    return {
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    };
  }
};

const updateCompany = async (companyData) => {
  try {
    const company = await Company.findByPk(companyData.CompanyId);
    if (!company) {
      return {
        Status: 'Failed',
        StatusCode: 404,
        Message: 'Company not found',
      };
    }
    await company.update({
      company_name: companyData.CompanyName,
      picture: companyData.Picture || '',
      is_deleted: 0,
    });
    return {
      Status: 'Success',
      StatusCode: 200,
      Data: company.company_id,
    };
  } catch (error) {
    return {
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    };
  }
};

const deleteCompany = async (companyId) => {
  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return {
        Status: 'Failed',
        StatusCode: 404,
        Message: 'Company not found',
      };
    }
    await company.update({ is_deleted: 1 });
    return {
      Status: 'Success',
      StatusCode: 200,
      Data: company.company_id,
    };
  } catch (error) {
    return {
      Status: 'Failed',
      StatusCode: 500,
      Message: error.message,
    };
  }
};

module.exports = {
  getCompanyList,
  getCompanyById,
  insertNewCompany,
  updateCompany,
  deleteCompany,
};