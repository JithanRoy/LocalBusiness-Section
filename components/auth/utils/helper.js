import * as yup from "yup";

// Login form validatin schema
export const loginSchema = yup.object().shape({
  userName: yup.string().required("You must enter user name "),

  password: yup.string().required("No password provided."),
});

// registration form validation schema
export const regiSchema = yup.object().shape({
  userName: yup.string().required("An Email is required"),
  email: yup.string().required("Must enter Email").email("Enter Valid email"),

  firstname: yup.string().required("A Firstname is required"),
  lastname: yup.string().required("A Lastname is required"),

  phonenumber: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("A phone number is required"),
  companytype: yup.string().required("A Company type is required"),
  companywebsite: yup.string().required("A Company website is required"),
  address: yup.string().required("An Address is required"),
  zip: yup.string().required("Enter ZIP"),
  companyName: yup.string().required("An company name is required"),
  password: yup
    .string()
    .required("A Password is required.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  //.matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

// Contact form validation schema
export const contactSchema = yup.object().shape({
  fullname: yup.string().required("A Fullname is required"),
  companyName: yup.string().required("Company  is required"),
  email: yup
    .string()
    .email("Enter a valid Email")
    .required("An Email is required"),
  subject: yup.string().required("Required"),
});

// Reset password validation schema
export const resetpassschema = yup.object().shape({
  currentPassword: yup.string().required("No password provided."),

  newPassword: yup.string().required("No password provided."),
});

// Search Modal validation schema

export const searchmodalschema = yup.object().shape(
  {
    incorporated_from: yup.lazy(() =>
      yup
        .string()
        .when(
          [
            "incorporated_to",
            "company_name",
            "sic_codes",
            "postal_code",
            "city",
          ],
          {
            is: (incorporated_to, company_name, sic_codes, postal_code, city) =>
              !incorporated_to &&
              !company_name &&
              !sic_codes &&
              !postal_code &&
              !city,
            then: yup.string().required(),
          }
        )
    ),
    incorporated_to: yup.lazy(() =>
      yup
        .string()
        .when(
          [
            "incorporated_from",
            "company_name",
            "sic_codes",
            "postal_code",
            "city",
          ],
          {
            is: (
              incorporated_from,
              company_name,
              sic_codes,
              postal_code,
              city
            ) =>
              !incorporated_from &&
              !company_name &&
              !sic_codes &&
              !postal_code &&
              !city,
            then: yup.string().required(),
          }
        )
    ),
    city: yup.lazy(() =>
      yup
        .string()
        .when(
          [
            "incorporated_to",
            "company_name",
            "sic_codes",
            "postal_code",
            "incorporated_from",
          ],
          {
            is: (
              incorporated_from,
              company_name,
              sic_codes,
              postal_code,
              incorporated_to
            ) =>
              !incorporated_from &&
              !company_name &&
              !sic_codes &&
              !postal_code &&
              !incorporated_to,
            then: yup.string().required(),
          }
        )
    ),
    company_name: yup.lazy(() =>
      yup
        .string()
        .when(
          [
            "incorporated_to",
            "city",
            "sic_codes",
            "postal_code",
            "incorporated_from",
          ],
          {
            is: (
              incorporated_from,
              city,
              sic_codes,
              postal_code,
              incorporated_to
            ) =>
              !incorporated_from &&
              !city &&
              !sic_codes &&
              !postal_code &&
              !incorporated_to,
            then: yup.string().required(),
          }
        )
    ),
    sic_codes: yup.lazy(() =>
      yup
        .string()
        .when(
          [
            "incorporated_to",
            "company_name",
            "city",
            "postal_code",
            "incorporated_from",
          ],
          {
            is: (
              incorporated_from,
              company_name,
              city,
              postal_code,
              incorporated_to
            ) =>
              !incorporated_from &&
              !company_name &&
              !city &&
              !postal_code &&
              !incorporated_to,
            then: yup.string().required(),
          }
        )
    ),
    postal_code: yup.lazy(() =>
      yup
        .string()
        .when(
          [
            "incorporated_to",
            "company_name",
            "city",
            "sic_codes",
            "incorporated_from",
          ],
          {
            is: (
              incorporated_from,
              company_name,
              city,
              sic_codes,
              incorporated_to
            ) =>
              !incorporated_from &&
              !company_name &&
              !city &&
              !sic_codes &&
              !incorporated_to,
            then: yup.string().matches(new RegExp("[0-9]")).required(),
          }
        )
    ),
  },
  [
    ["incorporated_from", "company_name", "sic_codes", "postal_code", "city"],
    ["incorporated_to", "company_name", "sic_codes", "postal_code", "city"],
    [
      "incorporated_to",
      "company_name",
      "sic_codes",
      "postal_code",
      "incorporated_from",
    ],
    [
      "incorporated_to",
      "city",
      "sic_codes",
      "postal_code",
      "incorporated_from",
    ],
    [
      "incorporated_to",
      "company_name",
      "city",
      "postal_code",
      "incorporated_from",
    ],
    [
      "incorporated_to",
      "company_name",
      "city",
      "sic_codes",
      "incorporated_from",
    ],
  ]
);

// company result search validation

export const resultSearchValidation = yup.object().shape({
  post_code: yup.string().required(),
  sic_code: yup.string().required(),
});
