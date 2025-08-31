export const formatCardNumber = (text: string) => {
  const digitsOnly = text.replace(/\D/g, '');
  return digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

export const formatExpiry = (text: string) => {
  const digitsOnly = text.replace(/\D/g, '');
  if (digitsOnly.length >= 2) {
    return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}`;
  }
  return digitsOnly;
};
