"use client";
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import Pagination from 'react-js-pagination'
import Skeleton from 'react-loading-skeleton'
import micropostApi, { CreateResponse, ListResponse, Micropost } from '../components/shared/api/micropostApi'
import errorMessage from '../components/shared/errorMessages'
import flashMessage from '../components/shared/flashMessages'
import { useAppSelector } from '../redux/hooks'
import { selectUser } from '../redux/session/sessionSlice'
// Alt + Shift + O

// interface Props {
//   userData: UserState;
// }

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
  const inputImage = useRef() as MutableRefObject<HTMLInputElement>
  const [errors, setErrors] = useState([] as string[])
  const userData = useAppSelector(selectUser)

  const setFeeds= useCallback(async () => { 
    micropostApi.getAll({page: page}
    ).then((response: ListResponse<Micropost>) => {
      if (response.feed_items) {
        setFeedItems(response.feed_items)
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
    if (userData.loggedIn) { setFeeds()}
  }, [setFeeds, userData.loggedIn])

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setPage(pageNumber)
  }

  const handleContentInput = (e: any) => {
    setContent(e.target.value)
  }

  const handleImageInput = (e: any) => {
    if (e.target.files[0]) {
      const size_in_megabytes = e.target.files[0].size/1024/1024
      if (size_in_megabytes > 512) {
        alert("Maximum file size is 512MB. Please choose a smaller file.")
        setImage(null)
        e.target.value = null
      } else {
        setImage(e.target.files[0])
        setImageName(e.target.files[0].name)
      }
    }
  }

  const handleSubmit = (e: any) => {
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
        BASE_URL = 'http://localhost:3001/api'
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
          inputEl.current.blur()
          flashMessage(...data.flash)
          setContent('')
          setImage(null)
          inputImage.current.value = ''
          setErrors([])
          setFeeds()
        }
        if (data.error) {
          inputEl.current.blur()
          setErrors(data.error)
        }

      })
      )

    e.preventDefault()
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

  return userData.status === 'loading' ? (
    <>
    <Skeleton height={304} />
    <Skeleton circle={true} height={60} width={60} />
    </>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : userData.loggedIn ? (
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
          <span><Link href={"/users/"+userData.value.id}>view my profile</Link></span>
          <span>{micropost} micropost{micropost !== 1 ? 's' : ''}</span>
        </section>

        <section className="stats">
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
        </section>

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
                <textarea
                placeholder="Compose new micropost..."
                name="micropost[content]"
                id="micropost_content"
                value={content}
                onChange={handleContentInput}
                >
                </textarea>
                {/* <Field
                  as='textarea'
                  id='comments'
                  name='comments'
                  validate={validateComments}
                />
                <ErrorMessage name='comments' component={TextError} /> */}
            </div>
            <input ref={inputEl} type="submit" name="commit" value="Post" className="btn btn-primary" data-disable-with="Post" />
            <span className="image">
              <input
              ref={inputImage}
              accept="image/jpeg,image/gif,image/png"
              type="file"
              name="micropost[image]"
              id="micropost_image"
              onChange={handleImageInput}
              />
            </span>
          </form>
        </section>
      </aside>

      <div className="col-md-8">
        <h3>Micropost Feed</h3>
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
                  {i.content}
                  { i.image &&
                    <Image
                      src={''+i.image+''}
                      alt="Example User"
                      width={i.size}
                      height={i.size}
                      priority
                    />
                  }
                </span>
                <span className="timestamp">
                {'Posted '+i.timestamp+' ago. '}
                {userData.value.id === i.user_id &&
                  <a href={'#/microposts/'+i.id} onClick={() => removeMicropost(i.id)}>delete</a>
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
        <h1>Welcome to the Sample App</h1>
        <h2>
        This is the home page for the <Link href="https://nextjs.org/" target="_blank">NextJS Tutorial</Link> sample application.
        </h2>
        <Link href="/signup" className="btn btn-lg btn-primary">Sign up now!</Link>
    </div>
    <Link href="https://nextjs.org/" target="_blank"><Image alt="Rails logo" width="70" height="50" src="/next-js.svg" /></Link>
    </>
  )
}

export default Home

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const userData = useAppSelector(selectUser);
//     return { userData }
//   } catch {
//     return {
//       props: {}
//     }
//   }
// }
