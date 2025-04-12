import React, { useEffect, useState, useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import AuthContext from '@/Context/AuthContext';

const Temp = () => {
  const { authTokens, url } = useContext(AuthContext)
  useEffect(() => {

    async function gg() {
      const response = fetch(`${url}/products/temp/`, {
        method: "GET",
        headers: { Authorization: `Dusty ${authTokens?.access}` }
      })
      const data = await response
      console.log(await data.json())
    }
    gg();
  }, [])
  return (
    <>
      <h1>Hello D</h1>
    </>
  );
};
export default Temp;
