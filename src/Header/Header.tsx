/** @format */

import { ChangeEvent, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { BiUserCheck } from "react-icons/bi";
import { AppCtx } from "../ContextHooks";

const Header = () => {
  const navigate = useNavigate();
  const {
    message,
    setMessage,
    setCount,
    setMovieData,
    accessRight,
    useAccessRight,
  } = useContext(AppCtx);

  useEffect(() => {
    const certificate = localStorage.getItem("username");
    certificate ? useAccessRight(true) : useAccessRight(false);
  }, [accessRight]);

  return (
    <div className="headBar">
      <h1
        onClick={() => { navigate(`/`);}}>MovieVC</h1>
      <div className="header-input">
        <form>
          <input
            type="text"
            placeholder="keywods ?"
            value={message}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setMessage(event.target.value);
              // console.log(event.target.value)
            }}
          />
          <button
            onClick={(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              event.preventDefault()
              if (message === "") {
                alert("請輸入訊息 ！");
              } else {
                navigate(`/search/${message}`);
                setMovieData([]);
                setCount(0);
                setMessage("");
              }
            }}
          >
            <BsSearch />
          </button>
        </form>
      </div>
      {accessRight ? (
        <div
          className="header-member"
          onClick={() => {
            navigate(`/profile`);
          }}
        >
          <BiUserCheck className="icon" />
        </div>
      ) : (
        <div
          className="header-member"
          onClick={() => {
            navigate(`/member`);
          }}
        >
          <FaUserPlus className="icon" />
        </div>
      )}
    </div>
  );
};

export default Header;

//改變登入圖標
// 修改中文版的
