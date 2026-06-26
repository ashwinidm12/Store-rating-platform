export const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\|,.<>/?]).{8,16}$/;
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validateName = (name) => name.trim().length >= 20 && name.trim().length <= 60;
export const validateAddress = (address) => address.trim().length <= 400;
export const validatePassword = (password) => passwordPattern.test(password);
export const validateEmail = (email) => emailPattern.test(email);
