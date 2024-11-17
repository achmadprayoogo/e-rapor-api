// util.test.js
import { util } from "../util/util";

describe("util", () => {
  describe("get_random", () => {
    it("should return a random element from the list", () => {
      const list = [1, 2, 3, 4, 5];
      const randomElement = util.get_random(list);
      expect(list).toContain(randomElement);
    });
  });

  describe("getPage", () => {
    it("should return an object with the correct paths", () => {
      const expectedObject = {
        layout: "../views/layout.ejs",
        style: "../public/styles/",
        pages: "../views/pages/",
      };
      expect(util.getPage()).toEqual(expectedObject);
    });
  });

  describe("getLastUpdate", () => {
    it('should return "belum ada perubahan data" if timeStamp is undefined', () => {
      expect(util.getLastUpdate()).toBe("belum ada perubahan data");
    });

    it("should return a formatted date string if timeStamp is provided", () => {
      const timeStamp = new Date(2024, 10, 15, 12, 30, 0); // 15 November 2024 12:30:00
      const expectedString = "terahir diubah: 15 November 2024 pukul 12.30.00";
      expect(util.getLastUpdate(timeStamp)).toBe(expectedString);
    });
  });

  describe("replaceDateToIndonesianFormat", () => {
    it("should return a date string in Indonesian format", () => {
      const date = new Date(2024, 10, 15); // 15 November 2024
      const expectedString = "15 november 2024";
      expect(util.replaceDateToIndonesianFormat(date)).toBe(expectedString);
    });
  });

  describe("replaceDateToSystemFormat", () => {
    it("should return a Date object from a date string in Indonesian format", () => {
      const indonesianDate = "15 november 2024";
      const expectedDate = new Date(2024, 10, 15);
      expect(util.replaceDateToSystemFormat(indonesianDate)).toEqual(
        expectedDate
      );
    });

    it("should return a Date object from a date string in system format", () => {
      const systemDate = "2024-11-15";
      const expectedDate = new Date(Date.UTC(2024, 10, 15));
      expect(util.replaceDateToSystemFormat(systemDate)).toEqual(expectedDate);
    });
  });

  describe("csvToJSON", () => {
    it("should convert a CSV string to a JSON array", () => {
      const csvString = "nama,usia,kota\njohn,30,jakarta\njane,25,bandung\n";
      const objKey = ["nama", "usia", "kota"];
      const expectedJSON = [
        { nama: "john", usia: "30", kota: "jakarta" },
        { nama: "jane", usia: "25", kota: "bandung" },
      ];
      expect(util.csvToJSON(csvString, objKey)).toEqual(expectedJSON);
    });

    it("should throw an error if the input is not a CSV string", () => {
      const invalidCSV = "This is not a CSV string";
      const objKey = ["nama", "usia", "kota"];
      expect(() => util.csvToJSON(invalidCSV, objKey)).toThrowError(
        "The file is not a CSV"
      );
    });

    it("should throw an error if the number of headers and rows is not the same", () => {
      const invalidCSV = "nama,usia,kota\njohn,30\njane,25,bandung\n";
      const objKey = ["nama", "usia", "kota"];
      expect(() => util.csvToJSON(invalidCSV, objKey)).toThrowError(
        "The number of headers and rows is not the same"
      );
    });
  });
});
