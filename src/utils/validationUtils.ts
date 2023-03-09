import * as Yup from 'yup'

const EMPTY_ERROR = 'Ez a mező kötelező!';
const STRING_TO_SHORT_ERROR = 'Túl rövid értéket adtál meg!'
const INVALID_EMAIL_ERROR = 'Hibás email cím!'
const EMPTY_EMAIL_ERROR = 'Az email cím megadása kötelező!'
const EMPTY_PASSWORD_ERROR = 'Az jelszó megadása kötelező!'

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

export const LoginDataSchema = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL_ERROR).required(EMPTY_EMAIL_ERROR),
  password: Yup.string().required(EMPTY_PASSWORD_ERROR)
})

export const BetSchema = Yup.object().shape({
  odds: Yup.number().required(EMPTY_ERROR).min(1, 'A megadott odds nem lehet 1-nél kisebb!'),
  bet: Yup.number().required(EMPTY_ERROR).min(1, 'A megadott tét nem lehet 1-nél kisebb!')
})


export const UploadSchema = Yup.object().shape({
  amount: Yup.number().required(EMPTY_ERROR),
})


export const TicketSchema = Yup.object().shape({
  tips: Yup.array().required(EMPTY_ERROR),
  bet: Yup.number().required(EMPTY_ERROR).min(1, 'A megadott tét nem lehet 1-nél kisebb!')
})


export const userSettingsSchema = Yup.object().shape({
  fullname: Yup.string().required(EMPTY_ERROR),
  username: Yup.string().required(EMPTY_ERROR),
  email: Yup.string().required(EMPTY_ERROR),
})

export const userPasswordChangeSchema = Yup.object().shape({
  password: Yup.string().required(EMPTY_ERROR),
  passwordRepeat: Yup.string().required(EMPTY_ERROR).oneOf([Yup.ref('password'), null], 'Egyeznie kell a két jelszónak!')
})

export const PlayingTypeSchema = Yup.object().shape({
  selectedInput: Yup.string().required('A stratégia kiválasztása kötelező!'),
})


export const BugReportSchema = Yup.object().shape({
  title: Yup.string().required('A cím kitöltése kötelező!'),
  text: Yup.string().required('A leírás kitöltése kötelező!'),
})