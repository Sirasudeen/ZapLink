import React, { useState } from 'react';
import { Input, Space } from 'antd';

const UrlForm = ({ onSubmit, loading }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value, setValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Space direction="vertical" className="w-full" size="large">
        <Input
          type="url"
          placeholder="Paste your long URL here"
          value={value}
          onChange={handleChange}
          required
          size="large"
          className="rounded-xl py-3 px-4 shadow-sm border border-gray-300 text-base font-medium tracking-wide"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-sm sm:text-base md:text-lg py-3 px-4 rounded-xl 
                      bg-gradient-to-r from-[#40c9ff] via-[#0083b0] to-[#8dd0fc] 
                      text-white font-semibold tracking-wide border-none shadow-md 
                      transition-all duration-300 ease-in-out transform 
                      hover:scale-[1.02] hover:from-[#a3dffc] hover:via-[#60efff] hover:to-[#a3dffc] 
                      hover:text-gray-800 focus:outline-none 
                      ${loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>

      </Space>
    </form>
  );
};

export default UrlForm;
