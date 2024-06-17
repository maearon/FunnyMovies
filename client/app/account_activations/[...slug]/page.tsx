"use client";
import { useRouter } from 'next/navigation'
import accountActivationApi from '../../../components/shared/api/accountActivationApi'
import { useDispatch } from 'react-redux'
import flashMessage from '@/components/shared/flashMessages';
// import flashMessage from '../../components/shared/flashMessages'
// import { fetchUser } from '../../redux/session/sessionSlice'

const Edit = ({params}: {params: {slug: string[]}}) =>{
  const router = useRouter()
  const { activation_token, email } = 
  params.slug.length === 2 ? 
  // { activation_token: params.slug[0], email: params.slug[1] } 
  { activation_token: params.slug[0], email: decodeURIComponent(params.slug[1]) } 
  : { activation_token: '', email: '' };
  const dispatch = useDispatch()

  // const extractEmail = (youtubeUrl: string, activation_token: string): string | null => {
  //   const regExp = `/${activation_token}\/([^%40]*)/`;
  //   const match = youtubeUrl.match(regExp);
  //   return (match && match[1]) ? match[1] : null;
  // };

  accountActivationApi.update(activation_token as string, email as string
  ).then(response => {
    flashMessage('success', 'The account activated, please try log in')
    router.push("/login")
    setTimeout(function(){
    // setInterval(function(){
      // alert("Sup!"); 
      if (response.user) {
        // localStorage.setItem("token", response.jwt as string)
        // localStorage.setItem("remember_token", response.token as string)
        // router.push("/users/"+response.user.id)
        // dispatch(fetchUser())
        // flashMessage(...response.flash)
        router.push("/login")
        // flashMessage("success", "Account activated!")
      } else {
      // if (response.flash) {
        // flashMessage(...response.flash)
        router.push("/")
      }
    // }, 9000);
    }, 9000);//wait 9 seconds
  })
  .catch(error => {
    console.log(error)
  })
  return (
      <>
      <h1>Account Activationing ...</h1>
      <h1>{activation_token}</h1>
      <h1>{email}</h1>
      </>
  )
}

export default Edit
