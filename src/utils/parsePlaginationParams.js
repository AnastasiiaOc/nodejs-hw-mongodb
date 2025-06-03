 const parseNumber = (value, defaultValue) => {  //OK
        if(typeof value !== "string") return defaultValue;    
        const parsedValue = parseInt(value);
        if(Number.isNaN(parsedValue)) return defaultValue; 
        return parsedValue;
    };
export const parsePaginationParams = ({ page, perPage }) => {
    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 10);
    return {
        page: parsedPage,
        perPage: parsedPerPage,
    };
};

// Додайте пагінацію до маршруту GET /contacts. Для цього використовуйте такі query параметри запиту:
// page - номер сторінки запиту (за замовчуванням 1)
// perPage - кількість елементів на сторінці (за замовчуванням 10)

