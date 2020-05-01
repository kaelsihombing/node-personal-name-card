/* istanbul ignore next */
exports.serverError = (err, req, res, next) => {
   res.status(500).json({
      status: false,
      errors: err.message
   })
}

/* istanbul ignore next */
exports.notFound = async (req, res, next) => {
   res.status(404).json({
      status: false,
      errors: "Not found!"
   })
}