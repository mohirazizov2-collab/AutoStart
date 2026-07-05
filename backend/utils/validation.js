const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  // O'zbekistonda +998 bilan boshlanadi
  const phoneRegex = /^(\+998|0)\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

const validatePrice = (price) => {
  return price > 0 && Number.isInteger(price);
};

const validateCarData = (data) => {
  const errors = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push('Sarlavha 3 ta belgidan ko\'p bo\'lishi kerak');
  }

  if (!data.brand || !data.brand.trim()) {
    errors.push('Brend ko\'rsatilishi kerak');
  }

  if (!data.model || !data.model.trim()) {
    errors.push('Model ko\'rsatilishi kerak');
  }

  if (!data.year || data.year < 1900 || data.year > new Date().getFullYear() + 1) {
    errors.push('Noto\'g\'ri yil');
  }

  if (!validatePrice(data.price)) {
    errors.push('Noto\'g\'ri narx');
  }

  if (!['rent0', 'rent1', 'cash'].includes(data.paymentType)) {
    errors.push('Noto\'g\'ri to\'lov turi');
  }

  if (!data.region || !data.region.trim()) {
    errors.push('Hudud ko\'rsatilishi kerak');
  }

  return { valid: errors.length === 0, errors };
};

const validateUserData = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Ism 2 ta belgidan ko\'p bo\'lishi kerak');
  }

  if (!validateEmail(data.email)) {
    errors.push('Noto\'g\'ri email');
  }

  if (!validatePhone(data.phone)) {
    errors.push('Noto\'g\'ri telefon raqami');
  }

  if (!data.password || data.password.length < 6) {
    errors.push('Parol 6 ta belgidan ko\'p bo\'lishi kerak');
  }

  return { valid: errors.length === 0, errors };
};

module.exports = {
  validateEmail,
  validatePhone,
  validatePrice,
  validateCarData,
  validateUserData
};
