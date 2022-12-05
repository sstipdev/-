import styled from "styled-components";

export const Colorbox = styled.div`
  display: flex;
  width: 550px;
  min-width: 220px;
  justify-content: space-around;
  margin-bottom: 5px;
`;

export const MenuBox = styled.div`
  height: 500px;
  max-width: 560px;
  background-color: antiquewhite;
  text-align: center;
  border-radius: 15px;
`;

export const MenuTitle = styled.div`
  padding: 20px 0 10px 0;
  color: black;
  font-size: 25px;
  font-weigth: bold;
`;

export const SubTitle = styled.div`
  color: black;
  font-size: 17px;
`;

export const CompanyList = styled.select`
  width: 400px;
  height: 45px;
  margin-top: 50px;
  border: none;
  border-radius: 5px;
  text-align: center;
`;

export const BillingInput = styled.input`
  width: 400px;
  height: 45px;
  margin-top: 30px;
  border: none;
  border-radius: 5px;
  text-align: center;
`;

export const SubmitBtn = styled.button`
  width: 100px;
  height: 35px;
  margin: 30px auto;
  border: none;
  border-radius: 5px;
  text-align: center;
  display: block;
`;

export const ResultBilling = styled.div`
  width: 1000px;
  min-width: 800px;
  height: 500px;
  min-height: 450px;
  background-color: rgba(255, 224, 140, 0.5);
  margin-top: 10px;
  display: grid;
  border-radius: 0 0 20px 20px;
`;

export const FailedBilling = styled.div`
  width: 500px;
  background-color: white;
`;
