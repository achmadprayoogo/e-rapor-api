import academicYear from "../models/academicYearModel.js";
import { data, cawu, grade, className } from "../models/e-raporModels.js";

const layout = "../views/layout.ejs";
const style = "../public/styles/";
const pages = "../views/pages/";
const academicYears = ["2022/2023", "2023/2024", "2024/2025"];

const getViewAuthUser = (req, res) => {
  res.render(layout, {
    title: "E-Rapor",
    style: `${style}style-auth-user.html`,
    page: `${pages}user/auth-user.ejs`,
  });
};

const getViewEraporUser = (req, res) => {
  res.render(layout, {
    title: "E-Rapor",
    style: `${style}style-e-rapor.html`,
    page: `${pages}user/e-rapor.ejs`,
    /** data */
    academicYears,
    cawu,
    /** profile */
    profile: "src/foto-profil-santri.jpg",
    name: "Muhammad Budiono Siregard",
    nis: 2010010398,
    status: "SANTRI AKTIF",
    placeOfBirth: "surabaya",
    dateOfBirth: "09 Mei 2005",
    fatherName: "Waluyo Siregard",
    motherName: "Ningsih Siregard",
    guardianName: "-",
    address: "Jl. Bumbu kacang No. 05 Tajinan Malang",
    /** rapor */
    className: "1 Wustho A",
    homeroomTeacher: "Ust. Antono",
    KKMValue: 60,
    scores: [
      { nahwu: 90 },
      { shorof: 90 },
      { fiqih: 90 },
      { akhlaq: 90 },
      { tauhid: 90 },
      { kepesantrenan: 90 },
      { bacaKitab: 90 },
      { praktik: 90 },
    ],
    totalScores: 720,
    averageScores: 90,
    totalKKM: 480,
    averageKKM: 60,
    rangking: 3,
    students: 30,
  });
};

const getViewAuthAdminLogin = (req, res) => {
  res.render(layout, {
    title: "Admin E-Rapor",
    style: `${style}style-admin-login.html`,
    page: `${pages}admin/admin-login.ejs`,
  });
};

const getViewAdminDashboard = (req, res) => {
  res.render(layout, {
    title: "Admin E-Rapor",
    style: `${style}style-admin-dashboard.html`,
    page: `${pages}admin/admin-dashboard.ejs`,
    pagePath: "Dashboard",
  });
};

const getViewAdminDataKelas = (req, res) => {
  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-data-kelas.ejs",
    pagePath: "Data Kelas",
    /** data */
    data: data.getAll(),
    academicYear,
    grade,
    className,
  });
};

const getViewAdminNilaiUjian = (req, res) => {
  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-nilai-ujian.ejs",
    pagePath: "Nilai Ujian",
    /** data */
    academicYear,
    cawu,
    grade,
    className,
  });
};

const getViewAdminRapor = (req, res) => {
  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-rapor.ejs",
    pagePath: "Rapor",
    /** data */
    academicYear,
    cawu,
    grade,
    className,
  });
};

const getViewAdminPengaturanUsername = (req, res) => {
  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-pengaturan-username.ejs",
    pagePath: "Pengaturan / Username",
  });
};

const getViewAdminPengaturanPassword = (req, res) => {
  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-pengaturan-password.ejs",
    pagePath: "Pengaturan / Password",
  });
};

const getViewAdminLogout = (req, res) => {
  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-biodata.ejs",
    pagePath: "Biodata",
  });
};

export default {
  getViewAuthUser,
  getViewAuthAdminLogin,
  getViewEraporUser,
  getViewAdminDashboard,
  getViewAdminDataKelas,
  getViewAdminNilaiUjian,
  getViewAdminRapor,
  getViewAdminPengaturanUsername,
  getViewAdminPengaturanPassword,
  getViewAdminLogout,
};
