const easyinvoice = require("easyinvoice");
const fs = require("fs");
const Order = require("../../models/Order");
const resources = require("../../config/resources");
const Consumer = require("../../models/Consumer");
const Product = require("../../models/ProductData");
const path = require("path");

const getCurrentDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  return `${day}-${month}-${year}`;
};

const invoicePdf = async (req, res) => {
  try {
    const orderID = req.query.orderID;
    const consumerID = req.session.passport.user;
    const orderData = await Order.findOne({ _id: orderID });
    const userData = await Consumer.findOne({ _id: consumerID });
    const productData = await Product.findOne({ _id: orderData.productID });
    const currDate = getCurrentDate();
    if (orderData == null) {
      res.status(400).send({
        status: resources.status.fail,
        message: resources.messages.error.notFound,
      });
    } else {
      const invoiceData = {
        currency: "INR",
        taxNotation: "GST",
        marginTop: 25,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25,
        images: {
          logo: "https://picsum.photos/200",
        },
        sender: {
          company: resources.companyDetails.name,
          address: resources.companyDetails.address,
          zip: resources.companyDetails.zip,
          state: resources.companyDetails.state,
          country: resources.companyDetails.country,
          phone: resources.companyDetails.phone,
          email: resources.companyDetails.email,
        },
        client: {
          address: `${orderData.address.addressLine1}, ${orderData.address.addressLine2}`,
          zip: orderData.address.zipCode,
          state: orderData.address.state,
          country: orderData.address.country,
          phone: userData.phoneNumber,
          email: userData.email,
        },
        invoiceNumber: "INV-001",
        invoiceDate: currDate,
        products: [
          {
            quantity: orderData.quantity,
            size: orderData.size,
            color: orderData.color,
            price: 123,
          },
        ],
        tables: [
          {
            columns: [
              { label: "Item", width: "40%" },
              { label: "Quantity", width: "20%" },
              { label: "Price", width: "20%" },
              { label: "Total", width: "20%" },
            ],
            rows: [
              [
                {
                  content: productData.name,
                  colSpan: 2,
                  styles: {
                    border: ["", "", "", ""],
                    fontSize: 10,
                    fillColor: "#f2f2f2",
                  },
                },
                {},
                {
                  content: productData.price,
                  styles: {
                    border: ["", "", "", ""],
                    fontSize: 10,
                    fillColor: "#f2f2f2",
                  },
                },
                {
                  content: productData.price * orderData.quantity,
                  styles: {
                    border: ["", "", "", ""],
                    fontSize: 10,
                    fillColor: "#f2f2f2",
                  },
                },
              ],
            ],
          },
        ],
        bottomNotice: "Thank you for your business!",
      };

      try {
        let result = await easyinvoice.createInvoice(invoiceData);
        const fileName = path.join(
          __dirname,
          "../../public/assets/",
          `invoice-${currDate}.pdf`
        );

        fs.writeFileSync(fileName, result.pdf, "base64");
        res.status(200).send({
          status: resources.status.success,
          message: resources.messages.success.created,
          data: invoiceData,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          status: resources.status.fail,
          message: resources.messages.error.generic(error.toString()),
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: resources.status.fail,
      message: resources.messages.error.generic(err.toString()),
    });
  }
};

module.exports = { invoicePdf };
