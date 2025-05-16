import logger from "./Logger";

export const ErrorMap: Record<string, { status: number; message: string }> = {
    "Not Enough User Balance Of Token!": {
      status: 400,
      message: "Insufficient token balance",
    },
    "Unable to fetch gas price!": {
      status: 400,
      message: "Unable to fetch gas price",
    },
    "Transaction failed while processing!": {
      status: 404,
      message: "Transaction processing failed",
    },
    "Gas estimation error!": {
      status: 404,
      message: "Gas estimation error",
    }

  };
  
  // Helper function to throw if error is in map
  export const throwMappedError = (errorMessage: string): never => {

    logger.error(" ❌ In throw Map error",errorMessage);
    const known = ErrorMap[errorMessage];
    if (known) {
      const err = new Error(known.message) as any;
      err.statusCode = known.status;
      throw err;
    }
  
    // Throw generic error if not mapped
    const err = new Error("Something went wrong") as any;
    err.statusCode = 500;
    throw err;
  };