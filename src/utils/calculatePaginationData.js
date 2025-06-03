
  export const calculatePaginationData = (count, perPage, page) => {
    const totalPages = Math.ceil(count / perPage);
    const hasNextPage = Boolean(totalPages - page);
    const hasPreviousPage = page !== 1;
  
    return {
      page,
      perPage,
      totalItems: count,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
};
  
  
// ==================interesting==============================
//   export const calculatePaginationData = ({page, perPage, totalItems})=> {
//     const totalPages = Math.ceil(totalItems / perPage);
//     const hasPrevPage = page > 1;
//     const hasNextPage = page < totalPages;
//     return {
//         totalPages,
//         hasPrevPage,
//         hasNextPage,
//     };
// };
