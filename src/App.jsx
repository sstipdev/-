import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import "./App.css";

const MenuBox = styled.div`
  width: 550px;
  height: 500px;
  max-width: 550px;
  background-color: antiquewhite;
  text-align: center;
  border-radius: 15px;
`;

const MenuTitle = styled.div`
  padding: 20px 0 10px 0;
  color: black;
  font-size: 25px;
  font-weigth: bold;
`;

const SubTitle = styled.div`
  color: black;
  font-size: 17px;
`;

const CompanyList = styled.select`
  width: 400px;
  height: 45px;
  margin-top: 50px;
  border: none;
  border-radius: 5px;
  text-align: center;
`;

const BillingInput = styled.input`
  width: 400px;
  height: 45px;
  margin-top: 30px;
  border: none;
  border-radius: 5px;
  text-align: center;
`;

const SubmitBtn = styled.button`
  width: 100px;
  height: 35px;
  margin: 30px auto;
  border: none;
  border-radius: 5px;
  text-align: center;
  display: block;
`;

const ResultBilling = styled.div`
  width: 1000px;
  min-width: 800px;
  height: 500px;
  min-height: 450px;
  background-color: rgba(255, 224, 140, 0.5);
  margin-top: 10px;
  display: grid;
  grid-template-column: 1fr;
  border-radius: 0 0 20px 20px;
`;

function App() {
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const [location, setLocation] = useState({});
  const [billing, setBilling] = useState();
  const [choice, setChoice] = useState();

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
    console.log(location);
    /** location 처리 코드 */
  }, [location]);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;

  return (
    <div className="App">
      <MenuBox>
        <MenuTitle>메인메뉴</MenuTitle>
        <SubTitle>조회할 택배사를 고른 후 운송장 번호를 기입하시오</SubTitle>
        <CompanyList
          onInput={(e) => {
            const value = e.target.value;
            setChoice(value);
            console.log(choice);
            return value;
          }}
        >
          {Company?.Company?.map((name, i) => {
            return (
              <option key={i} value={name.Code} selected={choice.Code === name}>
                {name.Name}
              </option>
            );
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
              <div key={i}>
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
    </div>
  );
}

export default App;
