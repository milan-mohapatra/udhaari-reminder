const emailContentValidationSchema = {
  borrowerEmail: {
    escape: true,
    trim: true,
    normalizeEmail: true,
    isEmail: {
      errorMessage: "valid email required",
    },
  },
  borrowerName: {
    escape: true,
    trim: true,
    toLowerCase: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "valid name required, minimum 3 character",
    },
  },
  borrowingAmount: {
    isNumeric: {
      errorMessage: "amount is numeric",
    },
  },
};

module.exports = { emailContentValidationSchema };