import classes from './ProfileForm.module.css';
import {useState} from 'react';
import { useContext } from 'react';
import AuthContext from '../Store/AuthContext';

const ProfileForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

  const authCtx = useContext(AuthContext);

  const submitHandler = async(e) => {
    e.preventDefault();
    

    try{
      const res  = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,{
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          returnSecureToken : true,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await res.json();
      setNewPassword('');
      console.log(data);
      if(res.ok){
        alert('Password changed successfully');
        authCtx.login(data.idToken);
      }else{
        alert(data.error.message);
      }
    }catch(err){ 
      console.log(err.message);
    } 


  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
