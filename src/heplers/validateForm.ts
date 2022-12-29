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
      case ValidateRuleType.Message: {
        if (!value?.trim()) {
          errorMessage = 'message — не должно быть пустым.';
        }
        break;
      }
      case ValidateRuleType.Phone: {
        if (value?.length < 10 || value?.length > 15 || !/^(\+|[0-9])([0-9])+$/.test(value)) {
          errorMessage = 'phone — от 10 до 15 символов, состоит из цифр, может начинается с плюса.';
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
          errorMessage =
            'password — от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.';
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
