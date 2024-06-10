import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { MutableRefObject, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser, User } from '../redux/session/sessionSlice'
import sessionApi, { Response } from '../components/shared/api/sessionApi'
import flashMessage from '../components/shared/flashMessages'
import errorMessage from '../components/shared/errorMessages'
import { FormikProps, useFormik, withFormik } from 'formik'
import * as Yup from 'yup';

const initialValues = {
  email: '',
  password: '',
  rememberMe: true,
  errors: [] as string[],
};

interface MyFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
  errors: string[];
}

const OldNew: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberme] = useState(true)
  const inputEl = useRef() as MutableRefObject<HTMLInputElement>
  // const [errors, setErrors] = useState([] as any)
  const dispatch = useDispatch()
  

  // const validate = (values: MyFormValues) => {
  //   const errors = {} as any;

  //   if (!values.email) {
  //     errors.email = 'Required'
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email format'
  //   }

  //   if (!values.password) {
  //     errors.password = 'Required'
  //   }

  //   return errors
  // }

  // 25
  // const validateComments = value => {
  //   let error
  //   if (!value) {
  //     error = 'Required'
  //   }
  //   return error
  // }

  // <Field validate={validateComments}

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string().required('Required')
  })

  // const onSubmit = (values: MyFormValues, e: { preventDefault: () => void }) => {
  //   sessionApi.create(
  //     {
  //       session: {
  //         email: email,
  //         password: password,
  //         remember_me: rememberMe ? "1" : "1"
  //       }
  //     }
  //   )
  //   .then((response: Response<User>) => {
  //     if (response.user) {
  //       inputEl.current.blur()
  //       if (rememberMe) {
  //         localStorage.setItem("token", response.jwt)
  //         localStorage.setItem("remember_token", response.token)
  //       } else {
  //         sessionStorage.setItem("token", response.jwt)
  //         sessionStorage.setItem("remember_token", response.token)
  //       }
  //       dispatch(fetchUser())
  //       router.push("/users/"+response.user.id)
  //     }
  //     if (response.error) {
  //       setErrors(response.error)
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  //   e.preventDefault()
  // }

  const onSubmit = (values: MyFormValues) => {
    console.log('Form data', values)
  }

  const formik: FormikProps<MyFormValues> = useFormik<MyFormValues>({
    initialValues,
    onSubmit,
    validationSchema
  })

  console.log('formik.touched', formik.touched)

  return (
    <React.Fragment>
    <h1>Log in</h1>
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <form
        action="/login"
        acceptCharset="UTF-8"
        method="post"
        onSubmit={formik.handleSubmit}
        >
          {/* { errors.length !== 0 &&
            errorMessage(errors)
          } */}

          <label htmlFor="session_email">Email</label>
          <input
          className="form-control"
          type="email"
          name="email"
          id="session_email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='error'>{formik.errors.email}</div>
          ) : null}

          <label htmlFor="session_password">Password</label>
          <Link href="/password_resets/new">(forgot password)</Link>
          <input
          className="form-control"
          type="password"
          name="password"
          id="session_password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='error'>{formik.errors.password}</div>
          ) : null}

          <label className="checkbox inline" htmlFor="session_remember_me">
            <input
            name="remember_me"
            type="hidden"
            value="0" />
            <input
            checked
            type="checkbox"
            name="remember_me"
            id="session_remember_me"
            value={formik.values.rememberMe ? "1" : "0"}
            onChange={formik.handleChange}
            />
            <span>Remember me on this computer</span>
          </label>
          <input ref={inputEl} type="submit" name="commit" value="Log in" className="btn btn-primary" data-disable-with="Log in" />
        </form>
        <p>New user? <Link href="/signup">Sign up now!</Link></p>
      </div>
    </div>
    </React.Fragment>
  )
}

export default OldNew
