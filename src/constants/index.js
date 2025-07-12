import path from 'node:path';

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
};
  
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    
    SMTP_FROM: 'SMTP_FROM',
};
  


export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');


export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
    CLOUD_NAME: 'CLOUD_NAME',
    API_KEY: 'API_KEY',
    API_SECRET: 'API_SECRET',
  };


//OK


// destination (призначення): Цей параметр визначає, в яку директорію будуть зберігатися завантажені файли. Він реалізований як функція, яка отримує три аргументи: запит (req), файл (file) і функцію зворотного виклику (cb). Функція зворотного виклику використовується для передачі директорії, в яку слід зберегти файл. У даному випадку, цю директорію ми визначии заздалегідь у константі TEMP_UPLOAD_DIR, що вказує на тимчасову директорію для завантажень.
// filename (ім'я файлу): Цей параметр визначає, яке ім'я буде надане завантаженому файлу. Він також реалізований як функція з трьома аргументами: запит (req), файл (file) і функція зворотного виклику (cb). Щоб уникнути конфліктів між файлами з однаковими іменами, до оригінального імені файлу додамо унікальний суфікс. Цей суфікс створюється за допомогою поточної дати і часу у мілісекундах, що гарантує унікальність кожного імені файлу.