module.export = createError{
  const err = new Error();
  err.status = status;
  err.message = message;
  return err();
}

// const err = new Error();
// err.status = 404;
// err.message = "product not found";
// return next(err);