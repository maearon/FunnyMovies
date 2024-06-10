import type { NextPage } from 'next'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { fetchUser, selectUser } from '../../redux/session/sessionSlice'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '../../redux/hooks'
import sessionApi from '../../components/shared/api/sessionApi'

const Header: NextPage = () => {
  const router = useRouter()
  const userData = useAppSelector(selectUser);
  const dispatch = useDispatch()

  const onClick = () => {
    sessionApi.destroy(
    ).then(() => {
      dispatch(fetchUser())
      localStorage.removeItem("token")
      localStorage.removeItem("remember_token")
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("remember_token")
      router.push('/')
    })
    .catch((error) => {
      console.log("logout error", error)
    })
  }

  return (
    <header className="navbar navbar-fixed-top navbar-inverse">
      <div className="container">
        <Link href="/" id="logo">sample app</Link>
        <nav>
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <ul className="nav navbar-nav navbar-right collapse navbar-collapse"
              id="bs-example-navbar-collapse-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/help">Help</Link></li>
            {
            userData.status === 'failed' ? (
            <li><Link href="/">Loading</Link></li>
            ) : userData.error ? (
            <li><Link href="/">{userData.error}</Link></li>
            ) : userData.loggedIn ? (
            <>
            <li><Link href={"/users/"+userData.value.id}>Profile</Link></li>
            <li><Link href={"/users/"+userData.value.id+"/edit"}>Settings</Link></li>
            <li className="divider"></li>
            <li>
              <Link href="#logout" onClick={onClick}>Log out</Link>
            </li>
            </>
            ) : (
            <li><Link href="/login">Log in</Link></li>
            )
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
