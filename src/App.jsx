import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Colorbox, MenuBox, MenuTitle, SubTitle, CompanyList, BillingInput, SubmitBtn, ResultBilling, FailedBilling } from "../styles/style.jsx";
import "./App.css";

function App() {
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const [location, setLocation] = useState({});
  const [billing, setBilling] = useState();
  const [choice, setChoice] = useState();
  const [color, setColor] = useState("");
  const {
    isLoading,
    isError,
    data: Company,
  } = useQuery("company-data", () => fetch(`https://info.sweettracker.co.kr/api/v1/companylist?t_key=${API_KEY}`).then((response) => response.json()), {
    /* 에러생겼을대 5번까지 재요청 */
    retry: 5,
    onSuccess: (data) => {
      setChoice(data.Company[0].Code);
    },
  });

  useEffect(() => {
    console.log();
    /** location 처리 코드 */
  }, [location]);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;

  return (
    <div className="App">
      <Colorbox className="color">
        <span onClick={() => setColor("antiquewhite")}>원본</span>
        <span onClick={() => setColor("brown")}>브라운</span>
        <span onClick={() => setColor("lightsalmon")}>라이트새먼</span>
        <span onClick={() => setColor("gray")}>그레이</span>
      </Colorbox>
      <MenuBox style={{ backgroundColor: color }}>
        <MenuTitle>메인메뉴</MenuTitle>
        <SubTitle>조회할 택배사를 고른 후 운송장 번호를 기입하시오</SubTitle>
        <CompanyList
          onInput={(e) => {
            const value = e.target.value;
            setChoice(value);
            return value;
          }}
        >
          {Company?.Company?.map((name, i) => {
            return <option key={i}>{name.Name}</option>;
          })}
        </CompanyList>
        <BillingInput
          type="text"
          placeholder="운송장 번호를 입력하시오"
          onInput={(e) => {
            setBilling(e.target.value);
          }}
        ></BillingInput>
        <SubmitBtn
          onClick={() =>
            fetch(`https://info.sweettracker.co.kr/api/v1/trackingInfo?t_code=${choice}&t_invoice=${billing}&t_key=${API_KEY}`)
              .then((response) => response.json())
              .then((json) => {
                setLocation(json);
              })
          }
        >
          운송장 조회
        </SubmitBtn>
      </MenuBox>
      {location.complete ? (
        <ResultBilling>
          <div className="resultBox">
            <p>배송시간</p>
            <p>현재위치</p>
            <p>배송현황</p>
          </div>

          {location.trackingDetails.map((data, i) => {
            return (
              <div key={i} className="dd">
                <span className="dataBox">
                  <span className="timeString">{data.timeString}</span>
                  <span className="where">{data.where}</span>
                  <span className="kind">{data.kind}</span>
                </span>
              </div>
            );
          })}
        </ResultBilling>
      ) : null}
      {location.status === false ? (
        <FailedBilling>
          <span>입력한 운송장번호는 만료되었거나 없는 운송장 번호 입니다.</span>
        </FailedBilling>
      ) : null}
    </div>
  );
}

export default App;
