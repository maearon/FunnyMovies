import type { NextPage } from 'next';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { fetchUser, selectUser } from '../../redux/session/sessionSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import sessionApi from '../../components/shared/api/sessionApi';
import flashMessage from '@/components/shared/flashMessages';

const Header: NextPage = () => {
  const router = useRouter();
  const userData = useAppSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(fetchUser());
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const onClick = async (e: any) => {
    e.preventDefault();
    sessionApi.destroy()
    .then(async response => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("remember_token");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("remember_token");
        sessionStorage.removeItem("refreshToken");
        await dispatch(fetchUser());
        router.push("/")
      }
    })
    .catch(error => {
      flashMessage("error", "logout error"+error)
    })
  };

  return (
    <header className="navbar navbar-fixed-top navbar-inverse">
      <div className="container">
        <Link href="/" id="logo"><i className="fa fa-home"></i> Funny Movies</Link>
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
          <ul className="nav navbar-nav navbar-right collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {loading ? (
              <li>Loading...</li>
            ) : userData.value.email ? (
              <>
                <li><Link href={`/users/${userData.value.id}`}>{"Welcome " + userData.value.email}</Link></li>
                <li className="divider"></li>
                <li><Link href="/share">Share a movie</Link></li>
                <li className="divider"></li>
                <li><Link href="#logout" onClick={onClick}>Logout</Link></li>
              </>
            ) : (
              <li><Link href="/login">Login / Register</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
