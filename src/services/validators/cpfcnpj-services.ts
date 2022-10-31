import { cpf, cnpj } from "cpf-cnpj-validator";

export const CPFValidator = (CPF: string) => {
  if (cpf.isValid(CPF)) return true;

  return false;
};

export const CNPJValidator = (CNPJ: string) => {
  if (cnpj.isValid(CNPJ)) return true;

  return false;
};

export const CPFFormatter = (CPF: string) => {
  return cpf.format(CPF);
};

export const CNPJFormatter = (CNPJ: string) => {
  return cpf.format(CNPJ);
};

export const CPFGenerator = () => {
  return cpf.generate();
};

export const CPNJGenerator = () => {
  return cnpj.generate();
};
