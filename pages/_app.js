import "../styles/globals.css";
// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import "@popperjs/core";
// import Popper from 'popper.js';
import NavBar from "../components/navBar";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import "bootstrap-icons/font/bootstrap-icons.css";
import { deleteCookie } from "cookies-next";
// import {WORKING_DIR, accessSecurity} from '../middleware/security';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

   useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });
    router.events.on('routeChangeStart', () => { // Event listener
      setProgress(40);
    });
    // console.log("Working Directory Set: ", WORKING_DIR);

    console.log("ConnectedUSer: ", user);


    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    console.log('_app ---> ConnectedUser: ', user);
    if (connectedUser) {
      setUser({ value: connectedUser.token, email: connectedUser.email, username: connectedUser.username, accountType: connectedUser.accountType });
      console.log(user);
    }
    setKey(Math.random());
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem('connectedUser');
    deleteCookie('connectedUser');
    deleteCookie('accountType');
    setUser({ value: null });
    setKey(Math.random()); // In order to have another key and make the component to "Re-Render"
    router.push('/');
  }
  

  return (
    <>
    <LoadingBar
      color='#F345EF'  //'#ff2d55'
      progress={progress}
      waitingTime={200}
      onLoaderFinished={() => setProgress(0)}
    />
      {key && <NavBar logout={logout} user={user} key={key} />}
      <Component user={user} {...pageProps} />

      {/* <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js"
          integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc"
          crossOrigin="anonymous" /> */}
          {/* <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous" /> */}
      {/* <Script src="https://unpkg.com/@popperjs/core@2"></Script> */}


      {/* <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></Script> */}
    
    </>
  );
}

export default MyApp;
