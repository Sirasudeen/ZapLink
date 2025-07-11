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
        <form onSubmit={handleSubmit}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Input
                    type="url"
                    placeholder="Paste your long URL here"
                    value={value}
                    onChange={handleChange}
                    required
                    size="large"
                    style={{
                        borderRadius: 14,
                        padding: '14px 18px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        border: '1px solid #d0d7de',
                        fontSize: '1rem',
                        fontWeight: 500,
                        letterSpacing: 0.3,
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        background: 'linear-gradient(to right, #40c9ff, #0083b0, #8dd0fc)',
                        border: 'none',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        letterSpacing: '0.5px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 12px rgba(59, 40, 204, 0.25)',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) {
                            e.target.style.background = 'linear-gradient(to right, #a3dffc, #60efff, #a3dffc)';
                            e.target.style.color = 'grey';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(to right, #40c9ff, #0083b0, #8dd0fc)';
                        e.target.style.color = '#fff';

                    }}
                    onMouseDown={(e) => {
                        if (!loading) {
                            e.target.style.transform = 'scale(0.98)';
                        }
                    }}
                    onMouseUp={(e) => {
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    {loading ? 'Shortening...' : 'Shorten URL'}
                </button>


            </Space>
        </form>
    );
};

export default UrlForm;
