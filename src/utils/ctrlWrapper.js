
export const ctrlWrapper = (controller) => {
    return async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (error) {
        next(error);
      }
    };
};
  
// teacher's version
// export const ctrlWrapper = (controller) => {
//     const func = async (req, resp, next) => {
//         try {
//             await controller(req, resp, next);
//         }
//         catch (error) {
//             next(error)
//         }
//     }
//     // return func;
// };
