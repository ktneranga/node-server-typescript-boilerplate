import { Request, Response, NextFunction } from "express";
import { companies } from "../models/Company";
import { AppError } from "../middleware/error.middleware";

//get company
export const getCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const companyId = req.params.companyId;
    const { _id } = req.user;
    const company = await companies.find({ _id: companyId, userId: _id });

    if (!company) {
      throw new AppError(404, "Company not found");
    }

    res.status(200).json({
      message: "Company details",
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

//get companies
export const getCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const per_page = req.query?.per_page
      ? parseInt(req.query?.per_page as string)
      : 10;
    const page = req.query?.page ? parseInt(req.query?.page as string) : 1;
    const { _id } = req.user;
    const companyDetails = await companies
      .find({ userId: _id })
      .limit(per_page)
      .skip((page - 1) * per_page);

    if (!companyDetails) {
      throw new AppError(404, "Company not found");
    }

    res.status(200).json({
      message: "Company details",
      success: true,
      data: companyDetails,
    });
  } catch (error) {
    next(error);
  }
};

//add a new company
export const addNewCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user;
    const newCompany = { ...req.body, userId: _id };

    const savedCompany = await companies.create(newCompany);

    if (!savedCompany) {
      throw new AppError(400, "Failed to add a new company");
    }

    res.status(201).json({
      message: "Company was added",
      success: true,
      data: savedCompany,
    });
  } catch (error) {
    next(error);
  }
};

//update company
export const updateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user;
    const companyId = req.params.companyId;
    const company = { ...req.body, userid: _id };

    const updatedCompany = await companies.findOneAndUpdate(
      { _id: companyId, userId: _id },
      company,
      { new: true }
    );

    if (!updatedCompany) {
      throw new AppError(400, "Company updating failed");
    }

    res.status(200).json({
      message: "Company details updated",
      success: true,
      data: updatedCompany,
    });
  } catch (error) {
    next(error);
  }
};
