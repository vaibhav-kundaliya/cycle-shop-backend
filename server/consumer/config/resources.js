const resources = {
  messages: {
    error: {
      generic: (err) => {
        return `An error has occurred ${err}.`;
      },
      notFound: "Resource not found.",
      unauthorized: "Unauthorized access.",
      validation: "Validation error.",
      conflict: "Resource already exists.",
    },
    success: {
      created: "Resource created successfully.",
      updated: "Resource updated successfully.",
      deleted: "Resource deleted successfully.",
      fetched: "Here is the resource data you wanted",
    },
  },
  status: {
    success: "success",
    fail: "fail",
  },
  companyDetails: {
    name: "Fashion Heaven PVT LTD",
    address: "G-6 Jyoti Plaza, Shyamal Cross Road, 132 Feet Ring Rd, Satellite",
    zip: "380015",
    state: "Gujarat ",
    country: "India",
    phone: "9825807060",
    email: "FashiohHeaven@gmail.com",
  },
  orderPhases: {
    first: "Order Confirmed",
    second: "Transported",
    third: "Dispatched",
    fourth: "Delivered",
    cancel: "Cancelled",
  },
};

module.exports = resources;
