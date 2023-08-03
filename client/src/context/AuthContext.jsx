import { createContext, useState, useEffect } from "react";
import { useCallback } from "react";  // 비동기 처리
import { postRequest, baseUrl } from "../utils/services";  // 아까 작성한 메서드 가져오기
export const AuthContext = createContext();  // 데이터를 저장할 Context생성

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);                   // 유저 정보 받을 변수
  const [registerError, setReisterError] = useState(null);  // 회원가입때 사용 할 변수들
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);       // 로그인 할때 사용 할 변수들
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  
  useEffect(() => {
    const user = localStorage.getItem("User");   // AuthContextProvider가 실행되었을때 무조건 한번 실행
    setUser(JSON.parse(user));					// 새로고침시 로그인이 풀리는 것을 방지하여서 
  }, []);										// localStorage에 저장할 예정인데 실행될때 로컬스토리지에서 User데이터 받아오기

  const updateRegisterInfo = useCallback((info) => {  // 입력받을때마다 데이터 변경 
    setRegisterInfo(info);
  }, []);
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);  // 로딩중 처리
      setReisterError(null);
      const response = await postRequest(  // services.js에서 저장시켜놓은 postRequest(url, body)
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false);    // 로딩끝나고 처리완료
      if (response.error) {               // 위에서 받은 데이터가 error : true 이면 
        return setReisterError(response); // 에러처리 후 끝내기
      }
      localStorage.setItem("User", JSON.stringify(response));  // error : false 이면 로컬에 데이터 저장
      setUser(response);  // user정보 등록
    },
    [registerInfo]  
  );

  const loginUser = useCallback(  // 위의 회원가입과 비슷한 코드들 
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );
      setIsLoginLoading(false);
      if (response.error) {
        return setLoginError(response);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {  // logoutUser메서드가 실행되면 
    localStorage.removeItem("User");      // localStorage의 User데이터 제거
    setUser(null);					// user데이터도 제거
  }, []);

  return (					
    <AuthContext.Provider		// AuthContext는 4번째줄에서 만든 Context
      value={{                // 해당 Context에 위에서 작성한 메서드들을 저장시켜 하위 컴포넌트들에서 사용가능하게 만듬
        user,				// 이제 AuthContextProvider를 사용할 곳의 최상단으로 가서 연결시키기
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};