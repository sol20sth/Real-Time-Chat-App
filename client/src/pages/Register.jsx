import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext"; // context가져오기

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    isRegisterLoading,
    registerUser,
    registerError,
  } = useContext(AuthContext);
  // 메서드 가져와서 사용
  const { user } = useContext(AuthContext); // AuthContext의 user데이터 가져오기
  return (
    <>
      <Form onSubmit={registerUser}>
        {" "}
        // 유저등록 메서드
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>

              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    name: e.target.value,
                  })
                }
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateRegisterInfo({
                    // 해당값이 변경될때마다 updateRegisterInfo값이 변경되게
                    ...registerInfo,
                    email: e.target.value,
                  })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <Button variant="primary" type="submit">
                {isRegisterLoading ? "Creating your account" : "Register"} //
                처리중일때와 아닐때의 처리
              </Button>
              {registerError?.error && (
                <Alert variant="danger">
                  {" "}
                  //에러처리나면 해당 메세지 나오게 처리
                  <p>{registerError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
