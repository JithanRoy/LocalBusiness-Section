import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
    userName: yup.string().required('This field is required'),
    password: yup.string().required('This field is required'),
})

export const EditProfileSchema = yup.object().shape({
    userName: yup.string().required('Required'),
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup.string().required('Required').email('Must be valid email'),
    phone: yup.string().required('Required'),
    companyName: yup.string().required('Required'),
    companyWebsite: yup.string().required('Required'),
    companyType: yup.string().required('Required'),
    //password: yup.string().required('Required'),
    country: yup.string().required('Required'),
    city: yup.string().required('Required'),
    countryCode: yup.string().required('Required'),
    postCode: yup.string().required('Required'),
    address: yup.string().required('Required'),
})

