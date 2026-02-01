const PDFDocument = require("pdfkit");
const Category = require("../models/categoriesModel");
const Expense = require("../models/expenseModel");
const Income = require("../models/incomeModel");
const Savings = require("../models/savingsModel");

exports.downloadReport = async (req, res) => {
  try {
    const { type = "all", month = "all", format } = req.query;

    if (!format || !["pdf", "csv"].includes(format)) {
      return res.status(400).json({ message: "Invalid format" });
    }

    let data = [];

    switch (type) {
      case "categories":
        data = await Category.find(month === "all" ? {} : { month });
        break;

      case "expenses":
        data = await Expense.find(month === "all" ? {} : { month });
        break;

      case "income":
        data = await Income.find(month === "all" ? {} : { month });

      case "savings":
        data = await Savings.find(month === "all" ? {} : { month });

      case "all":
      default:
        const [c, e, i, s] = await Promise.all([
          Category.find(),
          Expense.find(),
          Income.find(),
          Savings.find(),
        ]);
        data = [...c, ...e, ...i, ...s];
        break;
    }

    if (format === "csv") {
      return generateCSV(res, data, type);
    }

    if (format === "pdf") {
      return generatePDF(res, data, type);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

function generateCSV(res, data, type) {
  let csv = "Date,Category,Amount\n";

  data.forEach((item) => {
    csv += `${item.date || ""},${item.category || item.name || ""},${item.amount || ""}\n`;
  });

  // 🔥 Excel UTF-8 support
  csv = "\ufeff" + csv;

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${type}-report.csv"`,
  );

  res.status(200).send(csv);
}

function generatePDF(res, data, type) {
  const doc = new PDFDocument({ margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${type}-report.pdf"`,
  );

  doc.pipe(res);

  doc.fontSize(18).text(`${type.toUpperCase()} REPORT`, { align: "center" });
  doc.moveDown();

  doc.fontSize(12);
  data.forEach((item) => {
    doc.text(
      `${item.date || ""} | ${item.category || item.name || ""} | ₹${item.amount || ""}`,
    );
  });

  doc.end();
}
