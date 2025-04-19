const SalesDistribute = require("../models/sales_distribute");
const Company = require("../models/company");
const ConcernPerson = require("../models/concern_person");
const { Op } = require('sequelize');

const getSalesDistributeDataPerDay = async ({
  ConcernPersonID,
  CompanyId,
  StartDate,
  EndDate,
}) => {
  try {
    const result = await SalesDistribute.findAll({
      where: {
        isDeleted: 0,
        creationTime: {
          [Op.between]: [new Date(StartDate), new Date(EndDate)],
        },
        ...(CompanyId && CompanyId !== "0" && { companyId: CompanyId }),
        ...(ConcernPersonID &&
          ConcernPersonID !== "0" && { concernPersonId: ConcernPersonID }),
      },
      include: [
        {
          model: ConcernPerson,
          as: "concernPerson", // make sure alias matches association
          where: { isDeleted: 0 },
          required: true,
          attributes: ["concernPersonName"],
        },
        {
          model: Company,
          as: "company",
          attributes: ["companyName"],
        },
      ],
      order: [["salesDistributeId", "DESC"]],
      attributes: [
        "salesDistributeId",
        "totalReceive",
        "totalReturn",
        "totalSales",
        "totalPrice",
        "grandTotal",
        "creationTime",
      ],
    });

    return result.map((item) => ({
      salesDistributeId: item.salesDistributeId,
      concernPerson: item.concernPerson.concernPersonName,
      companyName: item.company.companyName,
      totalReceive: item.totalReceive,
      totalReturn: item.totalReturn,
      totalSales: item.totalSales,
      totalPrice: item.totalPrice,
      grandTotal: item.grandTotal,
      creationTime: item.creationTime,
    }));
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getSalesDistributeDataPerDay,
};
