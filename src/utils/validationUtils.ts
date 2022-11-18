import * as Yup from 'yup'

const EMPTY_ERROR = 'Ez a mező kötelező!';
const STRING_TO_SHORT_ERROR = 'Túl rövid értéket adtál meg!'
const INVALID_EMAIL_ERROR = 'Hibás email cím!'
const EMPTY_EMAIL_ERROR = 'Az email cím megadása kötelező!'

export const BaseDatasSchema = Yup.object().shape({
  fullName: Yup.string()
    .required(EMPTY_ERROR)
    .min(1, STRING_TO_SHORT_ERROR)
    .max(50, 'Túl hosszú név!'),
  username: Yup.string()
    .required(EMPTY_ERROR)
    .min(1, STRING_TO_SHORT_ERROR)
    .max(50, 'Túl hosszú felhasználói név'),
  email: Yup.string().email(INVALID_EMAIL_ERROR).required(EMPTY_EMAIL_ERROR)
})

export const BillingDatasSchema = Yup.object().shape({
  country: Yup.string()
    .required(EMPTY_ERROR)
    .min(1, STRING_TO_SHORT_ERROR)
    .max(50, 'Too Long!'),
  zipCode: Yup.string()
    .required(EMPTY_ERROR)
    .min(4, 'Hibás irányítószám formátum!')
    .max(4, 'Hibás irányítószám formátum!'),
    city: Yup.string()
    .required(EMPTY_ERROR)
    .min(1, STRING_TO_SHORT_ERROR)
    .max(50, 'Túl hosszú városnév!'),
    street: Yup.string()
    .required(EMPTY_ERROR)
    .min(1, STRING_TO_SHORT_ERROR)
    .max(150, 'Túl hosszú utca, házszám!'),
})
