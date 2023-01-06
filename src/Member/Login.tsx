/** @format */

import { db } from "../assets/firebase.config";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

interface LoginInterface {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setFlip: React.Dispatch<React.SetStateAction<boolean>>;
  setmMmberMessage: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  password: string;
  memberMessage: string;
  useAccessRight: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({
  setUsername,
  setPassword,
  setFlip,
  username,
  password,
  setmMmberMessage,
  memberMessage,
  useAccessRight,
}: LoginInterface) => {
  const navigate = useNavigate();
  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const handleFetch = async () => {
      if (username === "" || password === "") {
        setmMmberMessage("請確認輸入帳號或密碼");
      } else {
        const docRef = doc(db, "memberData", username);
        const docSnap = await getDoc(docRef);
        try {
          if (docSnap.exists()) {
            if (docSnap.data().password === password) {
              setmMmberMessage("登入成功");
              useAccessRight(true);
              localStorage.setItem("username", username);
              navigate("/");
            } else {
              setmMmberMessage("密碼錯誤");
            }
          } else {
            setmMmberMessage("未註冊或帳號密碼錯誤");
          }
        } catch (error) {
          console.log("error");
          setmMmberMessage("請登出會員或重新整理頁面");
        }
      }
    };
    handleFetch();
  };

  return (
    <fieldset className="member-sign">
      <legend>會員登入</legend>
      <form onSubmit={handleClick}>
       
        <p>
          <input
            type="text"
            required
            placeholder="username"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setUsername(e.currentTarget.value);
            }}
            value={username}
          />
        </p>

        <p>
          <input
            type="password"
            required
            placeholder="password"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setPassword(e.currentTarget.value);
            }}
            value={password}
          />
        </p>
        <p className="member-note">{memberMessage}</p>
       
        <div>
          <button type="submit">Send</button>
        </div>

      </form>
     
      <p>
        還沒有會員帳號嗎？{" "}
        <span onClick={() => { setFlip(true);}}>註冊會員</span>
      </p>
    </fieldset>
  );
};

export default Login;
