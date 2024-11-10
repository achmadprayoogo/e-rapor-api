class util {
  static get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  static getPage() {
    const layout = "../views/layout.ejs";
    const style = "../public/styles/";
    const pages = "../views/pages/";
    return {
      layout,
      style,
      pages,
    };
  }

  static getLastUpdate(timeStamp) {
    if (timeStamp === undefined) {
      return "belum ada perubahan data";
    }
    const lastUpdated = `terahir diubah: ${timeStamp.toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })}`;

    return lastUpdated;
  }

  static replaceDateToIndonesianFormat(date) {
    const month = [
      "januari",
      "februari",
      "maret",
      "april",
      "mei",
      "juni",
      "juli",
      "agustus",
      "september",
      "oktober",
      "november",
      "desember",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const dayFormat = day < 10 ? "0" + day : day;

    return `${dayFormat} ${month[monthIndex]} ${year}`;
  }

  static replaceDateToSystemFormat(indonesianDate) {
    if (new Date(indonesianDate) != "Invalid Date") {
      return new Date(indonesianDate);
    } else {
      const month = [
        "januari",
        "februari",
        "maret",
        "april",
        "mei",
        "juni",
        "juli",
        "agustus",
        "september",
        "oktober",
        "november",
        "desember",
      ];

      indonesianDate = indonesianDate.split(" ");
      const day = indonesianDate[0];
      const monthIndex = month.indexOf(indonesianDate[1].toLowerCase());
      const year = indonesianDate[2];
      return new Date(year, monthIndex, day);
    }
  }

  static csvToJSON(text, objKey) {
    const isCSV = text.split("\n")[0].split(",").length > 1;
    if (!isCSV) {
      throw new Error("The file is not a CSV");
    }
    const rows = text.split("\n");
    const result = [];
    const headers = objKey;
    const dataRow = rows[1].split(",");

    if (dataRow.length == headers.length) {
      for (let i = 1; i < rows.length - 1; i++) {
        const obj = {};
        const currentRow = rows[i].split(",");

        for (let j = 0; j < dataRow.length; j++) {
          typeof currentRow[j] === "string"
            ? (obj[headers[j]] = currentRow[j].toLowerCase().replace(/\r/g, ""))
            : (obj[headers[j]] = currentRow[j]);
        }
        result.push(obj);
      }
      return result;
    } else {
      throw new Error("The number of headers and rows is not the same");
    }
  }
}

export { util };
