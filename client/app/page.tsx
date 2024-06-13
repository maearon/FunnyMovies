"use client";
import { NextPage } from 'next'
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import Pagination from 'react-js-pagination'
import Skeleton from 'react-loading-skeleton'
import micropostApi, { CreateResponse, ListResponse, Micropost } from '../components/shared/api/micropostApi'
import errorMessage from '../components/shared/errorMessages'
import flashMessage from '../components/shared/flashMessages'
import { useAppSelector } from '../redux/hooks'
import { fetchUser, selectUser } from '../redux/session/sessionSlice'
import { useDispatch } from 'react-redux';

const Home: NextPage = () => {
  const [page, setPage] = useState(1)
  const [feed_items, setFeedItems] = useState([] as Micropost[])
  const [total_count, setTotalCount] = useState(1)
  const [following, setFollowing] = useState(Number)
  const [followers, setFollowers] = useState(Number)
  const [micropost, setMicropost] = useState(Number)
  const [gravatar, setGavatar] = useState(String)
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [imageName, setImageName] = useState('')
  const inputEl = useRef() as MutableRefObject<HTMLInputElement>
  const [errors, setErrors] = useState([] as string[])
  const userData = useAppSelector(selectUser)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const extractVideoId = (youtubeUrl: string): string | null => {
    const regExp = /embed\/([^?]*)/;
    const match = youtubeUrl.match(regExp);
    return (match && match[1]) ? match[1] : null;
  };

  const fetchVideoDetails = async (videoId: string) => {
    const apiKey = 'AIzaSyAkH2rWcj2SLdgLSpSxg6yxsVQAupJ38FE';
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const videoData = data.items[0].snippet;
      console.log('videoData', videoData)
      return {
        title: videoData.title,
        description: videoData.description,
        videoId: videoId,
        channelTitle: videoData.channelTitle,
      };
    } catch (error) {
      console.error('Failed to fetch video details:', error);
      return null;
    }
  };

  const setFeeds= useCallback(async () => { 
    micropostApi.getAll({page: page}
    ).then(async (response: ListResponse<Micropost>) => {
      if (response.feed_items) {
        const updatedFeedItems = await Promise.all(
          response.feed_items.map(async (item) => {
            const videoId = extractVideoId(item.content);
            if (videoId) {
              const details = await fetchVideoDetails(videoId);
              if (details) {
                return { ...item, ...details };
              }
            }
            return item;
          })
        );
        setFeedItems(updatedFeedItems)
        setTotalCount(response.total_count)
        setFollowing(response.following)
        setFollowers(response.followers)
        setMicropost(response.micropost)
        setGavatar(response.gravatar)
      } else {
        setFeedItems([])
      }
    })
    .catch((error: any) => {
      console.log(error)
    })
  }, [page])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(fetchUser());
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setFeeds();
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch, setFeeds]);

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setPage(pageNumber)
  }

  const handleContentInput = (e: any) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData2 = new FormData()
    formData2.append('micropost[content]',
      content
    )
    if (image) {
    formData2.append('micropost[image]',
      image || new Blob,
      imageName
    )
    }

    var BASE_URL = ''
    if (process.env.NODE_ENV === 'development') {
      BASE_URL = 'http://localhost:3000/api'
    } else if (process.env.NODE_ENV === 'production') {
      BASE_URL = 'https://railstutorialapi.herokuapp.com/api'
    }

    fetch(BASE_URL+`/microposts`, {
      method: "POST",
      body: formData2,
      credentials: 'include',
      headers: {
        'Authorization': localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined' ?
        `Bearer ${localStorage.getItem('token')} ${localStorage.getItem('remember_token')}` :
        `Bearer ${sessionStorage.getItem('token')} ${sessionStorage.getItem('remember_token')}`
      }
    })
    .then((response: any) => response.json().then((data: CreateResponse) => {
      
      if (data.flash) {
        setFeeds()
        inputEl.current.blur()
        flashMessage(...data.flash)
        setContent('')
        setImage(null)
        setErrors([])
      }
      if (data.error) {
        inputEl.current.blur()
        setErrors(data.error)
      }

    })
    )
  }

  const removeMicropost = (micropostid: number) => {
    let sure = window.confirm("You sure?")
    if (sure === true) {
      micropostApi.remove(micropostid
      ).then(response => {
        if (response.flash) {
          flashMessage(...response.flash)
          setFeeds()
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
    }
  }

  return loading ? (
    <>
    <Skeleton height={304} />
    <Skeleton circle={true} height={60} width={60} />
    </>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : userData.value.email ? (
    <div className="row">
      <aside className="col-md-4">
        <section className="user_info">
          <Image
            className={"gravatar"}
            src={"https://secure.gravatar.com/avatar/"+gravatar+"?s=50"}
            alt={userData.value.name} 
            width={50}
            height={50}
            priority
          />
          <h1>{userData.value.name}</h1>
          {/* <span><Link href={"/users/"+userData.value.id}>view my profile</Link></span> */}
          <span>{micropost} post{micropost !== 1 ? 's' : ''}</span>
        </section>

        {/* <section className="stats">
          <div className="stats">
            <Link href={"/users/"+userData.value.id+"/following"}>
              <strong id="following" className="stat">
                {following}
              </strong> following
            </Link>
            <Link href={"/users/"+userData.value.id+"/followers"}>
              <strong id="followers" className="stat">
                {followers}
              </strong> followers
            </Link>
          </div>
        </section> */}

        <section className="micropost_form">
          <form
          encType="multipart/form-data"
          action="/microposts"
          acceptCharset="UTF-8"
          method="post"
          onSubmit={handleSubmit}
          >
            { errors.length !== 0 &&
              errorMessage(errors)
            }
            <div className="field">
                <label htmlFor="micropost[content]">Youtube URL:</label>
                <textarea
                placeholder="Compose new url https://www.youtube.com/embed/abPmZCZZrFA?si=CJdRW8sNd5laZsfJ..."
                name="micropost[content]"
                id="micropost_content"
                value={content}
                onChange={handleContentInput}
                >
                </textarea>
            </div>
            <input ref={inputEl} type="submit" name="commit" value="Share" className="btn btn-primary" data-disable-with="Post" />
          </form>
        </section>
      </aside>

      <div className="col-md-8">
        {feed_items.length > 0 &&
        <>
        <ol className="microposts">
          { feed_items.map((i:any, t) => (
              <li key={t} id= {'micropost-'+i.id} >
                <Link href={'/users/'+i.user_id}>
                  <Image
                    className={"gravatar"}
                    src={"https://secure.gravatar.com/avatar/"+i.gravatar_id+"?s="+i.size}
                    alt={i.user_name}
                    width={i.size}
                    height={i.size}
                    priority
                  />
                </Link>
                <span className="user"><Link href={'/users/'+i.user_id}>{i.user_name}</Link></span>
                
                <span className="content">
                  <b>{i.title}</b>
                  <Link target="_blank" href={"https://www.youtube.com/results?search_query="+i.channelTitle}>({i.channelTitle})</Link>
                  <div className="videoWrapper">
                    <iframe
                      src={"https://www.youtube.com/embed/"+i.videoId}
                      data-autoplay-src={"https://www.youtube.com/embed/"+i.videoId+"?autoplay=1"}> 
                    </iframe>
                  </div>
                  {i.description}
                  { i.image &&
                    <Image
                      src={''+i.image+''}
                      alt="Example User"
                      width={50}
                      height={50}
                      priority
                    />
                  }
                </span>
                <span className="timestamp">
                {'Shared '+i.timestamp+' ago. '}
                {userData.value.id === i.user_id &&
                  <Link href={'#/microposts/'+i.id} onClick={() => removeMicropost(i.id)}>delete</Link>
                }
                </span>
              </li>
          ))}
        </ol>

        <Pagination
          activePage={page}
          itemsCountPerPage={5}
          totalItemsCount={total_count}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
        </>
        }
      </div>
  </div>
  ) : (
    <>
    <div className="center jumbotron">
        <h1>Welcome to the Funny Movies App</h1>
        {/* <h2>
        This is the home page for the <Link href="https://nextjs.org/" target="_blank">NextJS Tutorial</Link> funny movies application.
        </h2> */}
        <h2>
        This is the home page for the funny movies application.
        </h2>
        <Link href="/signup" className="btn btn-lg btn-primary">Sign up now!</Link>
    </div>
    {/* <Link href="https://nextjs.org/" target="_blank">
      <Image
        className={styles.logo}
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
    </Link> */}
    </>
  )
}

export default Home
