import { NextPage } from 'next'
import { useRouter } from 'next/router'
import accountActivationApi from '../../components/shared/api/accountActivationApi'
import { useDispatch } from 'react-redux'
import flashMessage from '../../components/shared/flashMessages'
import { fetchUser } from '../../redux/session/sessionSlice'

const Edit: NextPage = () => {
  const router = useRouter()
  const { email, slug } = router.query
  const dispatch = useDispatch()

  accountActivationApi.update(slug?.[0] as string, email as string
  ).then(response => {
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
      <h1>{email}</h1>
      <h1>{slug?.[0]}</h1>
      </>
  )
}

export default Edit
