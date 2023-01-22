export enum ValidateRuleType {
  Login,
  Email,
  Phone,
  Password,
  Message,
  Name,
}

export type ValidateRule = {
  value: string;
  type: ValidateRuleType;
};

export function validateForm(rules: ValidateRule[]): string {
  let errorMessage = '';
  if (!rules?.length) {
    return errorMessage;
  }

  for (let i = 0; i < rules.length; i++) {
    const { type, value } = rules[i];
    switch (type) {
      case ValidateRuleType.Name: {
        if (!value?.trim() || !/^([A-ZА-Я])([A-Za-zА-Яa-z-])+$/.test(value)) {
          errorMessage =
            'first_name, second_name — латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).';
        }
        break;
      }

      case ValidateRuleType.Login: {
        if (
          !value?.trim() ||
          value?.length < 3 ||
          value?.length > 30 ||
          (value.match(/([A-Za-z0-9_-])/g) || []).length !== value.length
        ) {
          //
          errorMessage =
            'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).';
        }
        break;
      }
      case ValidateRuleType.Email: {
        if (!value?.trim() || !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/.test(value)) {
          errorMessage =
            'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.';
        }
        break;
      }
      case ValidateRuleType.Phone: {
        if (value?.length < 10 || value?.length > 15 || !/^(\+|[0-9])([0-9])+$/.test(value)) {
          errorMessage = 'От 10 до 15 символов, состоит из цифр, может начинается с плюса.';
        }
        break;
      }
      case ValidateRuleType.Password: {
        if (
          value?.length < 8 ||
          value?.length > 40 ||
          !/[A-ZА-Я]+/.test(value) ||
          !/[0-9]+/.test(value)
        ) {
          errorMessage = 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.';
        }
        break;
      }
      case ValidateRuleType.Message: {
        if (!value?.trim()) {
          errorMessage = 'Не должно быть пустым.';
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  return errorMessage;
}
