import { util } from "../util/util.js";
import { biodata } from "../models/e-raporModels.js";

const layout = "../views/layout.ejs";
const style = "../public/styles/";
const pages = "../views/pages/";
let timeStamp;

const getViewAdminBiodata = async (req, res) => {
  const data = await biodata.getAll();
  res.render(layout, {
    title: "Admin E-Rapor",
    style: `${style}style-admin-dashboard.html`,
    page: `${pages}admin/admin-biodata.ejs`,
    pagePath: "Biodata",
    info: util.getLastUpdate(timeStamp),
    data,
  });
};

const getViewAdminBiodataInput = (req, res) => {
  res.render(layout, {
    title: "Admin E-Rapor",
    style: `${style}style-admin-dashboard.html`,
    page: `${pages}admin/admin-biodata-input.ejs`,
    pagePath: "Biodata / Input",
  });
};

const postViewAdminBiodataInput = async (req, res) => {
  const data = req.body;
  const dataInput = remakeData(data);

  await biodata.inputBiodata(dataInput).then((result) => {
    res.render(layout, {
      title: "Admin E-Rapor",
      style: `${style}style-admin-dashboard.html`,
      page: `${pages}admin/admin-biodata-input.ejs`,
      pagePath: "Biodata / Input",
      result,
    });

    if (result.status === "success") {
      timeStamp = new Date();
    }
  });
};

const getViewAdminBiodataImport = (req, res) => {
  res.render(layout, {
    title: "Admin E-Rapor",
    style: `${style}style-admin-dashboard.html`,
    page: `${pages}admin/admin-biodata-import.ejs`,
    pagePath: "Biodata / Import",
  });
};

const postViewAdminBiodataImport = async (req, res) => {
  const csvData = req.file.buffer.toString("utf-8");
  const objKey = [
    "nis",
    "fullName",
    "cityOfBirth",
    "dateOfBirth",
    "fatherName",
    "motherName",
    "guardianName",
    "status",
    "address",
  ];
  try {
    const jsonData = util.csvToJSON(csvData, objKey);

    const result = await biodata.importBiodata(jsonData);

    res.render(layout, {
      title: "Admin E-Rapor",
      style: `${style}style-admin-dashboard.html`,
      page: `${pages}admin/admin-biodata-import.ejs`,
      pagePath: "Biodata / Import",
      result,
    });
  } catch (error) {
    res.render(layout, {
      title: "Admin E-Rapor",
      style: `${style}style-admin-dashboard.html`,
      page: `${pages}admin/admin-biodata-import.ejs`,
      pagePath: "Biodata / Import",
      error,
    });
  }
};

const updateDataAdminBiodata = async (req, res) => {
  const dataJSON = req.body.biodata;
  const data = JSON.parse(dataJSON);
  const arrayResult = [];

  data.forEach(async (element) => {
    try {
      const dataInput = remakeData(element);
      const result = await biodata.updateBiodata(dataInput);
      arrayResult.push(result);
    } catch (error) {
      console.log(error);
      arrayResult.push({ error: error });
    }
  });

  timeStamp = new Date();

  res.render(layout, {
    title: "Admin E-Rapor",
    style: `${style}style-admin-dashboard.html`,
    page: `${pages}admin/admin-biodata.ejs`,
    pagePath: "Biodata",
    data: await biodata.getAll(),
    result: arrayResult,
  });
};

const deleteDataAdminBiodata = async (req, res) => {
  const nis = parseInt(req.body.nis);

  try {
    let data = [];
    const result = await biodata.deleteBiodata(nis);
    data.push(result);

    if (result.status === "success") {
      timeStamp = new Date();
    }

    res.render(layout, {
      title: "Admin E-Rapor",
      style: `${style}style-admin-dashboard.html`,
      page: `${pages}admin/admin-biodata.ejs`,
      pagePath: "Biodata",
      data: await biodata.getAll(),
      result: data,
    });
  } catch (error) {
    console.log(error);
  }
};

function remakeData(data) {
  const dataInput = {
    nis: parseInt(data.nis),
    newNIS: parseInt(data.newNIS?.length > 0 ? data.newNIS : data.nis),
    fullName: data.fullName.toLowerCase() || "-",
    cityOfBirth: data.cityOfBirth.toLowerCase() || "-",
    dateOfBirth:
      util.replaceDateToSystemFormat(data.dateOfBirth) || "01-01-1000",
    fatherName: data.fatherName.toLowerCase() || "-",
    motherName: data.motherName.toLowerCase() || "-",
    guardianName: data.guardianName.toLowerCase() || "-",
    status: data.status.toLowerCase() || status[0],
    address: data.address.toLowerCase() || "-",
  };

  return dataInput;
}

export default {
  getViewAdminBiodata,
  getViewAdminBiodataInput,
  postViewAdminBiodataInput,
  getViewAdminBiodataImport,
  postViewAdminBiodataImport,
  updateDataAdminBiodata,
  deleteDataAdminBiodata,
};
