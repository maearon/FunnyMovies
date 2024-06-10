"use client";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layouts'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { fetchUser } from '../redux/session/sessionSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

store.dispatch(fetchUser())
toast.configure({
  autoClose: 8000,
  draggable: false,
  position: toast.POSITION.TOP_CENTER,
})
export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
